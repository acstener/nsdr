import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAudio } from '../context/AudioContext';
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp, FaExpand } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const PersistentPlayer = () => {
  const navigate = useNavigate();
  const { currentTrack, isPlaying, togglePlayPause, progress, duration, volume, seek, updateVolume } = useAudio();
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);

  if (!currentTrack) return null;

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleNowPlayingClick = () => {
    navigate(`/track/${currentTrack.id}`);
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="persistent-player fixed bottom-0 left-0 right-0 bg-gray-900 p-4 shadow-lg"
    >
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src={currentTrack.image_url || '/default-album-art.jpg'} alt={currentTrack.title} className="w-12 h-12 rounded-md" />
          <div>
            <h3 className="text-white font-semibold">{currentTrack.title}</h3>
            <p className="text-gray-400 text-sm">{currentTrack.artist}</p>
          </div>
        </div>
        <div className="flex-grow mx-4">
          <div className="flex items-center space-x-4">
            <span className="text-gray-400 text-sm">{formatTime(progress)}</span>
            <div className="flex-grow">
              <input
                type="range"
                min="0"
                max={duration}
                value={progress}
                onChange={(e) => seek(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
            <span className="text-gray-400 text-sm">{formatTime(duration)}</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={togglePlayPause}
            className="bg-nsdr-accent text-nsdr-dark p-2 rounded-full"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </motion.button>
          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsVolumeVisible(!isVolumeVisible)}
              className="text-white p-2"
            >
              {volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
            </motion.button>
            <AnimatePresence>
              {isVolumeVisible && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 p-2 rounded-md"
                >
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => updateVolume(parseFloat(e.target.value))}
                    className="w-24"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleNowPlayingClick}
            className="text-white p-2"
          >
            <FaExpand />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default PersistentPlayer;