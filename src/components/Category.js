import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTracksByCategory, getCategories } from '../utils/supabaseUtils';

function Category() {
  const { categoryId } = useParams();
  const [tracks, setTracks] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (!category) {
    return <div className="text-center text-white">Category not found</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8 text-white">{category.name} Tracks</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tracks.map((track) => (
          <Link
            key={track.id}
            to={`/track/${track.id}`}
            className="bg-nsdr-light bg-opacity-5 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col"
          >
            {track.image_url && (
              <img src={track.image_url} alt={track.title} className="w-full h-48 object-cover rounded-lg mb-4" />
            )}
            <h3 className="text-xl font-semibold text-white mb-2">{track.title}</h3>
            <p className="text-sm text-white text-opacity-60 mb-2">{track.description}</p>
            <p className="text-sm text-white text-opacity-60 mt-auto">
              Duration: {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Category;