import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Input, List, Grid, Image, Button, Icon} from 'semantic-ui-react';
import {requestSuccess,request,requestError,fetchList} from './actions';

class InputChange extends Component {

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

 this.editData=this.editData.bind(this);
 this.deleteData=this.deleteData.bind(this);
}


componentWillMount() {
  this.setState({
  phone:this.props.phone,
  name:this.props.name,
  company:this.props.company,
  email:this.props.email,
  photo:this.props.photo
 })
}


changeInput = () => this.setState({isOpened:!this.state.isOpened});
changeName = (e) => this.setState({name:e.target.value});
changePhone = (e) => this.setState({phone:e.target.value});
changeCompany = (e) => this.setState({company:e.target.value});
changeEmail = (e) => this.setState({email:e.target.value});
changePhoto = (e) => this.setState({photo:e.target.value});



  editData() {
    //  e.preventDefault();
    let artistsData = {
      phone: this.state.phone,
      name: this.state.name,
      company: this.state.company,
      email: this.state.email,
      photo: this.state.photo
    };


      fetch('/artists/'+this.props.id,{
          mode: 'same-origin',
          method: "PUT",
          body: JSON.stringify(artistsData),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        }).then(data =>{
            console.log("Successful" + data);
            console.log(this.props.id);
            this.props.dispatch(fetchList());

      })
//this.props.dispatch({type:'EDIT',payload:artistsData});
      /*this.store.subscribe(() => {
      console.log('subscribe', store.getState());
    });*/

 /*
    var a = this.props.testStore.users;
    var b;
    b = a.filter((l)=>l.name.match(this.props.name))
    console.log(b);

    this.props.dispatch({type:'EDIT',payload:artistsData})
  */
    //this.setState({phone:55})
}


    deleteData() {
        fetch('/artists/'+this.props.id,{
            mode: 'same-origin',
            method: "DELETE",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          }).then(data=>{
              console.log("Successful");
              this.props.dispatch(fetchList());
            })
      }




render(){
return(

<div>
<Button style={{marginLeft:300}} onClick={this.deleteData}><Icon name='delete' />Delete</Button>

  <Grid>


<Grid.Row>
<Grid.Column width={5}>
<Input onChange={this.changePhone} placeholder={this.props.phone} value={this.state.phone}/><br/>
<Input onChange={this.changeName} placeholder={this.props.name} value={this.state.name}/><br/>
<Input onChange={this.changeCompany} placeholder={this.props.company} value={this.state.company}/><br/>
<Input onChange={this.changeEmail} placeholder={this.props.email} value={this.state.email}/><br/>
<Input onChange={this.changePhoto} placeholder={this.props.photo} value={this.state.photo}/>
</Grid.Column>
</Grid.Row>
<Grid.Row>
<Grid.Column width={6}>
</Grid.Column>
<Grid.Column width={4}>
<Button positive onClick={this.editData}><Icon name='edit' />Edit</Button><br/>
</Grid.Column>
</Grid.Row>


 </Grid>
</div>

  );
 }
}

const mapStateToProps = state => ({
  testStore: state
})

export default connect(mapStateToProps)(InputChange);
