import React, {Component} from 'react'
import {connect} from 'react-redux'


class Details extends Component{




  render(){

    return(
      <div>
      <h1>Profile:</h1>
      {this.props.users[1].phone}

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(Details);
