import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const cache = {};

const useQuery = (endpoint, {
  method = 'GET',
  body = null,
  headers = {},
  cacheKey = null,
  params = {},
} = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    const cacheKeyToUse = cacheKey || `${endpoint}?${JSON.stringify(params)}`;

    if (cache[cacheKeyToUse]) {
      setData(cache[cacheKeyToUse]);
      setLoading(false);
      return;
    }

    try {
      const config = {
        method,
        url: endpoint,
        headers,
        data: body,
        params,
      };

      const source = axios.CancelToken.source();
      const response = await axios(config, { cancelToken: source.token });

      setData(response.data);

      if (cacheKeyToUse) {
        cache[cacheKeyToUse] = response.data;
      }
    } catch (err) {
      if (!axios.isCancel(err)) {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, [endpoint, method, body, headers, cacheKey, params]);

  useEffect(() => {
    fetchData();
    return () => {
      // Clean up function to cancel the request if the component unmounts
      axios.CancelToken.source().cancel();
    };
  }, [fetchData]);

  return { data, error, loading, refetch: fetchData };
};

export default useQuery;
