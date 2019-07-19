import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Input, List, Grid, Image, Button, Icon} from 'semantic-ui-react';
import {fetchList} from '../actions';
import ReactDOM from 'react-dom';
import {FormErrors} from './FormErrors';
import { Col, Form, FormGroup, FormControl,
   Clearfix, Tab, Row, Nav, NavItem } from 'react-bootstrap';




class AddUser extends Component {
  constructor(){
    super();
  this.state = {
      phone:'',
      name:'',
      company:'',
      email:'',
      photo:'',
    visible:false,

    formErrors: {email: '', phone: '', name:'', company:'', photo:''},
    phoneValid: false,
    nameValid: false,
    emailValid: false,
    companyValid: false,
    emailValid: false,
    photoValid: false,
    formValid: false
   }

   this.sendData=this.sendData.bind(this);
   this.handleUserInput=this.handleUserInput.bind(this);
  }


handleUserInput (e) {
  const name = e.target.name;
  const value = e.target.value;
  this.setState({[name]: value},
                () => { this.validateField(name, value) });
}


validateField(fieldName, value) {
  let fieldValidationErrors = this.state.formErrors;
  let emailValid = this.state.emailValid;
  let nameValid = this.state.nameValid;
  let photoValid = this.state.photoValid;
switch(fieldName) {
    case 'email':
      emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      fieldValidationErrors.email = emailValid ? '' : ' is invalid';
      break;
    case 'phone':
        emailValid = value.match(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/);
        fieldValidationErrors.phone = emailValid ? '' : ' is invalid';
        break;
    case 'name':
      nameValid = value.length >= 3;
      fieldValidationErrors.name = nameValid ? '': ' is too short';
      break;

    case 'photo':
      photoValid = value.match((/^(ftp|http|https):\/\/[^ "]+$/)||'');
      fieldValidationErrors.photo = photoValid ? '' : ' is invalid';

    default:
     //this.setState({photo:'https://ava.eu.com/wp-content/uploads/2015/11/PH-default-avatar1.jpg'})
      break;
  }
  this.setState({formErrors: fieldValidationErrors,
                  emailValid: emailValid,
                  nameValid: nameValid,
                  photoValid: photoValid
                }, this.validateForm);
}
validateForm() {
  this.setState({formValid: this.state.emailValid &&
                            this.state.nameValid});
}





  sendData() {
    //  e.preventDefault();
    let photoUrl = this.state.photo=='' ?
      'https://ava.eu.com/wp-content/uploads/2015/11/PH-default-avatar1.jpg' :
       this.state.photo;

    let userData = {
      phone: this.state.phone,
      name: this.state.name,
      company: this.state.company,
      email: this.state.email,
      photo: photoUrl
    };

      fetch('/artists',{
          mode: 'same-origin',
          method: "POST",
          body: JSON.stringify(userData),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        }).then(data =>{
            console.log("Successful" + data);
            this.props.dispatch(fetchList());
            this.setState({
              phone:'',
              name:'',
              company:'',
              email:'',
              photo:'',
              visible:false,
              formErrors: {email: '', phone: '', name:'', company:'', photo:''},
              formValid: false
          });
      })
    }

toggle=()=>{
  this.setState({visible:!this.state.visible})
}



render(){


  let addInput;
  let addToListButton = <Button style={{marginTop:5,marginLeft:-50}} positive onClick={this.toggle}>
   <Icon name='plus' />Add To List</Button>;
  if (this.state.visible){
    addInput = <Grid>
    <div style={{color:'red'}} className='panel panel-default'>
      <FormErrors formErrors={this.state.formErrors} />
        </div>
    <Grid.Row>
    <Grid.Column width={5}>

<Input onChange={this.handleUserInput} name='phone' placeholder='Phone' value={this.state.phone}/><br/>
<Input onChange={this.handleUserInput} name='name' placeholder='Name/Surname' value={this.state.name}/><br/>
<Input onChange={this.handleUserInput} name='company' placeholder='Company' value={this.state.company}/><br/>
<Input onChange={this.handleUserInput} name='email' placeholder='Email' value={this.state.email}/><br/>
<Input onChange={this.handleUserInput} name='photo' placeholder='URL for Photo' value={this.state.photo}/>


    </Grid.Column>
    </Grid.Row>
    <Grid.Row>
    <Grid.Column width={4}>
    </Grid.Column>
    <Grid.Column width={8}>
    <Button positive onClick={this.sendData} disabled={!this.state.formValid}>
    <Icon name='plus' />Add</Button>
    </Grid.Column>

    </Grid.Row>
    </Grid>;

    addToListButton =
    <Icon style={{marginLeft:-50, cursor:'pointer'}} name = 'window close outline big' onClick={this.toggle} />;
  };

return(
<div>
{addToListButton}

<br/><br/>
    {addInput}
</div>
   );
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(AddUser);
