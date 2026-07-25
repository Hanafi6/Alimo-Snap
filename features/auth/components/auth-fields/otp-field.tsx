import { Field } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

type OtpFieldProps = {
  value: string;
  setValue: (value: string) => void;
  isPending: boolean;
};

export default function OtpField({
  value,
  setValue,
  isPending,
}: OtpFieldProps) {
  return (
    <Field>
      <InputOTP
        maxLength={6}
        id="otp-verification"
        required
        containerClassName="justify-center"
        disabled={isPending}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <InputOTPGroup
          className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl"
          aria-disabled={isPending}
        >
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator className="mx-2" />
        <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </Field>
  );
}
