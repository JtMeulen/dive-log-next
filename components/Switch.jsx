import styles from "./Switch.module.css";

export default function Switch({ label, name, ...rest }) {
  return (
    <div className={styles.container}>
      <div className={styles.toggle}>
        <input
          type="checkbox"
          className={styles.input}
          id={name}
          name={name}
          tabIndex="0"
          {...rest}
        />
        <span className={styles.rail}></span>
      </div>
      <label className={styles.label} htmlFor={name}>{label}</label>
    </div>
  );
}
