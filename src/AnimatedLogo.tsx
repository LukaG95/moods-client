import { useLocation } from "react-router-dom";
import LogoHead from "@/assets/images/logo_head.svg";
import LogoText from "@/assets/images/logo_text.svg";
import styles from "./AnimatedLogo.module.scss";
import { useEffect, useState, useRef } from "react";

type PageType = "signup" | "login" | undefined;

export default function AnimatedLogo() {
  const location = useLocation();

  const [page, setPage] = useState<PageType>(() => getPage(location.pathname));
  const [animate, setAnimate] = useState(false);

  const prevPath = useRef(location.pathname);

  useEffect(() => {
    const newPage = getPage(location.pathname);
    setPage(newPage);

    if (location.pathname === prevPath.current) {
      setAnimate(false);
      return;
    }

    prevPath.current = location.pathname;
    setAnimate(true);
  }, [location.pathname]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <img
          src={LogoHead}
          alt="Logo Head"
          className={`
          ${styles.head}
          ${
            animate
              ? page === "login"
                ? styles.left
                : page === "signup"
                  ? styles.right
                  : ""
              : page === "signup"
                ? styles.tiltInitialPosition
                : ""
          }
        `}
        />

        <img src={LogoText} alt="Logo Text" className={styles.text} />

        <img
          src={LogoHead}
          alt="Logo Head"
          className={`${styles.head2} ${page === "signup" && styles.appear}`}
        />
      </div>
    </div>
  );
}

function getPage(path: string): PageType {
  if (path === "/login") return "login";
  if (path === "/signup") return "signup";
  return undefined;
}
