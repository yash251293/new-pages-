"use client";

import { Suspense } from "react"; // Keep Suspense if useSearchParams is still needed by a wrapper
import { useSearchParams } from "next/navigation";

// Basic component to test if useSearchParams works and if logging happens
function TestSignUpContent() {
  console.log("TestSignUpContent rendering NOW..."); // Basic log

  // We need to call useSearchParams to ensure this component's context is similar
  // to the original SignUpContent which needs it.
  // If useSearchParams itself is the issue, this might not log or might error.
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  console.log("TestSignUpContent - type from URL:", type);

  return (
    <div>
      <h1>Signup Page Test</h1>
      <p>If you see this, the basic page structure is rendering.</p>
      <p>Type from URL: {type || "not set"}</p>
    </div>
  );
}

export default function TestSignUpPage() {
  console.log("TestSignUpPage wrapper rendering NOW..."); // Log for the main page component

  return (
    <div style={{ padding: "20px", border: "2px solid red", margin: "20px" }}>
      <h2>This is TestSignUpPage Wrapper</h2>
      <Suspense fallback={<div>Loading simple content...</div>}>
        <TestSignUpContent />
      </Suspense>
    </div>
  );
}