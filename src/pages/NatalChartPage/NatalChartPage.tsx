import styles from "./styles.module.css";


const NatalChartPage = () => {
  
  return (
    <div className={styles.natalPage}>
      <div className={styles.title}>Твоя натальная карта</div>
      <div className={styles.buttonBlock}>
        <button className={styles.button}>
        Расшифровать натальную карту 🔮
        </button>
      </div>
      <div className={styles.natalChart}>
          <img src="/NatalChart4.svg" alt="Натальная карта" />
      </div>
    </div>
  );
};

export default NatalChartPage;