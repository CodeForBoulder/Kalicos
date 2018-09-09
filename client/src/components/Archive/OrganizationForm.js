import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

let OrganizationForm = (props) => {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <label>Organization</label>
          <Field 
            name="name" 
            component="input" 
            type="text" 
            placeholder="Organization Name"
          />
          <label>Address</label>
          <Field 
            name="address" 
            component="input" 
            type="text"
            placeholder="Organization Address"
          />
          <br/>
          <label>Description</label>
          <Field 
            name="description" 
            component="input" 
            type="text"
            placeholder="Organization Description"
          />
          <label>Category</label>
          <Field 
            name="category" 
            component="select"
          > 
            <option>Select Category</option>
            <option value="nonprofit">Nonprofit</option>
            <option value="educational">Educational</option>
            <option value="landmark">Landmark</option>
            <option value="museum">Museum</option>
          </Field>
          <button type="submit">Submit Organization</button>
      </form>
      <br/>
      <p>***
      Example addresses to add:</p>
      <li>1600 Range St #101, Boulder, CO 80301</li>
      <p>Code Craft</p>
      <li>1777 Broadway, Boulder, CO 80302</li>
      <p>Courthouse
      ***</p>
      <br/>
    </div>
  )
}

OrganizationForm = reduxForm({
  form: 'organizationForm'
})(OrganizationForm)

OrganizationForm = connect(
  ( state, props ) => {
    return {
      initialValues: props.organization
    }
  }
)(OrganizationForm)


export default OrganizationForm