import { useState, useEffect } from 'react';
import axios from 'axios';

export const useStore = () => {
  const [store, setStore] = useState([]);
  const [loading, setLoading] = useState(true);
  // console.log("store from context:", store);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + '/store/all'
        );

        if (response.status === 200) {
          // console.log("Store fetched:", response.data.data);
          setStore(response.data.data);
        } else {
          console.warn('Unexpected response status:', response.status);
          setStore([]);
        }
      } catch (error) {
        console.error('store fetch error:', error);
        setStore([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, []);

  return { store, loading };
};
