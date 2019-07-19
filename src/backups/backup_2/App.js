import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Input, List, Image, Button, Icon } from 'semantic-ui-react';
import './App.css';


// Action Creators
const request = () => {
  return { type: 'REQUESTED' }
};

const requestSuccess = (data) => { console.log(data);
  return { type: 'REQUESTED_SUCCEEDED', url: data[1].phone, users:data }
};

const requestError = () => {
  return { type: 'REQUESTED_FAILED' }
};



const fetchList = () => {
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


// Component
class App extends Component {

    state = {
    searchString:"",
    isOpened:false,

   };


componentDidMount(){
  this.props.dispatch(fetchList())
}

handlerChange = event =>
{this.setState({searchString:event.target.value})}



  render () {

var list = this.props.users;
//const List = () => this.props.dispatch(fetchList());

var searchString = this.state.searchString.trim().toLowerCase();

if(searchString.length > 0){
list= list.filter(function(l){
               return l.name.toLowerCase().match( searchString );
           });

       }


    return (
      <div className="App">
           <div>
           <Input focus placeholder='Search...' onChange={this.handlerChange}/>
            <Button positive><Icon name='edit' /></Button>
  {/*
        <button onClick={() => this.props.dispatch(fetchList())}>Show Photo</button>

               {this.List}  */}



          {this.props.loading
            ? <p>Loading...</p>
            : this.props.error
                ? <p>Error, try again</p>
                : <div>

    <List> { list.map((l,i)=>{ return <List.Item key={i}><Image
    avatar style={{width:50, height:50, borderRadius:25}} src={l.photo}/>
     <List.Content>{l.phone}<br/><b>{l.name}{' '}<span style={{color:'red'}}>{l.company}</span></b>
     <List.Header as='a'>{l.email}</List.Header>
     </List.Content></List.Item> }) }
    </List>

                  </div>

              }
              </div>

      </div>
    )
  }
}


export default connect((state) => {
  console.log(state);
  return state;
})(App);
