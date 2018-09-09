import React from 'react'
import { connect } from 'react-redux'
import OrganizationForm from './OrganizationForm'
import { updateOrganization } from '../actions/organizations'
import { clearUpdatedOrganization } from '../actions/adminControl'


class EditOrganizationPage extends React.Component {

	componentWillMount () {
		if (this.props.user.accessLevel !== 'admin') {
			this.props.history.push('/')
		} 
	}

	render() {
		let props = this.props
		return (
			<div>
				<p>Edit organization page: {props.match.params.id}</p>
				<OrganizationForm
					organization={props.organization}
					onSubmit={(organization) => {
			  			this.props.dispatch(updateOrganization(
			  				{...organization}
			  			))
			  			this.props.dispatch(clearUpdatedOrganization())
			  			this.props.history.push('/admin')
					}}
				/>
			</div>
		)
	}
}

const mapStateToProps = (state, props) => {
	return {
		user: state.userControl.user,
		organization: state.adminControl.updatingOrganization
	}
}


export default connect(mapStateToProps)(EditOrganizationPage)