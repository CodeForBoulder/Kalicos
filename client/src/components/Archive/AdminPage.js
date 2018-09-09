import React from 'react'
import { connect } from 'react-redux'
import { reset } from 'redux-form'
import selectOrganizations from '../selectors/organizations'
import { createUser, logoutUser } from '../actions/userControl'
import { findUserForUpdate, findOrganizationForUpdate } from '../actions/adminControl'
import { getNewOrganizations } from '../actions/newOrganizations'
import AddOrganizationPage from './AddOrganizationPage'
import SignUpForm from './SignUpForm'
import FindUserForm from './FindUserForm'
import FindOrganizationForm from './FindOrganizationForm'
import NewOrganizationsList from './NewOrganizationsList'


class AdminPage extends React.Component {

	componentWillMount () {
		if (this.props.user.accessLevel !== 'admin') {
			this.props.history.push('/')
		} 
	}

	handleSignUpSubmit = (user) => {
		this.props.dispatch(createUser(user))
		this.props.dispatch(reset('signUpForm'))
	}

	handleFindUserSubmit = (user) => {
		this.props.dispatch(findUserForUpdate(user.email))
		.then(user => this.props.history.push(`/editUser/${this.props.updatingUser._id}`))
		this.props.dispatch(reset('findUserForm'))
	}

	handleFindOrganizationSubmit = (organization) => {
		this.props.dispatch(findOrganizationForUpdate(organization.name))
		.then(org => this.props.history.push(`/edit/${this.props.updatingOrganization._id}`))
		this.props.dispatch(reset('findOrganizationForm'))
	}

	pullNewOrgs = () => {
		this.props.dispatch(getNewOrganizations())
	}

	

	render() {
		return (
			<div>
				<div>
					<p>Welcome {this.props.user.username}!</p>
					<button onClick={() => {
						this.props.dispatch(logoutUser())
						this.props.history.push('/')
					}}>Logout</button>
				</div>

				<div>
					<p>Add a new Organization</p>
					<AddOrganizationPage />
				</div>
				<div>
					<p>Create new user account</p>
					<SignUpForm 
						onSubmit={this.handleSignUpSubmit}
					/>
				</div>
				<br/>
				<p>Find User to update</p>
				<div>
					<FindUserForm 
						onSubmit={this.handleFindUserSubmit}
					/>
				</div>
				<br/>
				<p>Find Organization to update</p>
				<div>
					<FindOrganizationForm 
						onSubmit={this.handleFindOrganizationSubmit}
					/>
				</div>
				<br/>
				<button onClick={this.pullNewOrgs}>show new orgs</button>
				<div>
					{this.props.newOrganizations.map(organization => {
						return <NewOrganizationsList key={organization._id} organization={organization} {...organization} />
					})}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state, props) => {
  return {
  	visibleOrganizations: selectOrganizations(state.organizations, state.filters),
  	newOrganizations: state.newOrganizations,
    user: state.userControl.user,
    updatingUser: state.adminControl.updatingUser,
    updatingOrganization: state.adminControl.updatingOrganization
  }
}

export default connect(mapStateToProps)(AdminPage)