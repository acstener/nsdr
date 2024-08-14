import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTracksByCategory } from '../utils/supabaseUtils';
import { useAudio } from '../context/AudioContext';

function Category() {
  const { categoryId } = useParams();
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { playTrack, currentTrack, isPlaying, togglePlayPause } = useAudio();

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const data = await getTracksByCategory(categoryId);
        setTracks(data);
      } catch (error) {
        console.error('Error fetching tracks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, [categoryId]);

  const handlePlayPause = (track) => {
    if (currentTrack && currentTrack.id === track.id) {
      togglePlayPause();
    } else {
      playTrack(track);
    }
  };

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-white capitalize">{categoryId} Tracks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tracks.map((track) => (
          <div key={track.id} className="bg-nsdr-light bg-opacity-10 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2 text-white">{track.title}</h2>
            <p className="text-sm mb-4 text-white opacity-60">Duration: {track.duration}</p>
            <button
              onClick={() => handlePlayPause(track)}
              className="bg-nsdr-accent text-nsdr-dark px-4 py-2 rounded-full mr-2"
            >
              {currentTrack && currentTrack.id === track.id && isPlaying ? 'Pause' : 'Play'}
            </button>
            <Link to={`/track/${track.id}`} className="text-nsdr-accent hover:underline">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;