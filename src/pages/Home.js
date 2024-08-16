import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../utils/supabaseUtils';

function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData.slice(0, 3)); // Limit to 3 categories
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-site-bg text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-site-bg text-white">
      {/* Navigation */}

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold mb-24 text-center">nsdr.co bosh</h1>
        
        <div className="grid grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="flex flex-col items-center"
            >
              <div className="w-48 h-48 mb-4 overflow-hidden rounded-lg">
                <img 
                  src={category.image_url || '/placeholder-image.jpg'} 
                  alt={category.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold mb-1">{category.name}</h2>
              <p className="text-sm text-gray-400">{category.description || 'Short desc'}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;