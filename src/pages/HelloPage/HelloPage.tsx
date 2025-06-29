import styles from "./styles.module.css";

const HelloPage = () => {
  return (
    <div className={styles.helloPage}>
      <div className={styles.title}>Добро пожаловать!</div>
      <div className={styles.welcomeBlock}>
        <p>
          Это приложение поможет вам узнать значение ваших снов и совместимость
          по знакам зодиака. Выберите раздел в меню и начните своё путешествие в мир тайн и предсказаний!
        </p>
      </div>
    </div>
  );
};

export default HelloPage;
