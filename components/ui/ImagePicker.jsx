import styles from "./Input.module.css";

export default function Input({ label, name, ...rest }) {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/heic, image/heif"
        name={name}
        className={styles.input}
        {...rest}
      ></input>
    </div>
  );
}
