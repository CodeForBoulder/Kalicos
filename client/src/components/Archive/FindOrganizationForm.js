import React from 'react'
import { Field, reduxForm } from 'redux-form'

let FindOrganizationForm = (props) => {
	return (
		<div>
			<form onSubmit={props.handleSubmit}>
				<label>Name</label>
				<Field 
					name="name"
					component="input"
					type="text"
				/>
         		 <button type="submit">Find Organization</button>
			</form>
		</div>
	)
}

FindOrganizationForm = reduxForm({
  form: 'findOrganizationForm'
})(FindOrganizationForm)

export default FindOrganizationForm