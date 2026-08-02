import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import React from "react";

type AuthButtonProps = {
  content?: React.ReactNode;
  disabled?: boolean;
  isPending: boolean;
  children?: React.ReactNode
};

export default function AuthButton({
  children,
  disabled = false,
  isPending,
  content,
  ...props
}: AuthButtonProps & React.ComponentProps<"button">) {
  return (
    <Button {...props} disabled={isPending}>
      {isPending ? (
        <>
          <Spinner /> {content}
        </>
      ) : (
        content
      )}
    </Button>
  );
}
