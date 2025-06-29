import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './pages/Header';
import NatalChartPage from './pages/NatalChartPage/NatalChartPage'


function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/cases/:casesId" element={<ProductPage />} />
          <Route path="/admin/cases/:casesId" element={<AdminProductPage />} /> */}
          <Route path="*" element={
            <>
              <Header />
              <Routes>
                <Route path="/natalChart" element={<NatalChartPage />} />
              </Routes>
            </>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
