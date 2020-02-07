import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as contactAction from './../actions/contactAction';
import { MDBCard, MDBCardTitle, MDBCloseIcon } from 'mdbreact';

class ContactItem extends Component {

	removeContact(e, index){
	    e.preventDefault();
	    this.props.removeContact(index);
  	}

  	render() {
	    return (
	       <div>
		      <MDBCard style={{ width: "22rem", top:"100px", marginLeft:"40%" }}>
		      	<MDBCardTitle>
		      		Contact Details for :  <MDBCloseIcon className="btn btn-danger" size="5x" onClick={(e) => this.removeContact(e, this.props.index)}/>
		      	</MDBCardTitle>
		        <MDBCardTitle>{this.props.data.name}</MDBCardTitle>
			        <div>
		                <i className="fas fa-envelope">  Email</i>
		            	<div className="text-secondary">{this.props.data.email}</div>
		            </div>
		            <div>
		                <i className="fas fa-mobile-alt">  Phone</i>
		                <div className="text-secondary">{this.props.data.phone}</div>
		            </div>
		            <div>
		                <i className="fas fa-marker-alt">Address</i>
		                <div className="text-secondary">{this.props.data.address}</div>
		            </div>   
		      </MDBCard>
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
    removeContact: id => dispatch(contactAction.removeContact(id))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactItem);
