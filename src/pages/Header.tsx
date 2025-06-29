import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./styles.module.css";
// import { ADMIN_TELEGRAM_IDS } from "../../config/adminConfig";

// interface HeaderProps {
//   telegramUser: {
//     id: number;
//   } | null;
// }

// const Header: React.FC<HeaderProps> = ({ telegramUser }) => {
const Header = () => {
  const location = useLocation();
  const headerRef = useRef<HTMLDivElement>(null);
  const activeButtonRef = useRef<HTMLAnchorElement>(null);
  const isInitialLoad = useRef(true);

//   const isAdmin = telegramUser && ADMIN_TELEGRAM_IDS.includes(telegramUser.id);
    const isAdmin = true

  useEffect(() => {
    const scrollToActiveButton = () => {
      if (activeButtonRef.current && headerRef.current) {
        const header = headerRef.current;
        const button = activeButtonRef.current;

        const scrollPosition =
          button.offsetLeft - header.clientWidth / 2 + button.clientWidth / 2;

        header.scrollTo({
          left: scrollPosition,
          behavior: isInitialLoad.current ? "auto" : "smooth",
        });
      }
    };

    if (isInitialLoad.current) {
      const timer = setTimeout(() => {
        scrollToActiveButton();
        isInitialLoad.current = false;
      }, 50);
      return () => clearTimeout(timer);
    } else {
      scrollToActiveButton();
    }
  }, [location.pathname]);

  return (
    <header className={styles.header} ref={headerRef}>
      <div className={styles.buttonGroup}>
        <Link
          to="/"
          ref={location.pathname === "/" ? activeButtonRef : null}
          className={`${styles.navButton} ${
            location.pathname === "/" ? styles.active : ""
          }`}
        >
          <div className={styles.headerButton}>
            <div className={`${styles.headerIcon} ${styles.trackingIMG}`}>
              <img src="/mainpageSvg.svg" alt="Главная страница" />
            </div>
            <div className={styles.headerText}>Главная страница</div>
          </div>
        </Link>

        <Link
          to="/natalChart"
          ref={location.pathname === "/natalChart" ? activeButtonRef : null}
          className={`${styles.navButton} ${
            location.pathname === "/natalChart" ? styles.active : ""
          }`}
        >
          <div className={`${styles.headerButton}`}>
            <div className={styles.headerIcon}>
              <img src="/natalChartSvg.png" alt="Натальная карта" />
            </div>
            <div className={styles.headerText}>Натальная карта</div>
          </div>
        </Link>

        <Link
          to="/tarotCards"
          ref={location.pathname === "/tarotCards" ? activeButtonRef : null}
          className={`${styles.navButton} ${
            location.pathname === "/tarotCards" ? styles.active : ""
          }`}
        >
          <div className={`${styles.headerButton}`}>
            <div className={styles.headerIcon}>
              <img src="/tarotCardsSvg.png" alt="Карты Таро" />
            </div>
            <div className={styles.headerText}>Карты Таро</div>
          </div>
        </Link>

        <Link
          to="/dreams"
          ref={location.pathname === "/dreams" ? activeButtonRef : null}
          className={`${styles.navButton} ${
            location.pathname === "/dreams" ? styles.active : ""
          }`}
        >
          <div className={`${styles.headerButton}`}>
            <div className={`${styles.headerIcon} ${styles.casesIMG}`}>
              <img src="/sonnicSvg.png" alt="Сонник" />
            </div>
            <div className={styles.headerText}>Сонник</div>
          </div>
        </Link>

        <Link
          to="/zodiac"
          ref={location.pathname === "/zodiac" ? activeButtonRef : null}
          className={`${styles.navButton} ${
            location.pathname === "/zodiac" ? styles.active : ""
          }`}
        >
          <div className={`${styles.headerButton}`}>
            <div className={`${styles.headerIcon} ${styles.casesIMG}`}>
              <img src="/sovmestimostSvg.png" alt="Совместимость" />
            </div>
            <div className={`${styles.headerText} ${styles.headerTextMin}`}>Совместимость по зз</div>
          </div>
        </Link>

        {isAdmin && (
          <Link
            to="/admin/addCase"
            ref={location.pathname === "/admin/addCase" ? activeButtonRef : null}
            className={`${styles.navButton} ${styles.navButtonLast} ${
              location.pathname === "/admin/addCase" ? styles.active : ""
            }`}
          >
            <div className={`${styles.headerButton}`}>
              <div className={`${styles.headerIcon} ${styles.adminIMG}`}>
                <img src="/sovmestimostSvg.png" alt="Совместимость" />
              </div>
              <div className={styles.headerText}>Совместимость по зз</div>
            </div>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;