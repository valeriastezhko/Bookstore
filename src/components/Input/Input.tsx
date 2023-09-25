import React, { memo, forwardRef } from "react";
import clsx from "clsx";
import styles from "./Input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  description?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, description, ...inputProps }, ref) => {
    return (
      <div className={styles.wrapper}>
        {label && (
          <label
            className={clsx(styles.label, { [styles.error]: error })}
            htmlFor={inputProps.id}
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          {...inputProps}
          className={clsx(
            styles.input,
            { [styles.error]: error },
            inputProps.className
          )}
        />
        {!!description && (
          <p className={clsx(styles.description, { [styles.error]: error })}>
            {description}
          </p>
        )}
      </div>
    );
  }
);

export default memo(Input);
