
// Action Creators
export const request = () => {
  return { type: 'REQUESTED' }
};

export const requestSuccess = (data) => {
  return { type: 'REQUESTED_SUCCEEDED', payload:data }
};

export const requestError = () => {
  return { type: 'REQUESTED_FAILED' }
};

/*
const select = (person) => {
    return {  type: 'SELECTED', payload: person }
  };
*/



export const fetchList = () => {
  return (dispatch) => {
    dispatch(request());
    fetch('/artists')
      .then(res => res.json())
      .then(
        data => dispatch(requestSuccess(data)),
        err => dispatch(requestError())
      );
  }
};
