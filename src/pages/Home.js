import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../utils/supabaseUtils';
import 'tailwindcss/tailwind.css';
import Skeleton from '../components/Skeleton';

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

  return (
    <div className="p-8 mb-8 bg-site-bg min-h-screen max-w-[796px] mx-auto space-y-8">
      <h1 className="text-3xl font-semibold text-white mb-8">Find an NSDR track</h1>
      
      <div className="space-y-7">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.id}`}
            className="flex items-center p-7 bg-gradient-to-r from-[#1E1C20] to-[#1D1C20] rounded-[20px] border-[1.5px] border-solid border-[#2f2e31] transition duration-300 ease-in-out hover:border-[#5e5e60] w-full"
          >
            <img
              src={category.image_url || '/placeholder-image.jpg'}
              alt={category.name}
              className="w-32 h-32 rounded-xl mr-8 object-cover"
            />
            <div className="category-info flex-1">
              <h2 className="font-medium text-2xl text-white mb-1">{category.name}</h2>
              <p className="text-sm text-gray-400">{category.description || 'Short desc'}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;