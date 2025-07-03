import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import PlaceAutocomplete from "../../components/PlaceAutocomplete/PlaceAutocomplete";
import { registerUser } from "../../api/RegisterUser";

type Errors = {
  name?: boolean;
  birthDate?: boolean;
  birthTime?: boolean;
  birthPlace?: boolean;
  residencePlace?: boolean;
};

type RegistrationPageProps = {
  setRegistered: (value: boolean) => void;
  telegramId: number | null;
};

declare global {
  interface Window {
    Telegram: any;
  }
}

const RegistrationPage = ({ setRegistered, telegramId }: RegistrationPageProps) => {
  const [samePlace, setSamePlace] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [showValidationError, setShowValidationError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [showUnregisteredPopup, setShowUnregisteredPopup] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [privacyError, setPrivacyError] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const YOUR_GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY;

  const [name, setName] = useState("");
  const [gender, setGender] = useState("female");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [residencePlace, setResidencePlace] = useState("");

  // Сбрасываем ошибку валидации при любом изменении полей
  useEffect(() => {
    setErrors({});
    setShowValidationError(false);
    setPrivacyError(false);
  }, [name, birthDate, birthTime, birthPlace, residencePlace, samePlace]);


  useEffect(() => {
    if (samePlace) {
      setResidencePlace(birthPlace);
      setErrors((prev) => ({ ...prev, residencePlace: false }));
    }
  }, [samePlace, birthPlace]);

  const handleBirthPlaceChange = (value: string) => {
    setBirthPlace(value);
    setErrors((prev) => ({ ...prev, birthPlace: false }));
  };

  const handleResidencePlaceChange = (value: string) => {
    setResidencePlace(value);
    setErrors((prev) => ({ ...prev, residencePlace: false }));
  };

  const validateForm = () => {
  const newErrors: Errors = {};
  
  if (!name.trim()) newErrors.name = true;
  if (!birthDate || birthDate > today) newErrors.birthDate = true;
  if (!birthTime) newErrors.birthTime = true;
  if (!birthPlace.trim()) newErrors.birthPlace = true;
  if (!samePlace && !residencePlace.trim()) newErrors.residencePlace = true;

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    setShowValidationError(true);
    setPrivacyError(false);
    return false;
  }

  if (!privacyChecked) {
    setPrivacyError(true);
    setShowValidationError(false);
    setErrors({});
    return false;
  }

  setErrors({});
  setShowValidationError(false);
  setPrivacyError(false);
  return true;
};


  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setResultMessage(null);

    let firstName = "MockFirst";
    let username = "MockUser";

    try {
      if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe?.user) {
        telegramId = window.Telegram.WebApp.initDataUnsafe.user.id;
        firstName = window.Telegram.WebApp.initDataUnsafe.user.first_name;
        username = window.Telegram.WebApp.initDataUnsafe.user.username ?? username;
      }
    } catch (error) {
      console.log("Telegram WebApp not detected — using mocks", error);
    }

    if (telegramId === null) {
      // Показываем ошибку, не отправляем форму
      setResultMessage("Telegram ID не получен, регистрация невозможна.");
      return;
}

    const payload = {
      telegram_id: telegramId,
      first_name: firstName,
      username,
      name,
      gender,
      birth_date: birthDate,
      birth_time: birthTime,
      birth_place: birthPlace,
      residence_place: residencePlace,
      privacy_agreed: privacyChecked,
      is_unregistered: false,
    };

    try {
      await registerUser(payload);
      setResultMessage("✅ Успешно отправлено!");
      setRegistered(true);
    } catch (error: any) {
      console.error(error);
      setResultMessage("❌ Ошибка при отправке. Проверьте консоль.");
    } finally {
      setLoading(false);
    }
  };

  const handleContinueUnregistered = async () => {
  if (!privacyChecked) {
    setPrivacyError(true);
    return;
  }

  setShowUnregisteredPopup(false);
  setLoading(true);
  setResultMessage(null);

  try {
    const telegramUser = window.Telegram?.WebApp?.initDataUnsafe?.user;
    if (telegramId === null) {
      // Показываем ошибку, не отправляем форму
      setResultMessage("Telegram ID не получен, регистрация невозможна.");
      return;
    }
    const payload = {
      telegram_id: telegramId,
      first_name: telegramUser?.first_name || undefined,
      username: telegramUser?.username || undefined,
      name: undefined,
      gender: undefined,
      birth_date: undefined,
      birth_time: undefined,
      birth_place: undefined,
      residence_place: undefined,
      privacy_agreed: privacyChecked,
      is_unregistered: true,
    };

    await registerUser(payload);
    setRegistered(true);
  } catch (error: unknown) {
    console.error('Registration error:', error);
    setResultMessage("❌ Ошибка при сохранении. Попробуйте позже.");
  } finally {
    setLoading(false);
  }
};

  const handleOpenUnregisteredPopup = () => {
    setErrors({});
    setShowValidationError(false);
    setResultMessage(null);
    if (!privacyChecked) {
      setPrivacyError(true);
      const checkbox = document.getElementById('privacy');
      checkbox?.animate([
        { transform: 'translateX(0)' },
        { transform: 'translateX(-5px)' },
        { transform: 'translateX(5px)' },
        { transform: 'translateX(0)' }
      ], {
        duration: 300,
        iterations: 3
      });
      return;
    }
    setShowUnregisteredPopup(true);
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
                setErrors((prev) => ({ ...prev, name: false }));
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
              max={today}
              value={birthDate}
              onChange={(e) => {
                setBirthDate(e.target.value);
                setErrors((prev) => ({ ...prev, birthDate: false }));
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
                setErrors((prev) => ({ ...prev, birthTime: false }));
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
            apiKey={YOUR_GOOGLE_API_KEY}
            disabled={false}
            className={errors.birthPlace ? styles.error : ""}
          />

          <PlaceAutocomplete
            label="Место проживания"
            value={residencePlace}
            onChange={handleResidencePlaceChange}
            apiKey={YOUR_GOOGLE_API_KEY}
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

      <div className={styles.privacySection}>
        <div className={styles.privacyCheckbox}>
          <input
            type="checkbox"
            id="privacy"
            checked={privacyChecked}
            onChange={(e) => {
              setPrivacyChecked(e.target.checked);
              setPrivacyError(false);
            }}
            className={privacyError ? styles.error : ""}
          />
          <label htmlFor="privacy">
            Ознакомлен с <a href="/privacy-policy" target="_blank">политикой конфиденциальности</a> и <a href="/public-offer" target="_blank">публичной офертой</a>
          </label>
        </div>
        {showValidationError && (
        <div className={styles.validationError}>
          ❌ Не все обязательные поля заполнены
        </div>
      )}
        {privacyError && (
          <div className={styles.privacyError}>
            ❌ Необходимо подтвердить согласие для продолжения
          </div>
        )}
      </div>

      <button
        className={styles.saveButton}
        onClick={handleSave}
        disabled={loading}
      >
        {loading ? "Отправка..." : "Сохранить"}
      </button>

      <button
        className={styles.unregisteredButton}
        onClick={handleOpenUnregisteredPopup}
      >
        Продолжить без регистрации
      </button>

      {resultMessage && <div className={styles.result}>{resultMessage}</div>}

      {showUnregisteredPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <h3>Ограниченный доступ</h3>
            <p>Без регистрации будут недоступны некоторые функции приложения, такие как построение натальной карты и персонализированные предсказания.</p>
            <p>Вы всегда сможете завершить регистрацию позже в настройках профиля.</p>
            
            <div className={styles.popupButtons}>
              <button 
                className={styles.popupCancel}
                onClick={() => setShowUnregisteredPopup(false)}
              >
                Вернуться к регистрации
              </button>
              <button 
                className={styles.popupConfirm}
                onClick={handleContinueUnregistered}
              >
                Продолжить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationPage;