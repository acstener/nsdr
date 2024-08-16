import { supabase } from '../supabaseClient';

export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, description, image_url')
    .order('name');
  
  if (error) throw error;
  return data;
};

export const getTracksByCategory = async (categoryId) => {
  const { data, error } = await supabase
    .from('tracks')
    .select('*')
    .eq('category_id', categoryId)
    .order('title');
  
  if (error) throw error;
  return data;
};

export const getTrackById = async (trackId) => {
  const { data, error } = await supabase
    .from('tracks')
    .select('*, categories(*)')
    .eq('id', trackId)
    .single();
  
  if (error) throw error;
  return data;
};

// Add more functions as needed for CRUD operations