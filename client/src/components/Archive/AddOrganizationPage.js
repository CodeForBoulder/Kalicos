import React from 'react'
import { connect } from 'react-redux'
import OrganizationForm from './OrganizationForm'
import { addOrganization } from '../actions/organizations'
import { reset } from 'redux-form'


class AddOrganizationPage extends React.Component {


	handleSubmit = (organization) => {
  			this.props.dispatch(addOrganization({
				...organization
			}))
  		this.props.dispatch(reset('organizationForm'))
	}
	render() {
		return (
	    	<div>
	    		<OrganizationForm 
		    		onSubmit={this.handleSubmit} 
		    	/>
			</div>
		)
	}
}


export default connect()(AddOrganizationPage)