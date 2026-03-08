import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Landing from './pages/Landing';
import Chat from './pages/Chat';
import MoodTracker from './pages/MoodTracker';
import Resources from './pages/Resources';
import LoadingScreen from './components/LoadingScreen';

const PageTitleUpdater = () => {
  const location = useLocation();

  const titles = {
    '/': 'MindBridge AI — Mental Wellness Companion',
    '/chat': 'MindBridge AI — Talk to Your Companion',
    '/mood': 'MindBridge AI — Mood Tracker',
    '/resources': 'MindBridge AI — Resource Hub',
    '/about': 'MindBridge AI — About',
    '/features': 'MindBridge AI — Features',
  };

  useEffect(() => {
    document.title = titles[location.pathname] || 'MindBridge AI';
  }, [location.pathname]);

  return null;
};

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      {!isLoading && (
        <Router>
          <PageTitleUpdater />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/mood" element={<MoodTracker />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/about" element={<Landing />} />
            <Route path="/features" element={<Landing />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default function App() {
  return <AppContent />;
}
