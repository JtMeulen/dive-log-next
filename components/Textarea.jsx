import styles from "./Input.module.css";

export default function Input({ label, name, ...rest }) {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <textarea
        name={name}
        rows="5"
        className={styles.input}
        id={name}
        {...rest}
      ></textarea>
    </div>
  );
}
