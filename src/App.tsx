import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './pages/Header';
import NatalChartPage from './pages/NatalChartPage/NatalChartPage'
import TarotCardsPage from './pages/TarotCardsPage/TarotCardsPage';
import DreamPage from './pages/DreamPage/DreamPage';
import ZodiacPage from './pages/ZodiacPage/ZodiacPage';
import HelloPage from './pages/HelloPage/HelloPage';

function App() {
  const [catalogOpen, setCatalogOpen] = React.useState(false);

  const toggleCatalog = () => setCatalogOpen(prev => !prev);
  const closeCatalog = () => setCatalogOpen(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="*" element={
            <>
              <Header />
              <Routes>
                <Route path="/" element={<HelloPage />} />
                <Route path="/natalChart" element={<NatalChartPage />} />
                <Route path="/tarotCards" element={<TarotCardsPage />} />
                <Route path="/dreams" element={<DreamPage />} />
                <Route path="/zodiac" element={<ZodiacPage />} />
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
{/* 
              <button
                className="friendButton"
              >
                Пригласить друга
              </button> */}

              {/* Панель */}
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
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
