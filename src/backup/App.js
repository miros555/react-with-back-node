import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './App.css';


// Action Creators
const request = () => {
  return { type: 'REQUESTED' }
};

const requestSuccess = (data) => {
  return { type: 'REQUESTED_SUCCEEDED', url: data.message }
};

const requestError = () => {
  return { type: 'REQUESTED_FAILED' }
};

const fetchList = () => {
  return (dispatch) => {
    dispatch(request());
    fetch('https://dog.ceo/api/breeds/image/random')
      .then(res => res.json())
      .then(
        data => dispatch(requestSuccess(data)),
        err => dispatch(requestError())
      );
  }
};

// Component
class App extends Component {
  render () {
    return (
      <div>
        <button onClick={() => this.props.dispatch(fetchList())}>Show Dog</button>
          {this.props.loading
            ? <p>Loading...</p>
            : this.props.error
                ? <p>Error, try again</p>
                : <p><img src={this.props.url}/></p>}
      </div>
    )
  }
}


export default connect((state) => {
  console.log(state);
  return state;
})(App);
