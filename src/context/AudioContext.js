import React, { createContext, useState, useContext, useCallback, useEffect, useRef } from 'react';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener('timeupdate', handleProgress);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleProgress);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const handleProgress = () => {
    const audio = audioRef.current;
    setProgress(audio.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  const playTrack = useCallback((track) => {
    setIsLoading(true);
    setError(null);
    const audio = audioRef.current;
    audio.src = track.audio_url;
    audio.load();
    audio.play().then(() => {
      setCurrentTrack(track);
      setIsPlaying(true);
      setIsLoading(false);
    }).catch(error => {
      console.error('Error playing track:', error);
      setError('Failed to play track. Please try again.');
      setIsLoading(false);
    });
  }, []);

  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else if (currentTrack) {
      audio.play().catch(error => {
        console.error('Error resuming track:', error);
        setError('Failed to resume track. Please try again.');
      });
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, currentTrack]);

  const seek = useCallback((time) => {
    const audio = audioRef.current;
    audio.currentTime = time;
    setProgress(time);
  }, []);

  const updateVolume = useCallback((newVolume) => {
    const audio = audioRef.current;
    audio.volume = newVolume;
    setVolume(newVolume);
  }, []);

  return (
    <AudioContext.Provider value={{
      currentTrack, isPlaying, isLoading, error, progress, duration, volume,
      playTrack, togglePlayPause, seek, updateVolume
    }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);