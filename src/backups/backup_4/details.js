import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Input, List, Grid, Image, Button, Icon } from 'semantic-ui-react';
import {requestSuccess,request,requestError,fetchList, edit} from './actions';
import InputChange from './inputchange';

class Details extends Component{
constructor(props){
super(props);
this.state={
      phone:'',
      name:'',
      company:'',
      email:'',
      photo:'',
    isOpened:false
   }
   //this.handler=this.handler.bind(this);
}

changeInput = () => {this.setState({isOpened:!this.state.isOpened});
console.log(this.props.name);}



  render(){

let name, email, phone, company, button;

if (this.props.name === undefined){
name = email = phone = company = button ='';
} else {name = 'Name: ';
email = 'E-mail: ';
phone = 'Phone: ';
button = <Button positive onClick={this.changeInput}><Icon name='edit' /></Button>;
company = 'Company: '
}

let inputChange;


if (this.state.isOpened){
  inputChange = <InputChange name={this.props.name} phone={this.props.phone} id={this.props.id}
  handler = {this.handler} photo={this.props.photo} company={this.props.company}
  email={this.props.email}/>

}

    return(
      <div>
      <Grid>
      <Grid.Row>
     <Grid.Column width={5}>
     <img style={{borderRadius:20, width:200}} src={this.props.photo} />
     </Grid.Column>
     <Grid.Column width={8}>
      <div style={{display:'flex'}}><h3>{name}</h3><h1 style={{color:'green'}}>{this.props.name}</h1></div>
      <h4>{phone}{'  '}{this.props.phone}</h4><b>{email}{' '}<a>{this.props.email}</a></b><br/>
      {company}<h2 style={{color:'red'}}> {this.props.company}</h2>
      </Grid.Column>
      <Grid.Column width={2}>
      {button}
      </Grid.Column>
      </Grid.Row>
      </Grid>

      {inputChange}

  {this.props.name}
  {this.props.id}

      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(Details);


/*
const mapStateToProps = state => ({
  store:state
});

export default connect(mapStateToProps)(Details);
*/
