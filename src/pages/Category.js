import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTracksByCategory, getCategories } from '../utils/supabaseUtils';
import { useAudio } from '../context/AudioContext';
import './Category.css';


function Category() {
  const { categoryId } = useParams();
  const [tracks, setTracks] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const { playTrack, currentTrack, isPlaying, togglePlayPause } = useAudio();

  useEffect(() => {
    const fetchCategoryAndTracks = async () => {
      try {
        const [categoriesData, tracksData] = await Promise.all([
          getCategories(),
          getTracksByCategory(categoryId)
        ]);
        
        const currentCategory = categoriesData.find(cat => cat.id === categoryId);
        setCategory(currentCategory);
        setTracks(tracksData);
      } catch (error) {
        console.error('Error fetching category and tracks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryAndTracks();
  }, [categoryId]);

  const handlePlayPause = (track) => {
    if (currentTrack && currentTrack.id === track.id) {
      togglePlayPause();
    } else {
      playTrack(track);
    }
  };

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (!category) {
    return <div className="not-found-message">Category not found</div>;
  }

  return (
    <div className="category-container">
      <h1 className="category-title">{category.name} Tracks</h1>
      <div className="tracks-grid">
        {tracks.map((track) => (
          <Link
            key={track.id}
            to={`/track/${track.id}`}
            className="track-item"
          >
            <img
              src={track.image_url || 'https://nsdr.b-cdn.net/replicate-prediction-e42jnrh92nrg80chan99dz03a4.jpg'}
              alt={track.title}
              className="track-image"
            />
            <div className="track-info">
              <div className="track-header">
                <h2 className="track-title">{track.title}</h2>
              </div>
              <p className="track-details">NSDR · {track.duration} mins</p>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                handlePlayPause(track);
              }}
              className="play-pause-button"
            >
              {currentTrack && currentTrack.id === track.id && isPlaying ? 'Pause' : 'Play'}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Category;