import React from 'react';
import RoomsSection from '../components/RoomsSection';

interface RoomsPageProps {
  selectedRoomId: string | null;
  onClearSelectedRoom: () => void;
}

export default function RoomsPage({ selectedRoomId, onClearSelectedRoom }: RoomsPageProps) {
  return (
    <div id="tab-rooms-container" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <RoomsSection 
        selectedRoomId={selectedRoomId} 
        onClearSelectedRoom={onClearSelectedRoom}
      />
    </div>
  );
}
