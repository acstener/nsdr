import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AudioProvider } from './context/AudioContext';
import Home from './pages/Home';
import Category from './pages/Category';
import TrackDetail from './pages/TrackDetail';
import Navbar from './components/Navbar';
import PersistentPlayer from './components/PersistentPlayer';

function App() {
  return (
    <AudioProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-nsdr-dark text-nsdr-light">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:categoryId" element={<Category />} />
              <Route path="/track/:trackId" element={<TrackDetail />} />
            </Routes>
          </main>
          <PersistentPlayer />
        </div>
      </Router>
    </AudioProvider>
  );
}

export default App;