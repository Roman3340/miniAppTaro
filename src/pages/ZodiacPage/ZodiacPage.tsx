import { useState } from "react";
import styles from "./styles.module.css";

const zodiacSigns = [
  { name: "Овен", icon: "/zodiac/aries.svg" },
  { name: "Телец", icon: "/zodiac/taurus.svg" },
  { name: "Близнецы", icon: "/zodiac/gemini.svg" },
  { name: "Рак", icon: "/zodiac/cancer.svg" },
  { name: "Лев", icon: "/zodiac/leo.svg" },
  { name: "Дева", icon: "/zodiac/virgo.svg" },
  { name: "Весы", icon: "/zodiac/libra.svg" },
  { name: "Скорпион", icon: "/zodiac/scorpio.svg" },
  { name: "Стрелец", icon: "/zodiac/sagittarius.svg" },
  { name: "Козерог", icon: "/zodiac/capricorn.svg" },
  { name: "Водолей", icon: "/zodiac/aquarius.svg" },
  { name: "Рыбы", icon: "/zodiac/pisces.svg" },
];

const ZodiacPage = () => {
  const [userSign, setUserSign] = useState<string | null>(null);
  const [partnerSign, setPartnerSign] = useState<string | null>(null);

  const [openUser, setOpenUser] = useState(false);
  const [openPartner, setOpenPartner] = useState(false);

  return (
    <div className={styles.zodiacPage}>
      <div className={styles.title}>Совместимость по знакам зодиака</div>

      <div className={styles.selectorBlock}>
        <button
          className={styles.selectorButton}
          onClick={() => setOpenUser((prev) => !prev)}
        >
          Ваш знак зодиака {userSign && `: ${userSign}`}
        </button>
        <div className={`${styles.signGridWrapper} ${openUser ? styles.open : ""}`}>
          <div className={styles.signGrid}>
            {zodiacSigns.map((sign) => (
              <div
                key={sign.name}
                className={`${styles.signCard} ${userSign === sign.name ? styles.selected : ""}`}
                onClick={() => {
                  setUserSign(sign.name);
                  setOpenUser(false);
                }}
              >
                <img src={sign.icon} alt={sign.name} className={styles.signIcon} />
                <div className={styles.signLabel}>{sign.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.selectorBlock}>
        <button
          className={styles.selectorButton}
          onClick={() => setOpenPartner((prev) => !prev)}
        >
          Знак зодиака партнера {partnerSign && `: ${partnerSign}`}
        </button>
        <div className={`${styles.signGridWrapper} ${openPartner ? styles.open : ""}`}>
          <div className={styles.signGrid}>
            {zodiacSigns.map((sign) => (
              <div
                key={sign.name}
                className={`${styles.signCard} ${partnerSign === sign.name ? styles.selected : ""}`}
                onClick={() => {
                  setPartnerSign(sign.name);
                  setOpenPartner(false);
                }}
              >
                <img src={sign.icon} alt={sign.name} className={styles.signIcon} />
                <div className={styles.signLabel}>{sign.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.buttonBlock}>
        <button className={styles.button}>
        Узнать совместимость 🧡
        </button>
      </div>
    </div>
  );
};

export default ZodiacPage;
