import { supabase } from '../supabaseClient';

// Existing functions
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

// New functions for user profiles
export const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
};

export const updateUserProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('id', userId);

  if (error) throw error;
  return data;
};

export const checkSubscriptionStatus = async (userId) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('subscribed, onboarded')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
};

// Add more functions as needed for CRUD operations