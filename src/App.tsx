import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './pages/Header';
import NatalChartPage from './pages/NatalChartPage/NatalChartPage';
import TarotCardsPage from './pages/TarotCardsPage/TarotCardsPage';
import DreamPage from './pages/DreamPage/DreamPage';
import ZodiacPage from './pages/ZodiacPage/ZodiacPage';
import HelloPage from './pages/HelloPage/HelloPage';
import DayPrediction from './pages/DayPrediction/DayPrediction';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';

import { checkRegistration } from './api/CheckRegistration'; // твой get-роут
import AstroLoader from './components/Loader/Loader'; // Импортируем твой лоадер

// Типизация для Telegram WebApp
declare global {
  interface Window {
    Telegram: any;
  }
}

function App() {
  // Заглушка: пока считаем пользователь не зарегистрирован
  const [registered, setRegistered] = useState<boolean | null>(null);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [telegramId, setTelegramId] = useState<number | null>(null);

  const toggleCatalog = () => setCatalogOpen(prev => !prev);
  const closeCatalog = () => setCatalogOpen(false);

  useEffect(() => {
    // ================================
    // 1. Получаем telegram_id
    // ================================
    let userId: number | null = null;

    // Пробуем взять из Telegram WebApp
    if (window.Telegram && window.Telegram.WebApp) {
      userId = window.Telegram.WebApp.initDataUnsafe?.user?.id ?? null;
    }

    // Если нет Telegram — используем MOCK
    if (!userId) {
      console.log('No Telegram detected, using mock ID');
      userId = 665444333;
    }

    setTelegramId(userId);

    // ================================
    // 2. Проверяем регистрацию на бэке
    // ================================
    if (userId) {
      checkRegistration(userId)
        .then(() => setRegistered(true))
        .catch(() => setRegistered(false));
    } else {
      setRegistered(false);
    }
  }, []);

  // ================================
  // 3. Показ во время загрузки
  // ================================
  if (registered === null) {
    return (
      <div className="App">
        <AstroLoader />
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        {!registered ? (
          <RegistrationPage setRegistered={setRegistered} telegramId={telegramId} />
        ) : (
          <>
            <Header />

            <Routes>
              <Route path="/" element={<HelloPage />} />
              <Route path="/natalChart" element={<NatalChartPage />} />
              <Route path="/tarotCards" element={<TarotCardsPage />} />
              <Route path="/dreams" element={<DreamPage />} />
              <Route path="/zodiac" element={<ZodiacPage />} />
              <Route path="/dayPrediction" element={<DayPrediction />} />
            </Routes>

            {/* Overlay */}
            {catalogOpen && <div className="overlay" onClick={closeCatalog} />}

            {/* Фиксированная кнопка */}
            <button
              className="catalogButton"
              onClick={toggleCatalog}
              aria-expanded={catalogOpen}
              aria-controls="catalogPanel"
            >
              Каталог
            </button>

            {/* Боковая панель */}
            <div
              id="catalogPanel"
              className={`catalogPanel ${catalogOpen ? 'open' : ''}`}
              aria-hidden={!catalogOpen}
            >
              <button className="catalogItem">Платные расклады и подписка ✨</button>
              <button className="catalogItem">Как пользоваться приложением ❓</button>
              <button className="catalogItem">Мой баланс раскладов 🔮</button>
              <button className="catalogItem">Техподдержка ⚙️</button>
              <button className="catalogItem wide">Пригласить друга 🙍‍♀️</button>
            </div>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
