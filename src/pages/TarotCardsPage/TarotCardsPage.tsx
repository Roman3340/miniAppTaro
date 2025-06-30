import styles from "./styles.module.css";


const TarotCardsPage = () => {
    
  
  return (
    <div className={styles.taroPage}>
      <div className={styles.title}>Расклады Таро</div>
      <div className={styles.questionBlock}>
        <input
          type="text"
          className={styles.questionInput}
          placeholder="Введите свой вопрос"
        />
      </div>
        <div className={styles.chooseTypeBlock}>
            <div className={styles.typeCards}>
                <div className={styles.typeCardsTitle}>Расклад по 1 карте (Да/Нет)</div>
                <div className={styles.typeCardsIcon}>
                    <img src="tarotCard1.png" alt="Карта Таро" />
                </div>
            </div>
            <div className={styles.typeCards}>
                <div className={styles.typeCardsTitle}>Расклад по 2 картам</div>
                <div className={styles.typeCardsIcon}>
                    <img src="tarotCard2.png" alt="Карты Таро" />
                </div>
            </div>
            <div className={styles.typeCards}>
                <div className={styles.typeCardsTitle}>Расклад по 3 картам</div>
                <div className={styles.typeCardsIcon}>
                    <img src="tarotCard3.png" alt="Карты Таро" />
                </div>
            </div>
            <div className={styles.typeCards}>
                <div className={styles.typeCardsTitle}>Расклад по 6 картам</div>
                <div className={styles.typeCardsIcon}>
                    <img src="tarotCard6.png" alt="Карты Таро" />
                </div>
            </div>
        </div>
    </div>
  );
};

export default TarotCardsPage;