import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from '@components/layout/Header/Header';
import { ResumeContent } from './pages/ResumeContent/ResumeContent';
import { ResumeCustomization } from './pages/ResumeCustomization/ResumeCustomization';

import './App.css';

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<ResumeContent />} />
                <Route
                    path="/customization"
                    element={<ResumeCustomization />}
                />
                <Route path="*" element={<p>404</p>} />
            </Routes>
        </Router>
    );
};

export default App;
