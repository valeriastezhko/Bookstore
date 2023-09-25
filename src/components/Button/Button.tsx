import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  text?: string;
  design?: "dark" | "light";
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  design = "dark",
  disabled = false,
  type = "button",
  className,
  onClick,
}) => {
  return (
    <button
      className={`${styles.button} ${styles[design]} ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
