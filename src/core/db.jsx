import { createContext, useContext } from 'react';
import { supabase } from './supabase';

const DBContext = createContext(null);

const db = {
  add: async (table, data) => {
    const { data: row, error } = await supabase.from(table).insert(data).select().single();
    if (error) throw error;
    return row;
  },

  put: async (table, data) => {
    const { data: row, error } = await supabase.from(table).upsert(data).select().single();
    if (error) throw error;
    return row;
  },

  get: async (table, id) => {
    const { data, error } = await supabase.from(table).select().eq('id', id).maybeSingle();
    if (error) throw error;
    return data;
  },

  getAll: async (table) => {
    const { data, error } = await supabase.from(table).select().order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  delete: async (table, id) => {
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) throw error;
  },

  getByIndex: async (table, column, value) => {
    const { data, error } = await supabase.from(table).select().eq(column, value).order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  uploadPhoto: async (file, plantId) => {
    const ext = file.name.split('.').pop();
    const path = `${plantId}/${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from('plant-photos').upload(path, file);
    if (uploadError) throw uploadError;
    const { data: { publicUrl } } = supabase.storage.from('plant-photos').getPublicUrl(path);
    return publicUrl;
  },

  deletePhoto: async (photoUrl) => {
    const url = new URL(photoUrl);
    const path = url.pathname.split('/plant-photos/')[1];
    if (path) {
      await supabase.storage.from('plant-photos').remove([path]);
    }
  },
};

export function DBProvider({ children }) {
  return <DBContext.Provider value={db}>{children}</DBContext.Provider>;
}

export const useDB = () => useContext(DBContext);
