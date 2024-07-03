import styles from "./Input.module.css";

export default function Input({ label, name, ...rest }) {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input name={name} {...rest} className={styles.input}></input>
    </div>
  );
}
