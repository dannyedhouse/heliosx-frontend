import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
}

export const Button = ({
  children,
  className,
  variant,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={twMerge(clsx(buttonVariants({ variant, className })))}
      {...props}
    >
      {children}
    </button>
  );
};

const buttonVariants = cva("p-2 font-bold", {
  variants: {
    variant: {
      primary:
        "bg-[#30bee2] rounded hover:bg-[#1fb4da] border-solid border-2 border-[#1fb4da]",
      submit:
        "bg-[#e66b00] rounded hover:bg-[#e66b00] border-solid border-2 border-[#e66b00]",
    },
  },
});
