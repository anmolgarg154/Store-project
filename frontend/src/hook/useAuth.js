import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLogin } from '../action';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        let response = await axios.post(
          import.meta.env.VITE_API_URL + `user/keeplogin`,
          {},
          { withCredentials: true }
        );

        if (response.status === 202) {
          // Do nothing or log if needed
        } else if (response.status === 200) {
          dispatch(setLogin(1));
          // console.log("response.data.user: ",response.data.user)
          setUser(response.data.user);
        } else if (response.status === 401) {
          console.log("Unauthorized:", response.status);
        } else {
          // console.log("Unexpected:", response.status);
          setUser(null);
        }
      } catch (error) {
        console.log('Auth check error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [dispatch]);

  return { user, loading };
};
