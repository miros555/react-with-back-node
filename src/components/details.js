import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Input, List, Grid, Image, Button, Icon } from 'semantic-ui-react';
import {requestSuccess,request,requestError,fetchList, edit} from '../actions';
import InputChange from './input-change';
import {createSelector} from 'reselect';

class Details extends Component{
constructor(props){
super(props);
}

changeInput = () => {
console.log(this.props.name);
this.props.dispatch({type:'OPEN', payload:!this.props.isOpened});
}


shouldComponentUpdate(nextProps) {
  return nextProps !== this.props;
}


  render(){

let name, email, phone, company, button;

if (this.props.name === undefined){
name = email = phone = company = button ='';
} else {name = 'Name: ';
email = 'E-mail: ';
phone = 'Phone: ';


button = !this.props.isOpened ? <Button positive onClick = {this.changeInput}>
<Icon name = 'edit' /></Button> :
<Button positive style = {{padding:15}} onClick = {this.changeInput}>
<Icon name = 'delete' />Close editor</Button>;

company = 'Company: '
}

let inputChange;


if (this.props.isOpened){
  inputChange = <InputChange name={this.props.name} phone={this.props.phone} id={this.props.id}
  handler = {this.handler} photo={this.props.photo} company={this.props.company}
  email={this.props.email}/>
}

var firstFace = {
  name: 'Mgdedh',
  phone: '+380638067953',
  company: 'Hello! I glad to see you!',
  photo: 'http://xrest.ru/schemes/00/09/8c/29/%D0%9B%D0%B2%D0%B5%D0%BD%D0%BE%D0%BA-1.jpg'
};
/*
let profile = this.props.activPersone===undefined ?
 {} : this.props.activPersone;
*/


let profile = this.props.name===undefined ?
 firstFace : this.props.detailSelector;


    return(

      console.log(this.props.name),

      <div>
      <Grid className='details'>
      <Grid.Row>
     <Grid.Column width={6}>
     <img style={{borderRadius:20, width:200}} src={profile.photo} />
     </Grid.Column>
     <Grid.Column width={5}>
      <div style={{display:'flex'}}><h3>{name}</h3><h1 style={{color:'green'}}>{profile.name}</h1></div>
      <h4>{phone}{'  '}{profile.phone}</h4><b>{email}{' '}<a>{profile.email}</a></b><br/>
      {company}<h2 style={{color:'red'}}> {profile.company}</h2>
      </Grid.Column>
      <Grid.Column width={3}>
      {button}
      </Grid.Column>
      </Grid.Row>
      </Grid>

      {inputChange}



      </div>
    );
  }
}


const personeSelector = state => state.activPersone;
const editSelector = state => state.isOpened;
const actualSelector = createSelector(personeSelector, data => data);


const mapStateToProps = state => ({
  actualStore : personeSelector(state),
  detailSelector: actualSelector(state),
  isOpened : editSelector(state)
});


/*
const mapStateToProps = state => {
     return state;
}
*/

export default connect(mapStateToProps)(Details);
