import { useState } from "react";
import styles from "./styles.module.css";

const DreamPage = () => {
  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= 600) {
      setText(e.target.value);
    }
  };

  return (
    <div className={styles.dreamPage}>
      <div className={styles.title}>Сонник</div>
      <div className={styles.questionBlock}>
        <textarea
          className={styles.questionInput}
          placeholder="Введите свой сон"
          value={text}
          onChange={handleChange}
          maxLength={600}
        />
        <div className={styles.charCount}>
          {text.length} / 600
        </div>
      </div>
      <div className={styles.buttonBlock}>
        <button className={styles.button}>
        Получить интерпретацию сна 🌙
        </button>
      </div>
    </div>
  );
};

export default DreamPage;
