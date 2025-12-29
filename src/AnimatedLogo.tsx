import { useLocation } from "react-router-dom";
import LogoHead from "@/assets/images/logo_head.svg";
import LogoText from "@/assets/images/logo_text.svg";
import styles from "./AnimatedLogo.module.scss";

export default function AnimatedLogo() {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <img
          src={LogoHead}
          alt="Logo Head"
          className={`${styles.head} ${isLogin ? styles.left : styles.right}`}
        />
        <img
          src={LogoHead}
          alt="Logo Head"
          className={`${styles.head2} ${!isLogin && styles.appear}`}
        />
        <img src={LogoText} alt="Logo Text" className={styles.text} />
      </div>
    </div>
  );
}
