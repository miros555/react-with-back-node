
// Reducer
const initialState = {
  users:[],
  url: '',
  loading: false,
  error: false,
};

const ListReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUESTED':
      return {
        url: '',
        loading: true,
        error: false,
      };
    case 'REQUESTED_SUCCEEDED':
      return {
        users:action.users,
        url: action.url,
        loading: false,
        error: false,
      };
    case 'REQUESTED_FAILED':
      return {
        url: '',
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default ListReducers;
