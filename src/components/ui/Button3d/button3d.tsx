import React from "react";
import styles from "./button3d.module.css";

function Button3d({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <div className={styles.wrapper}>
      <button className={styles.button} {...props}>
        {children}
      </button>
    </div>
  );
}

export { Button3d };
