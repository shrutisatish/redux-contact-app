import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as contactAction from './../actions/contactAction';
import ListLayout from './ListLayout';
import GridLayout from './GridLayout';

import { MDBIcon } from 'mdbreact';

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

class Main extends Component {

  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.onSelectViewType = this.onSelectViewType.bind(this);
    this.state = {
      name: '',
      phone:'',
      email:'',
      address:'',
      showForm: false,
      viewType: 'grid'
    }
  }

  getFormattedPhoneNum( input ) {
    let output = "(";
    input.replace( /^\D*(\d{0,3})\D*(\d{0,3})\D*(\d{0,4})/, function( match, g1, g2, g3 )
        {
          if ( g1.length ) {
            output += g1;
            if ( g1.length === 3 ) {
                output += ")";
                if ( g2.length ) {
                    output += " " + g2; 
                    if ( g2.length === 3 ) {
                        output += " - ";
                        if ( g3.length ) {
                            output += g3;
                        }
                    }
                }
             }
          }
        }       
      );        
    return output;
   }       

  handleChange(e){
    e.preventDefault();
    if(e.target.name === "phone"){
      let formattedPhoneNum = this.getFormattedPhoneNum(e.target.value)
      this.setState({
        phone: formattedPhoneNum
      })
    }else{
      this.setState({
        [e.target.name]: e.target.value
      })
    }
    
  }

  handleAddClick() {
    this.setState({
      showForm: ! this.state.showForm
    })

  }

  handleSubmit(e){
      e.preventDefault();
      if(this.nameInput.value === "" || this.emailInput.value === "" || this.addressInput.value === "") return
      let contact = {
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email,
        address: this.state.address
      }
      this.props.createContact(contact);
      this.nameInput.value = "";
      this.emailInput.value = "";
      this.addressInput.value = "";
  }

  view(data, index){
    return (
      <div className={`contact--${this.state.viewType}`}>
      {(this.state.viewType === 'list') ? 
          (<ListLayout key={data.name+index} data={data} index={index}/>) 
          : 
          (<GridLayout key={data.name+index} data={data} index={index}/>)}
      </div>
    )
  }

  onSelectViewType(e) {
    console.log(e.target.name)
    this.setState({
      viewType: e.target.name
    })
  }

  render() {
    return(
      <div className='main'>
          <h1>Contacts Application</h1> 
          { this.state.showForm 
            ? (<MDBIcon icon="minus" onClick={this.handleAddClick} />) 
            : (<MDBIcon icon="plus" onClick={this.handleAddClick} />) 
          }
          {this.state.showForm ? (<h3>Hide Contact Form</h3>) : (<h3>Show Contact Form</h3>)}
        {this.state.showForm && (
         
          <form onSubmit={this.handleSubmit}>
            <div className='form'>
              Name: <input type="text" required ref={(ref) => this.nameInput= ref} onChange={this.handleChange} name="name" />
              Phone:<div className="form__phone"><PhoneInput
                      inputProps={{
                        required: true,
                      }}
                      country={'us'}
                      value={this.state.phone}
                      onChange={phone => this.setState({ phone })}
                    /></div>
              Email: <input type="email" required ref={(ref) => this.emailInput= ref} onChange={this.handleChange} name="email" />
              Address: <input type="text" required ref={(ref) => this.addressInput= ref} onChange={this.handleChange} name="address" />
            <input type="submit" />
            </div>
            <hr/>
          </form>
        
          )}
          {this.state.showForm && (<div>
            <p>Click on a button to choose list view or grid view.</p>
            <button name="list" className="btn" onClick={this.onSelectViewType}><i className="fa fa-bars"></i> List</button> 
            <button name="grid" className="btn" onClick={this.onSelectViewType}><i className="fa fa-th-large"></i> Grid</button>
          </div>
          )}

          <div className={`contact--info--${this.state.viewType}`}>{this.props.contacts.map((contact, i) => this.view(contact, i))}</div>
        
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    contacts: state.contacts
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createContact: contact => dispatch(contactAction.createContact(contact)),
    removeContact: id => dispatch(contactAction.removeContact(id))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
