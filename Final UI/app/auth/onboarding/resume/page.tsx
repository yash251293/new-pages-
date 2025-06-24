// app/auth/onboarding/resume/page.tsx

"use client" // This MUST be the very first line of the file.

import React, { useState, useRef, ChangeEvent, Suspense } from "react" // Added Suspense from React
import { Button } from "@/components/ui/button"
import { UploadCloudIcon } from "lucide-react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { OnboardingStepper } from "@/components/onboarding-stepper"
import { toast } from "sonner"
import { useAuth } from "@/context/AuthContext"
import { uploadUserResume } from "@/lib/api"

// Define the component that contains the actual page logic and uses client-side hooks
function ResumePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, token, refetchUser, isLoading: isAuthLoading } = useAuth();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFileError(null); // Clear previous error
    const file = event.target.files?.[0];
    if (file) {
      // Basic client-side validation (example: size and type)
      const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/rtf", "text/plain"];
      if (!allowedTypes.includes(file.type)) {
        setFileError("Invalid file type. Please upload a PDF, DOC, DOCX, RTF, or TXT file.");
        setSelectedFile(null);
        if (fileInputRef.current) { // Clear the file input
            fileInputRef.current.value = "";
        }
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit example
        setFileError("File is too large. Maximum size is 5MB.");
        setSelectedFile(null);
        if (fileInputRef.current) { // Clear the file input
            fileInputRef.current.value = "";
        }
        return;
      }
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  // Handle loading state for authentication
  if (isAuthLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading user data...</div>;
  }

  // Determine finalUserType after auth loading is complete
  const finalUserType = user?.user_type;

  // Conditional redirection for non-individual users
  if (!finalUserType || finalUserType !== 'individual') {
    toast.error("Access denied: This page is for individual users only.");
    // Ensure redirection only happens in a client environment
    if (typeof window !== 'undefined') {
      router.push(user ? '/feed' : '/auth/login');
    }
    return <div className="min-h-screen flex items-center justify-center">Redirecting...</div>;
  }

  // At this point, finalUserType is guaranteed to be 'individual'.

  return (
    <div className="min-h-screen bg-brand-bg-light-gray py-8">
      <OnboardingStepper />
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-brand-text-dark mb-2">Upload a recent resume or CV</h1>
        <p className="text-brand-text-medium mb-8">
          Autocomplete your profile in just a few seconds by uploading a resume.
        </p>

        <div className="border-2 border-dashed border-brand-border rounded-lg p-10 sm:p-16 mb-6">
          <UploadCloudIcon className="mx-auto h-12 w-12 text-brand-text-light mb-4" />
          <p className="text-sm text-brand-text-medium mb-4">
            Click the button below to upload your resume as a .pdf, .doc, .docx, .rtf, or .txt file. Max 5MB.
          </p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.rtf,.txt"
            style={{ display: 'none' }}
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="bg-black hover:bg-gray-900 text-white font-medium"
            type="button"
          >
            Upload Resume
          </Button>
          {selectedFile && <p className="text-sm text-green-600 mt-4">Selected file: {selectedFile.name}</p>}
          {fileError && <p className="text-sm text-red-600 mt-4">{fileError}</p>}
        </div>

        {selectedFile && !fileError && (
          <Button
            onClick={async () => {
              if (!selectedFile) return;
              if (!token) {
                toast.error("Authentication token not found. Please log in again.");
                return;
              }

              setIsUploading(true);
              const formData = new FormData();
              formData.append("resume", selectedFile);

              try {
                await uploadUserResume(formData, token);
                toast.success("Resume uploaded successfully!");
                await refetchUser(); // Refresh user if resume info is part of user context/profile display
                router.push(`/auth/onboarding/done?type=${finalUserType}`);
              } catch (error: any) {
                toast.error("Resume upload failed: " + (error.data?.message || error.message || "Unknown error."));
              } finally {
                setIsUploading(false);
              }
            }}
            disabled={!selectedFile || !!fileError || isUploading}
            className="bg-green-600 hover:bg-green-700 text-white font-medium mt-4 w-full sm:w-auto"
          >
            {isUploading ? "Uploading..." : "Save Resume"}
          </Button>
        )}

        <Button
          variant="outline"
          className={`w-full sm:w-auto border-brand-border text-brand-text-medium hover:bg-brand-bg-light-gray font-medium ${selectedFile && !fileError ? 'mt-3' : 'mt-0'}`}
          asChild
        >
          <Link href={`/auth/onboarding/done?type=${finalUserType}`}>Skip for now</Link>
        </Button>
      </div>
    </div>
  )
}

// This is the default export for the page.tsx file.
// It wraps the ResumePageContent in a Suspense boundary.
export default function Page() {
  return (
    <Suspense fallback={<div>Loading resume upload page...</div>}>
      <ResumePageContent />
    </Suspense>
  );
}