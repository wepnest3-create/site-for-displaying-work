import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WorksPage from './pages/WorksPage';
import PlansPage from './pages/PlansPage';
import PortfolioPage from './pages/PortfolioPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<WorksPage />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
      </Routes>
    </Router>
  );
}
