import { ReactNode } from "react";

interface ButtonProps {
    className?: string;
    content: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    isloding?: boolean
}


export const ButtonAuth = ({
    className,
    content,
    onClick,
    disabled = false,
    isloding,
    ...props
}: ButtonProps) => {
    return (
        <button
            {...props}
            onClick={onClick}
            disabled={disabled}
            className={`
        h-9
        px-3
        rounded-md
        border
        bg-card
        text-sm
        font-medium
        transition-all
        duration-200
        hover:bg-accent
        hover:text-white
        disabled:cursor-not-allowed
        ${className ?? ""}
      `}
        >
            {isloding ? "...loging" : content}
        </button>
    );
};