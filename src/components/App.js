import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Input, List, Grid, Image, Button, Icon } from 'semantic-ui-react';
import Details from './details';
import {requestSuccess,request,requestError,fetchList} from '../actions';
import '../css/App.css';
import AddUser from './add-user';


// Component
class App extends Component {
constructor(){
  super();

    this.state = {
    searchString:"",
   };
}

componentDidMount(){
  this.props.dispatch(fetchList());
}

handlerChange = event =>
{this.setState({searchString:event.target.value})}



  render () {

let profile;
if (this.props.activPersone===undefined){
profile = {};
}else{ profile = this.props.activPersone; }
/* */

let list = this.props.users;

var searchString = this.state.searchString.trim().toLowerCase();

if(searchString.length > 0){
list= list.filter(function(l){
               return l.name.toLowerCase().match( searchString );
           });

       }


    return (
      <div className="App">

      <Grid columns={3}>
           <Grid.Row>
<Grid.Column width={4}>

           <div>
           <Input focus placeholder='Search...' onChange={this.handlerChange}/>
            {' '}<Icon name='search plus' />



          {this.props.loading
            ? <p>Loading...</p>
            : this.props.error
                ? <p>Error, try again</p>
                : <div>

    <List style={{cursor: 'pointer'}} >
    { list.map((l,i)=>{ return <List.Item onClick={()=>{
       this.setState({activePerson:l});  this.props.dispatch({type:'ACTIVE',payload:l});
       this.props.dispatch({type:'OPEN', payload:false}); {/**/} } }
       key={i}><Image avatar style={{width:50, height:50, borderRadius:25}} src={l.photo}/>
     <List.Content>{l.phone}<br/><b>{l.name}{' '}<br/><span style={{color:'red'}}>{l.company}</span></b>
     <List.Header as='a'>{l.email}</List.Header>
     </List.Content></List.Item> }) }
    </List>

                  </div>

              }
              </div>
  </Grid.Column>

              <Grid.Column width={4}>
              <AddUser/>
                </Grid.Column>



    <Grid.Column width={8}>

<Details name={profile.name} phone={profile.phone} id={profile._id}
isOpened={this.state.isOpened} photo={profile.photo} company={profile.company} email={profile.email}/>



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
