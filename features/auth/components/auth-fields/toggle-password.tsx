import { Button } from "@/components/ui/button";
import { LucideEye, LucideEyeOff } from "lucide-react";

type TogglePasswordProps = {
  isPasswordShown: boolean;
  handlePasswordToggle: () => void;
};

export default function TogglePassword({
  isPasswordShown,
  handlePasswordToggle,
}: TogglePasswordProps) {
  return (
    <Button
      size={"icon-xs"}
      variant={"ghost"}
      className="absolute top-0 right-0 h-full active:translate-none!"
      type="button"
      onClick={handlePasswordToggle}
      aria-label={isPasswordShown ? "Hide password" : "Show password"}
      aria-pressed={isPasswordShown}
    >
      {isPasswordShown ? <LucideEyeOff /> : <LucideEye />}
    </Button>
  );
}
