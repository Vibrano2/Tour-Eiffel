import React from 'react';
import Hero from '../components/Hero';
import PhotoCarousel from '../components/PhotoCarousel';
import PillarsOfExcellence from '../components/PillarsOfExcellence';
import PhotoGallery from '../components/PhotoGallery';
import LoyaltyBenefits from '../components/LoyaltyBenefits';
import PortoNovoWeather from '../components/PortoNovoWeather';
import GuestTestimonials from '../components/GuestTestimonials';
import FAQSection from '../components/FAQSection';
import MeetYourHost from '../components/MeetYourHost';
import { useNavigate } from 'react-router-dom';

interface HomePageProps {
  onSelectRoom: (roomId: string) => void;
}

export default function HomePage({ onSelectRoom }: HomePageProps) {
  const navigate = useNavigate();

  return (
    <div id="tab-home-container" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Hero 
        onExploreRooms={() => navigate('/rooms')} 
        onExploreRestaurant={() => navigate('/restaurant')}
        onSelectRoom={(roomId) => {
          onSelectRoom(roomId);
          navigate('/rooms');
        }}
      />
      <PhotoCarousel onNavigateTab={(tab) => {
        if (tab === 'home') navigate('/');
        else navigate(`/${tab}`);
      }} />
      <PillarsOfExcellence onNavigate={(tab) => {
        if (tab === 'home') navigate('/');
        else navigate(`/${tab}`);
      }} />
      <PhotoGallery />
      <LoyaltyBenefits />
      <MeetYourHost onNavigateToChat={() => navigate('/chat')} />
      <PortoNovoWeather />
      <GuestTestimonials />
      <FAQSection />
    </div>
  );
}
