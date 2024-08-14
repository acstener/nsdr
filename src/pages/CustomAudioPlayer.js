import React, { useState, useEffect, useRef } from 'react';

const CustomAudioPlayer = ({ streamUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const iframeRef = useRef(null);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'playerStateChange') {
        setIsPlaying(event.data.playing);
      } else if (event.data.type === 'timeupdate') {
        setCurrentTime(event.data.currentTime);
        setDuration(event.data.duration);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const togglePlayPause = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ type: 'togglePlayPause' }, '*');
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ type: 'seek', time }, '*');
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <iframe
        ref={iframeRef}
        src={`${streamUrl}?autoplay=false&hideControls=true`}
        width="100%"
        height="0"
        allow="autoplay"
        style={{ border: 'none' }}
      ></iframe>
      <button 
        onClick={togglePlayPause}
        className="bg-nsdr-accent text-nsdr-dark px-4 py-2 rounded-full mb-4"
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <input
        type="range"
        min={0}
        max={duration}
        value={currentTime}
        onChange={handleSeek}
        className="w-full mb-2"
      />
      <div className="text-white text-sm">
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>
    </div>
  );
};

export default CustomAudioPlayer;