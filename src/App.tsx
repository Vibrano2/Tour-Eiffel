import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CurrencyConverter from './components/CurrencyConverter';
import { AnimatePresence } from 'motion/react';

// Pages
import HomePage from './pages/HomePage';
import RoomsPage from './pages/RoomsPage';
import RestaurantPage from './pages/RestaurantPage';
import EventsPage from './pages/EventsPage';
import ChatPage from './pages/ChatPage';

export default function App() {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const location = useLocation();

  const handleSelectRoomAndNavigate = (roomId: string) => {
    setSelectedRoomId(roomId);
  };

  const handleClearSelectedRoom = () => {
    setSelectedRoomId(null);
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen text-gray-900 selection:bg-gold-500 selection:text-gray-900 flex flex-col justify-between" id="app-root-shell">
      
      {/* Universal Floating Header */}
      <Header />

      {/* Main Core View Area with luxury slide/fade transitions */}
      <main className="flex-grow pt-20 overflow-hidden">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage onSelectRoom={handleSelectRoomAndNavigate} />} />
            <Route path="/rooms" element={<RoomsPage selectedRoomId={selectedRoomId} onClearSelectedRoom={handleClearSelectedRoom} />} />
            <Route path="/restaurant" element={<RestaurantPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Gilded Currency Conversion Desk (Universal utility) */}
      <CurrencyConverter />

      {/* Elegant Standard Global Footer */}
      <Footer />
    </div>
  );
}
