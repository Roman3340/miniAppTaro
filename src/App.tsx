import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './pages/Header';
import NatalChartPage from './pages/NatalChartPage/NatalChartPage'
import TarotCardsPage from './pages/TarotCardsPage/TarotCardsPage';
import DreamPage from './pages/DreamPage/DreamPage';
import ZodiacPage from './pages/ZodiacPage/ZodiacPage';
import HelloPage from './pages/HelloPage/HelloPage';
// import Loader from './components/Loader/Loader';


function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="*" element={
            <>
              <Header />
              {/* <Loader /> */}
              <Routes>
                <Route path="/" element={<HelloPage />} />
                <Route path="/natalChart" element={<NatalChartPage />} />
                <Route path="/tarotCards" element={<TarotCardsPage />} />
                <Route path="/dreams" element={<DreamPage />} />
                <Route path="/zodiac" element={<ZodiacPage />} />
              </Routes>
            </>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
