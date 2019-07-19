// Reducer
const initialState = {
  users:[],
  loading: false,
  error: false,
  test:5,
  activPersone:{},
  isOpened:false
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUESTED':
      return {
        ...state,
        loading: true,
        error: false
      };
    case 'REQUESTED_SUCCEEDED':
      return {
        ...state,
        users:action.payload,
        loading: false,
        error: false,
        isOpened:false
        //activPersone: {...state.activPersone}
      };
    case 'REQUESTED_FAILED':
      return {
        loading: false,
        error: true
      };
    case 'EDIT':
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
            activPersone:action.payload
          };
    case 'DELETE':
          return {
             users: [...state.users],
             activPersone:{}
          };
    case 'OPEN':
       return {
         ...state,
         isOpened: action.payload
       }  /* */
    default:
      return state;
  }
};

export default reducer;
