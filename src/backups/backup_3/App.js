import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Input, List, Grid, Image, Button, Icon } from 'semantic-ui-react';
import Details from './details';
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
constructor(){
  super();

    this.state = {

    searchString:"",
    isOpened:false,

   };
}

componentDidMount(){
  this.props.dispatch(fetchList())
}

handlerChange = event =>
{this.setState({searchString:event.target.value})}

detailsShow = () =>{
  alert('Hello');
  this.setState({isOpened:!this.state.isOpened})
}


  render () {
let details;

if (this.state.isOpened){
  details = <Details/>
}


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

      <Grid columns={2} divided>
           <Grid.Row>
              <Grid.Column>

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

    <List style={{cursor: 'pointer'}} onClick={this.detailsShow}>
    { list.map((l,i)=>{ return <List.Item key={i}><Image
    avatar style={{width:50, height:50, borderRadius:25}} src={l.photo}/>
     <List.Content>{l.phone}<br/><b>{l.name}{' '}<span style={{color:'red'}}>{l.company}</span></b>
     <List.Header as='a'>{l.email}</List.Header>
     </List.Content></List.Item> }) }
    </List>

                  </div>

              }
              </div>

              </Grid.Column>

          <Grid.Column>


{details}



</Grid.Column>
</Grid.Row>
</Grid>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return state;
}

export default connect(mapStateToProps)(App);
