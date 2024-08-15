import React from 'react';
import { useAudio } from '../context/AudioContext';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';

const NowPlayingView = ({ onClose }) => {
  const { currentTrack, isPlaying, togglePlayPause, progress, duration, seek } = useAudio();

  if (!currentTrack) return null;

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center"
    >
      <div className="bg-gray-800 p-8 rounded-lg max-w-md w-full">
        <button onClick={onClose} className="absolute top-4 right-4 text-white">Close</button>
        <img src={currentTrack.image_url || '/default-album-art.jpg'} alt={currentTrack.title} className="w-64 h-64 mx-auto rounded-lg shadow-lg mb-6" />
        <h2 className="text-white text-2xl font-bold mb-2">{currentTrack.title}</h2>
        <p className="text-gray-400 mb-6">{currentTrack.artist}</p>
        <div className="mb-4">
          <input
            type="range"
            min="0"
            max={duration}
            value={progress}
            onChange={(e) => seek(parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-gray-400 text-sm">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        <div className="flex justify-center items-center space-x-6">
          <button className="text-white text-2xl"><FaStepBackward /></button>
          <button onClick={togglePlayPause} className="bg-nsdr-accent text-nsdr-dark p-4 rounded-full text-3xl">
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button className="text-white text-2xl"><FaStepForward /></button>
        </div>
      </div>
    </motion.div>
  );
};

export default NowPlayingView;