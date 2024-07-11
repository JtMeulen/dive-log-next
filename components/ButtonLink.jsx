import Link from "next/link";
import styles from "./ButtonLink.module.css";

export default function ButtonLink({ children, variant = "primary", ...rest }) {
  return (
    <Link {...rest} className={`${styles.button} ${styles[variant]}`}>
      {children}
    </Link>
  );
}
