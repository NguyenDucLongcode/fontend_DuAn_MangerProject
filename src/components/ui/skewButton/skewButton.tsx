import React from "react";
import styles from "./skewButton.module.css";

function SkewButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={styles.button} {...props}>
      <span>{children}</span>
    </button>
  );
}

export { SkewButton };
