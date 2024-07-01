import styles from './DiveGrid.module.css';
import DiveTile from "@/components/DiveTile";

// TODO: if the component does not grow, maybe move to the page instead
export default function DiveGrid({ dives }) {
  return (
    <ul className={styles.grid}>
      {dives.map((dive) => (
        <li key={dive.slug}>
          <DiveTile {...dive} />
        </li>
      ))}
    </ul>
  );
}
