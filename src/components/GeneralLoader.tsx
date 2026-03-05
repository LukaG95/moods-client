import LogoHead from "@/assets/images/logo_head.svg";
import styles from "./GeneralLoader.module.scss";

export default function GeneralLoader() {
  return (
    <div className={styles.loader}>
      <img
        src={LogoHead}
        alt="Loading"
        className={`${styles.dot} ${styles.dot1}`}
      />
      <img
        src={LogoHead}
        alt="Loading"
        className={`${styles.dot} ${styles.dot2}`}
      />
      <img
        src={LogoHead}
        alt="Loading"
        className={`${styles.dot} ${styles.dot3}`}
      />
    </div>
  );
}
