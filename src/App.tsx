import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PhotoCarousel from './components/PhotoCarousel';
import PillarsOfExcellence from './components/PillarsOfExcellence';
import PhotoGallery from './components/PhotoGallery';
import LoyaltyBenefits from './components/LoyaltyBenefits';
import PortoNovoWeather from './components/PortoNovoWeather';
import GuestTestimonials from './components/GuestTestimonials';
import FAQSection from './components/FAQSection';
import RoomsSection from './components/RoomsSection';
import RestaurantSection from './components/RestaurantSection';
import EventsSection from './components/EventsSection';
import ConciergeChat from './components/ConciergeChat';
import Footer from './components/Footer';
import CurrencyConverter from './components/CurrencyConverter';
import MeetYourHost from './components/MeetYourHost';
import { ActiveTab } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const handleSelectRoomAndNavigate = (roomId: string) => {
    setSelectedRoomId(roomId);
    setActiveTab('rooms');
  };

  const handleClearSelectedRoom = () => {
    setSelectedRoomId(null);
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen text-gray-900 selection:bg-gold-500 selection:text-gray-900 flex flex-col justify-between" id="app-root-shell">
      
      {/* Universal Floating Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Core View Area with luxury slide/fade transitions */}
      <main className="flex-grow pt-20 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              id="tab-home-container"
            >
              {/* Elegant Hero Intro banner */}
              <Hero 
                onExploreRooms={() => setActiveTab('rooms')} 
                onExploreRestaurant={() => setActiveTab('restaurant')}
                onSelectRoom={handleSelectRoomAndNavigate}
              />
              {/* Luxury Interactive Photo Carousel */}
              <PhotoCarousel onNavigateTab={setActiveTab} />
              {/* Bento Grid layout of elite sections */}
              <PillarsOfExcellence onNavigate={setActiveTab} />
              {/* Elegant high-resolution expandable photo gallery */}
              <PhotoGallery />
              {/* Exclusive luxury gold-themed Loyalty Circle Benefits */}
              <LoyaltyBenefits />
              {/* Elegant Meet Your Host Virtual companion */}
              <MeetYourHost onNavigateToChat={() => setActiveTab('chat')} />
              {/* Real-time Porto-Novo Atmospheric and Excursion Advisor */}
              <PortoNovoWeather />
              {/* Smooth glowing testimonials carousel */}
              <GuestTestimonials />
              {/* Elegant high-society translatable FAQ accordion */}
              <FAQSection />
            </motion.div>
          )}

          {activeTab === 'rooms' && (
            <motion.div
              key="rooms"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              id="tab-rooms-container"
            >
              <RoomsSection 
                selectedRoomId={selectedRoomId} 
                onClearSelectedRoom={handleClearSelectedRoom}
              />
            </motion.div>
          )}

          {activeTab === 'restaurant' && (
            <motion.div
              key="restaurant"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              id="tab-restaurant-container"
            >
              <RestaurantSection />
            </motion.div>
          )}

          {activeTab === 'events' && (
            <motion.div
              key="events"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              id="tab-events-container"
            >
              <EventsSection />
            </motion.div>
          )}

          {activeTab === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              id="tab-chat-container"
            >
              <ConciergeChat />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Gilded Currency Conversion Desk (Universal utility) */}
      <CurrencyConverter />

      {/* Elegant Standard Global Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
