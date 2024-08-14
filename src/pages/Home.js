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
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8 text-white">Features For Relaxation and Focus</h1>
      
      {/* Main categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.id}`}
            className="bg-gradient-to-br from-nsdr-dark to-nsdr-light bg-opacity-10 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-nsdr-accent opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div className="relative z-10">
              {category.image_url && (
                <img src={category.image_url} alt={category.name} className="w-16 h-16 mb-4 rounded-full" />
              )}
              <h2 className="text-2xl font-bold text-white mb-2">{category.name}</h2>
              <p className="text-white text-opacity-80">{category.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;