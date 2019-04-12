export default (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, isLoading: true, isError: false };
    case 'SET_DATA':
      return { ...state, isLoading: false, isError: false, data: action.data };
    case 'ERROR':
      return { ...state, isError: true, isLoading: false };
    case 'UPDATE_QUERY':
      return { ...state, query: action.query };
    default:
      return state;
  }
};
