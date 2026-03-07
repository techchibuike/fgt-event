import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import About from './pages/About';
import Prizes from './pages/Prizes';
import Categories from './pages/Categories';
import FAQ from './pages/FAQ';
import Sponsors from './pages/Sponsors';
import ScrollToAnchor from './components/ScrollToAnchor';
import { PhaseProvider } from './context/PhaseContext';
import './App.css';

const App: React.FC = () => {
    return (
        <PhaseProvider>
            <Router>
                <ScrollToAnchor />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/prizes" element={<Prizes />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/sponsors" element={<Sponsors />} />
                </Routes>
            </Router>
        </PhaseProvider>
    );
};

export default App;
