import styles from "./Divider.module.css";

export default function Divider({ children }) {
  return (
    <div className={styles.divider}>
      <div></div>
      <em>{children}</em>
      <div></div>
    </div>
  );
}
