"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import TogglePassword from "@/features/auth/components/auth-fields/toggle-password";
import { cn } from "@/lib/utils";
import { useId, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

type FormFieldProps = {
  label: string;
  type?: string;
  name: string;
  placeholder?: string;
  isSingleField?: boolean;
  defaultValue?: string;
  disabled?: boolean;
};

export default function FormField({
  type = "text",
  label,
  name,
  placeholder,
  defaultValue = "",
  disabled = false,
}: FormFieldProps) {
  const id = useId();
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const { control } = useFormContext();

  function handlePasswordToggle() {
    setIsPasswordShown(!isPasswordShown);
  }

  return (
    <Controller
      name={name}
      control={control}
      disabled={disabled}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={id}>{label}</FieldLabel>
          <div className="relative">
            <Input
              {...field}
              aria-invalid={fieldState.invalid}
              id={id}
              name={name || label.toLowerCase()}
              type={
                type === "password"
                  ? isPasswordShown
                    ? "text"
                    : "password"
                  : type
              }
              placeholder={placeholder || ""}
            />
            {type === "password" && (
              <TogglePassword
                isPasswordShown={isPasswordShown}
                handlePasswordToggle={handlePasswordToggle}
              />
            )}
          </div>
          <div
            className={cn(
              "transition-opacity",
              fieldState.invalid ? "opacity-100" : "opacity-0",
            )}
          >
            {fieldState.invalid && (
              <FieldError className="text-xs" errors={[fieldState.error]} />
            )}
          </div>
        </Field>
      )}
    />
  );
}
