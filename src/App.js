import React, { Fragment } from 'react';
import { debounce } from 'lodash';

import './App.css';

import useApi from './useApi';

function App() {
  // const [data, setData] = useState({ hits: [] });
  // const [query, setQuery] = useState('');
  // const [isLoading, setLoading] = useState(false);
  // const [isError, setError] = useState(false);

  const initialQuery = 'redux';

  const { data, updateQuery, isLoading, isError } = useApi(initialQuery);

  const debouncedInputChange = debounce(arg => {
    // console.log(arg);
    updateQuery(arg);
  }, 1000);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setError(false);
  //     setLoading(true);

  //     try {
  //       const result = await axios(
  //         `http://hn.algolia.com/api/v1/search?query=${query}`
  //       );
  //       setData(result.data);
  //     } catch (e) {
  //       setError(true);
  //     }

  //     setLoading(false);
  //   };

  //   fetchData();
  // }, [query]);

  function onInputChange(e) {
    debouncedInputChange(e.target.value);
  }

  return (
    <Fragment>
      <input type="text" onChange={onInputChange} defaultValue={initialQuery} />

      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data.hits
            .filter(item => item.url)
            .map(item => {
              // console.log(data.hits);
              return (
                <li key={item.objectID}>
                  <a href={item.url}>{item.title}</a>
                </li>
              );
            })}
        </ul>
      )}
    </Fragment>
  );
}

export default App;
