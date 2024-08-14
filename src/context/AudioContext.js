import React, { createContext, useState, useContext, useCallback } from 'react';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audio] = useState(new Audio());

  const playTrack = useCallback((track) => {
    setIsLoading(true);
    audio.src = track.audio_url;
    audio.load();
    audio.play().then(() => {
      setCurrentTrack(track);
      setIsPlaying(true);
      setIsLoading(false);
    }).catch(error => {
      console.error('Error playing track:', error);
      setIsLoading(false);
    });
  }, [audio]);

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      audio.pause();
    } else if (currentTrack) {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, currentTrack, audio]);

  return (
    <AudioContext.Provider value={{ currentTrack, isPlaying, isLoading, playTrack, togglePlayPause }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);