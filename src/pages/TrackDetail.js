import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAudio } from '../context/AudioContext';
import { getTrackById } from '../utils/supabaseUtils';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';

function TrackDetail() {
  const { trackId } = useParams();
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);
  const { playTrack, togglePlayPause, currentTrack, isPlaying, progress, duration, seek } = useAudio();

  useEffect(() => {
    const fetchTrackDetails = async () => {
      try {
        const trackData = await getTrackById(trackId);
        setTrack(trackData);
      } catch (error) {
        console.error('Error fetching track details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrackDetails();
  }, [trackId]);

  useEffect(() => {
    // Hide the persistent player when this component mounts
    document.body.classList.add('hide-persistent-player');
    // Show it again when the component unmounts
    return () => document.body.classList.remove('hide-persistent-player');
  }, []);

  if (loading) return <div className="text-center text-white">Loading track details...</div>;
  if (!track) return <div className="text-center text-white">Track not found</div>;

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (currentTrack?.id !== track.id) {
      playTrack(track);
    } else {
      togglePlayPause();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-nsdr-dark to-gray-900 p-4 animate-gradient">
      <img src={track.image_url || '/default-album-art.jpg'} alt={track.title} className="w-64 h-64 rounded-lg shadow-lg mb-6" />
      <h2 className="text-white text-2xl font-bold mb-2">{track.title}</h2>
      <p className="text-gray-400 mb-6">{track.artist}</p>
      <div className="w-full max-w-md mb-4">
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
        <button onClick={handlePlayPause} className="bg-nsdr-accent text-nsdr-dark p-4 rounded-full text-3xl">
          {isPlaying && currentTrack?.id === track.id ? <FaPause /> : <FaPlay />}
        </button>
        <button className="text-white text-2xl"><FaStepForward /></button>
      </div>
    </div>
  );
}

export default TrackDetail;