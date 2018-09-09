import React from 'react'
import { Field, reduxForm } from 'redux-form'

let LoginForm = (props) => {
	return (
		<div>
			<form onSubmit={props.handleSubmit}>
				<label>Username</label>
				<Field 
					name="username"
					component="input"
					type="text"
					placeholder="Enter your username"
				/>
				<label>Password</label>
				<Field 
					name="password"
					component="input"
					type="password"
					placeholder="Enter your password"
				/>
         		 <button type="submit">Login</button>
			</form>
		</div>
	)
}

LoginForm = reduxForm({
  form: 'loginForm'
})(LoginForm)

export default LoginForm