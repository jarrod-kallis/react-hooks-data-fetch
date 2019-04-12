import { useEffect, useReducer } from 'react';
import axios from 'axios';

import apiReducer from './apiReducer';

function useApi(initalQuery) {
  // const [data, setData] = useState({ hits: [] });
  // const [query, setQuery] = useState(initalQuery);
  // const [isLoading, setLoading] = useState(false);
  // const [isError, setError] = useState(false);

  const [state, setState] = useReducer(apiReducer, {
    data: { hits: [] },
    query: initalQuery,
    isLoading: false,
    isError: false
  });

  useEffect(() => {
    const fetchData = async () => {
      setState({ type: 'LOADING' });
      // setError(false);
      // setLoading(true);

      try {
        const result = await axios(
          `http://hn.algolia.com/api/v1/search?query=${state.query}`
        );
        // setData(result.data);
        setState({ type: 'SET_DATA', data: result.data });
      } catch (e) {
        // setError(true);
        setState({ type: 'ERROR' });
      }

      // setLoading(false);
      return () => {
        console.log('unmounting');
      };
    };

    fetchData();
  }, [state.query]);

  const updateQuery = query => {
    // setQuery(query);
    setState({ type: 'UPDATE_QUERY', query });
  };

  return { updateQuery, ...state };
}

export default useApi;
