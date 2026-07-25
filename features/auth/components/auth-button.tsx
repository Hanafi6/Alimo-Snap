import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type AuthButtonProps = {
  content: React.ReactNode;
  disabled?: boolean;
  isPending: boolean;
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
