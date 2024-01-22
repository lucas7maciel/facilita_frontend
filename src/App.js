import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import { Home } from './pages/home';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.title = "Limpezas"
  })

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
