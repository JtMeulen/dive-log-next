import styles from "./Input.module.css";

export default function Input({
  label,
  name,
  errorMessage,
  description,
  ...rest
}) {
  return (
    <div className={styles.inputWrapper}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        className={`${styles.input} ${errorMessage && styles.error}`}
        aria-describedby={description && `${name}-description`}
        {...rest}
      ></input>
      {description && (
        <em id={`${name}-description`} className={styles.description}>
          {description}
        </em>
      )}
      {errorMessage && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
}
