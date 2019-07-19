import {requestError} from '../actions/request-error';
import {requestSuccess} from '../actions/request-success';
import {request} from '../actions/request';

export default function() {
  return (dispatch) => {
    dispatch(request());
    fetch('/users')
      .then(res => res.json())
      .then(
        data => dispatch(requestSuccess(data)),
        err => dispatch(requestError())
      );
  }
};
