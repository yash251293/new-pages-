"use client";

import { Controller, Control, FieldValues } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface RememberMeCheckboxProps {
  control: Control<FieldValues>; // Use FieldValues for more generic control
}

export default function RememberMeCheckbox({ control }: RememberMeCheckboxProps) {
  return (
    <div className="flex items-center space-x-2">
      <Controller
        name="rememberMe"
        control={control}
        render={({ field }) => (
          <Checkbox
            id="remember-me"
            checked={field.value}
            onCheckedChange={field.onChange}
            className="border-brand-border data-[state=checked]:bg-brand-blue data-[state=checked]:border-brand-blue"
          />
        )}
      />
      <Label
        htmlFor="remember-me"
        className="text-sm font-medium text-brand-text-medium cursor-pointer"
      >
        Remember me
      </Label>
    </div>
  );
}
