import React from 'react';
import { useAudio } from '../context/AudioContext';

const PersistentPlayer = () => {
  const { currentTrack, isPlaying, togglePlayPause } = useAudio();

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        <div>
          <h3 className="text-white font-semibold">{currentTrack.title}</h3>
          <p className="text-gray-400 text-sm">{currentTrack.category}</p>
        </div>
        <button 
          onClick={togglePlayPause}
          className="bg-nsdr-accent text-nsdr-dark px-4 py-2 rounded-full"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  );
};

export default PersistentPlayer;