import React from 'react'
import { Field, reduxForm } from 'redux-form'

let SignUpForm = (props) => {
	return (
		<div>
			<form onSubmit={props.handleSubmit}>
				<label>Username</label>
				<Field 
					name="username"
					component="input"
					type="text"
					placeholder="Enter username"
				/>
				<label>Email</label>
				<Field 
					name="email"
					component="input"
					type="text"
					placeholder="Enter email"
				/>
				<label>Password</label>
				<Field 
					name="password"
					component="input"
					type="password"
					placeholder="Enter password"
				/>
				<label>Access Level</label>
				<Field 
					name="accessLevel"
					component="select"
				>
					<option>Select Access Level</option>
					<option value="standard">Standard</option>
		            <option value="admin">Admin</option>
         		 </Field>
         		 <button type="submit">Create User</button>
			</form>
		</div>
	)
}

SignUpForm = reduxForm({
  form: 'signUpForm'
})(SignUpForm)

export default SignUpForm