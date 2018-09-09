import React from 'react'
import { Field, reduxForm } from 'redux-form'

let FindUserForm = (props) => {
	return (
		<div>
			<form onSubmit={props.handleSubmit}>
				<label>Email</label>
				<Field 
					name="email"
					component="input"
					type="text"
					placeholder="Enter email"
				/>
         		 <button type="submit">Find User Account</button>
			</form>
		</div>
	)
}

FindUserForm = reduxForm({
  form: 'findUserForm'
})(FindUserForm)

export default FindUserForm