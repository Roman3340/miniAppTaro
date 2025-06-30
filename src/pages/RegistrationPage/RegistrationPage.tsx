import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import PlaceAutocomplete from "../../components/PlaceAutocomplete/PlaceAutocomplete";


type Errors = {
  name?: boolean;
  birthDate?: boolean;
  birthTime?: boolean;
  birthPlace?: boolean;
  residencePlace?: boolean;
};

type RegistrationPageProps = {
  setRegistered: (value: boolean) => void;
};



const RegistrationPage = ({ setRegistered }: RegistrationPageProps) => {
  const [samePlace, setSamePlace] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const YOUR_GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY;




  const [name, setName] = useState("");
    const [gender, setGender] = useState("female");
    const [birthDate, setBirthDate] = useState("");
    const [birthTime, setBirthTime] = useState("");


  // Добавляем состояния для мест
  const [birthPlace, setBirthPlace] = useState("");
  const [residencePlace, setResidencePlace] = useState("");

  

  // Если checked "Такое же, как место рождения", то синхронизируем
  useEffect(() => {
    if (samePlace) {
      setResidencePlace(birthPlace);
      setErrors((prev) => ({ ...prev, residencePlace: false }));
    }
  }, [samePlace, birthPlace]);

  const handleSave = () => {
    const newErrors: Errors = {};
    if (!name.trim()) newErrors.name = true;
    if (!birthDate) newErrors.birthDate = true;
    if (!birthTime) newErrors.birthTime = true;
    if (!birthPlace.trim()) newErrors.birthPlace = true;
    if (!samePlace && !residencePlace.trim()) {
        newErrors.residencePlace = true;
    }

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
    } else {
        setErrors({});
        setRegistered(true);
    }
    };

    const handleBirthPlaceChange = (value: string) => {
        setBirthPlace(value);
        setErrors((prev) => ({ ...prev, birthPlace: false }));
    };

    const handleResidencePlaceChange = (value: string) => {
        setResidencePlace(value);
        setErrors((prev) => ({ ...prev, residencePlace: false }));
    };



  return (
    <div className={styles.registrationPage}>
      <h2 className={styles.title}>Регистрация</h2>

      <div className={styles.card}>
        <div className={styles.row}>
          <label>
            Имя
            <input
                type="text"
                placeholder="..."
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                    setErrors(prev => ({ ...prev, name: false }));
                }}
                className={errors.name ? styles.error : ""}
            />
          </label>
          <label>
            Пол
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="female">Женский</option>
              <option value="male">Мужской</option>
            </select>
          </label>
        </div>
        <div className={styles.row}>
          <label>
            Дата рождения
            <input
                type="date"
                value={birthDate}
                onChange={(e) => {
                    setBirthDate(e.target.value);
                    setErrors(prev => ({ ...prev, birthDate: false }));
                }}
                className={errors.birthDate ? styles.error : ""}
            />

          </label>
          <label>
            Время рождения
            <input
                type="time"
                value={birthTime}
                onChange={(e) => {
                    setBirthTime(e.target.value);
                    setErrors(prev => ({ ...prev, birthTime: false }));
                }}
                className={errors.birthTime ? styles.error : ""}
            />

          </label>
        </div>
        <div className={styles.description}>Если не знаешь время рождения - пиши 12:00</div>
      </div>

      <div className={styles.card}>
        <div className={styles.column}>
          <PlaceAutocomplete
            label="Место рождения"
            value={birthPlace}
            onChange={handleBirthPlaceChange}
            apiKey={YOUR_GOOGLE_API_KEY} // замените на ваш ключ
            disabled={false}
            className={errors.birthPlace ? styles.error : ""}
          />

          <PlaceAutocomplete
            label="Место проживания"
            value={residencePlace}
            onChange={handleResidencePlaceChange}
            apiKey={YOUR_GOOGLE_API_KEY} // замените на ваш ключ
            // Делаем input disabled если samePlace=true
            // Для этого нужно добавить проп disabled в PlaceAutocomplete
            disabled={samePlace}
            className={errors.residencePlace ? styles.error : ""}
          />

          <div className={styles.checkboxRow}>
            <input
              type="checkbox"
              id="samePlace"
              checked={samePlace}
              onChange={(e) => setSamePlace(e.target.checked)}
            />
            <label htmlFor="samePlace">Такое же, как место рождения</label>
          </div>
        </div>
      </div>

      <button className={styles.saveButton} onClick={handleSave}>
        Сохранить
        </button>

    </div>
  );
};

export default RegistrationPage;
