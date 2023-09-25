import React from "react";
import clsx from "clsx";
import styles from "./Typography.module.css";

interface TypographyProps extends React.HTMLProps<HTMLElement> {
  variant?: "h1" | "h2" | "h3" | "s1" | "b1" | "b2";
  color?: "primary" | "primary2" | "secondary";
  font: "bebasNeue" | "helios" | "dinPro";
  className?: string;
  children: React.ReactNode;
}

const Typography: React.FC<TypographyProps> = ({
  variant = "s1",
  color = "primary",
  font = "bebasNeue",
  className,
  children,
}) => {
  const tagMapping: Record<string, string> = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    s1: "p",
    b1: "p",
    b2: "p",
  };

  const Tag = tagMapping[variant];

  return React.createElement(
    Tag,
    {
      className: clsx(styles[variant], styles[color], styles[font], className),
    },
    children
  );
};
export default Typography;
