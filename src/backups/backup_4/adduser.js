import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Input, List, Grid, Image, Button, Icon} from 'semantic-ui-react';
import {fetchList} from './actions';


class AddUser extends Component {
  constructor(){
    super();
  this.state = {
      phone:'',
      name:'',
      company:'',
      email:'',
      photo:'',
    isOpened:false
   }

   this.sendData=this.sendData.bind(this);
  }

  changeName = (e) => this.setState({name:e.target.value});
  changePhone = (e) => this.setState({phone:e.target.value});
  changeCompany = (e) => this.setState({company:e.target.value});
  changeEmail = (e) => this.setState({email:e.target.value});
  changePhoto = (e) => this.setState({photo:e.target.value});

  sendData() {
    //  e.preventDefault();
    let userData = {
      phone: this.state.phone,
      name: this.state.name,
      company: this.state.company,
      email: this.state.email,
      photo: this.state.photo
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
              isOpened:false
          });
      })
    }

toggle=()=>{
  this.setState({isOpened:!this.state.isOpened})
}

render(){
  let addInput;
  if (this.state.isOpened){
    addInput= <Grid>
    <Grid.Row>
    <Grid.Column width={5}>
    <Input onChange={this.changePhone} placeholder='Phone' value={this.state.phone}/><br/>
    <Input onChange={this.changeName} placeholder='Name/Surname' value={this.state.name}/><br/>
    <Input onChange={this.changeCompany} placeholder='Company' value={this.state.company}/><br/>
    <Input onChange={this.changeEmail} placeholder='Email' value={this.state.email}/><br/>
    <Input onChange={this.changePhoto} placeholder='Photo' value={this.state.photo}/>
    </Grid.Column>
    </Grid.Row>
    <Grid.Row>
    <Grid.Column width={4}>

    </Grid.Column>
    <Grid.Column width={8}>
    <Button positive onClick={this.sendData}><Icon name='plus' />Add</Button>
    </Grid.Column>
    </Grid.Row>
    </Grid>
  }
return(
<div>
<Button style={{marginTop:5,marginLeft:-50}} positive onClick={this.toggle}><Icon name='plus' />Add To List</Button>
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
