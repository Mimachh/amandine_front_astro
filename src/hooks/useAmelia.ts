import { useEffect, useState } from 'react';
import axios from 'axios';
import { headers } from '@/helper/AmeliaCall';

export const useFetch = (endpoint: string) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  
  useEffect(() => {
    if(!endpoint) return;

    setLoading(true);
    const response = axios.get(`${import.meta.env.PUBLIC_AMELIA_URL}${endpoint}`, {
      headers: headers,
    })
      .then(response => setData(response.data))
      .catch(error => setError(error.response.data))
      .finally(() => setLoading(false));
  }, [endpoint]);

  return { data, loading, error };
};