import { Routes, Route } from 'react-router-dom';
import Experience from './pages/Experience';
import Multicore from './pages/multicore';
import './App.css';

function App() {
  return (
    <div className="page-container">
      <Routes>
        <Route path="/" element={<Experience />} />
        <Route path="/projects/multicore" element={<Multicore />} />
      </Routes>
    </div>
  );
}

export default App;