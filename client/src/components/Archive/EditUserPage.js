import React from 'react'
import { connect } from 'react-redux'
import EditUserForm from './EditUserForm'
import { updateUser, clearUpdatedUser } from '../actions/adminControl'


class EditOrganizationPage extends React.Component {

	componentWillMount () {
		if (this.props.user.accessLevel !== 'admin') {
			this.props.history.push('/')
		} 
	}

	handleSubmit = (user) => {
		this.props.dispatch(updateUser(user))
		this.props.dispatch(clearUpdatedUser())
		this.props.history.push('/admin')		
	}

	render() {
		let props = this.props
		return (
			<div>
				<p>Edit organization page: {props.match.params.id}</p>
					<EditUserForm
						updatingUser={props.updatingUser}
						onSubmit={this.handleSubmit}
					/>
			</div>
		)
	}
}

const mapStateToProps = (state, props) => {
	return {
		user: state.userControl.user,
		updatingUser: state.adminControl.updatingUser
	}
}


export default connect(mapStateToProps)(EditOrganizationPage)