import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTrackById } from '../utils/supabaseUtils';
import { useAudio } from '../context/AudioContext';

function TrackDetail() {
  const { trackId } = useParams();
  const [track, setTrack] = useState(null);
  const [loading, setLoading] = useState(true);
  const { playTrack, currentTrack, isPlaying, isLoading } = useAudio();

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

  if (loading) return <div className="text-center text-white">Loading track details...</div>;
  if (!track) return <div className="text-center text-white">Track not found</div>;

  const isCurrentTrack = currentTrack && currentTrack.id === track.id;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-white">{track.title}</h1>
      <p className="text-lg mb-4 text-white opacity-80">{track.description}</p>
      <div className="mb-6 text-white opacity-60">
        <p>Duration: {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}</p>
        <p>Category: {track.category}</p>
      </div>
      <button
        onClick={() => playTrack(track)}
        disabled={isLoading}
        className={`bg-nsdr-accent text-nsdr-dark px-6 py-3 rounded-full font-semibold hover:bg-opacity-80 transition-all ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? 'Loading...' : isCurrentTrack && isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
}

export default TrackDetail;