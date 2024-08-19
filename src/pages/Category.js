import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCategories, getTracksByCategory } from '../utils/supabaseUtils';
import 'tailwindcss/tailwind.css';

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

        console.log('Fetched categories:', categoriesData);
        console.log('Fetched tracks:', tracksData);

        const currentCategory = categoriesData.find(cat => cat.id === categoryId);
        console.log('Current category:', currentCategory);

        setCategory(currentCategory);

        // Log the featured field values
        tracksData.forEach(track => console.log(`Track: ${track.title}, Featured: ${track.featured}`));

        // Sort tracks by 'featured' field, handling null values
        const sortedTracks = tracksData.sort((a, b) => {
          if (a.featured === b.featured) {
            return 0;
          }
          if (a.featured === null) {
            return 1;
          }
          if (b.featured === null) {
            return -1;
          }
          return a.featured ? -1 : 1;
        });

        setTracks(sortedTracks);
      } catch (error) {
        console.error('Error fetching category and tracks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryAndTracks();
  }, [categoryId]);

  if (loading) {
    return null; // Render nothing while loading
  }

  return (
    <div className="p-8 mb-8 bg-site-bg min-h-screen max-w-[796px] mx-auto space-y-8">
      {!category ? (
        <div className="text-center text-white my-4">Category not found</div>
      ) : (
        <>
          <h1 className="text-3xl font-semibold text-white capitalize">{category.name} Tracks</h1>
          <div className="space-y-7">
            {tracks.map((track) => (
              <Link
                key={track.id}
                to={`/track/${track.id}`}
                className="flex items-center p-7 bg-gradient-to-r from-[#1E1C20] to-[#1D1C20] rounded-[20px] border-[1.5px] border-solid border-[#2f2e31] transition duration-300 ease-in-out hover:border-[#5e5e60] w-full"
              >
                <img
                  src={track.image_url || 'https://nsdr.b-cdn.net/replicate-prediction-e42jnrh92nrg80chan99dz03a4.jpg'}
                  alt={track.title}
                  className="w-32 h-32 rounded-xl mr-8 object-cover"
                />
                <div className="track-info flex-1 max-w-[796px]">
                  <h2 className="track-h font-medium text-2xl text-white mb-1">{track.title}</h2>
                  <div className="toggle-div-flex">
                    <span className="featured-free">{track.category}</span>
                  </div>
                  <p className="paragraph-11 time-no">
                    NSDR - {track.recorder ? track.recorder.name : 'Unknown'}
                  </p> {/* Display recorder's name */}
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Category;