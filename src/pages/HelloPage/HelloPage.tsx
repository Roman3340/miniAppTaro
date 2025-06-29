import styles from "./styles.module.css";

const HelloPage = () => {
  return (
    <div className={styles.helloPage}>
      <div className={styles.title}>Добро пожаловать!</div>
      <div className={styles.welcomeBlock}>
        <p>
          Я — Твой личный Таролог.<br /> На этой странице ты можешь
        </p>
      </div>
    </div>
  );
};

export default HelloPage;
