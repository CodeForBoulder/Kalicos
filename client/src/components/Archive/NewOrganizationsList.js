import React from 'react'
import { connect } from 'react-redux'
import { acceptNewOrganization, rejectNewOrganization } from '../actions/newOrganizations'


const NewOrganizationsList = (props) => (
	<div>
		<p>test</p>
			<p>{props.name} {props.description} {props.address} <button onClick={() => props.dispatch(acceptNewOrganization(props.organization))}>Accept</button> <button onClick={() => props.dispatch(rejectNewOrganization(props._id))}>Reject</button></p>
	</div>
)


export default connect()(NewOrganizationsList)