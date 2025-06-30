import styles from "./styles.module.css";


const DayPrediction = () => {
  
  return (
    <div className={styles.natalPage}>
      <div className={styles.title}>Твой персональный прогноз на день</div>
      <div className={styles.description}>Основан на твоей дате рождения и актуальных транзитах</div>
      <div className={styles.buttonBlock}>
        <button className={styles.button}>
        Получить предсказание на день ☀️
        </button>
      </div>
    </div>
  );
};

export default DayPrediction;