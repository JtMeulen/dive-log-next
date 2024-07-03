import styles from "./Button.module.css";

export default function Button({ children, variant = "primary", ...rest }) {
  return (
    <button {...rest} className={`${styles.button} ${styles[variant]}`}>
      {children}
    </button>
  );
}
