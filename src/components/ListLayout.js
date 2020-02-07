import React, { Component } from 'react';
import ContactItem from './ContactItem';


class ListLayout extends Component {
  	render() {
	    return (
	       <div>
		     <ContactItem key={this.props.index} data={this.props.data} index={this.props.index}/>
	      </div>

	    )
  	}
}



export default ListLayout;
