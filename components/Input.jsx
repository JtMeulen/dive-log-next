import styles from "./Input.module.css";

export default function Input({ label, name, errorMessage, ...rest }) {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        className={`${styles.input} ${errorMessage && styles.error}`}
        {...rest}
      ></input>
      {errorMessage && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
}
