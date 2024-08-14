import React, { useContext } from 'react';
import { AudioContext } from '../context/AudioContext';

function AudioPlayer() {
  const { currentTrack, isPlaying, togglePlayPause } = useContext(AudioContext);

  const handlePlayPause = () => {
    console.log('AudioPlayer: Play/Pause button clicked');
    togglePlayPause();
  };

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-nsdr-dark bg-opacity-95 py-4 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePlayPause}
            className="text-nsdr-accent hover:text-white transition-colors"
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          <div className="text-white">
            <div className="font-semibold">{currentTrack.title}</div>
            <div className="text-sm opacity-75">{currentTrack.category}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;