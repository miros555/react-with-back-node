// Reducer
const initialState = {
  users:[],
  loading: false,
  error: false,
  test:5,
  activePersone:{},
  isOpened:false
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUESTED':
      return {
        loading: true,
        error: false,
      };
    case 'REQUESTED_SUCCEEDED':
      return {
        users:action.payload,
        loading: false,
        error: false,
        isOpened:false
      };
    case 'REQUESTED_FAILED':
      return {
        loading: false,
        error: true,
      };
    /*case 'EDIT':
       return {
         users:[...state.users],
         phone: action.payload.phone,
         name: action.payload.name,
         company: action.payload.company,
         email: action.payload.email,
         photo: action.payload.photo
       };
    case 'ACTIVE':
          return {
            users: [...state.users],
            activePersone:action.payload
          };
    case 'OPEN':
       return {
         isOpened: action.payload
       }*/
    default:
      return state;
  }
};

export default reducer;
