import { Experience } from "./components/Experience";
import { Room } from "./components/Room";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Room>
        <Experience />
      </Room>
    </div>
  );
}
