import React, { Component } from 'react'
import '../styles/LocationSearchForm.css'
// import { FormErrors } from './FormErrors'

class LocationSearchForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			location: '',
			formErrors: { location: '' },
			locationValid: false,
			formValid: false,
			inputClass: ''
		}

		this.handleUserInput = this.handleUserInput.bind(this)
		this.validateField = this.validateField.bind(this)
		this.validateForm = this.validateForm.bind(this)
		this.errorClass = this.errorClass.bind(this)
	}

	handleUserInput(e) {
		const name = e.target.name
		const value = e.target.value

		this.setState({ [name]: value }, () => {
			this.validateField(name, value)
		})
		this.setState({
			inputClass: this.errorClass(this.state.formErrors.location)
		})
	}

	validateField(fieldName, value) {
		let fieldValidationErrors = this.state.formErrors
		let locationValid = this.state.locationValid

		// 80020
		// regex = /(^[0-9]{5}(-[0-9]{4})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}[0-9]{1}[A-Z]{1} *[0-9]{1}[A-Z]{1}[0-9]{1}$)/;

		// Boulder, CO OR Boulder co
		// regex= /^[A-Za-z ]+(?:,?\s+)[A-Za-z]{2,}$/gm;

		// City,ST + Zipcode RegEx
		const locationRegEx = /(^[0-9]{5}(-[0-9]{4})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}[0-9]{1}[A-Z]{1} *[0-9]{1}[A-Z]{1}[0-9]{1}$)|(^[A-Za-z ]+(?:,?\s+)[A-Za-z]{2,}$)/gm

		switch (fieldName) {
			case 'location':
				locationValid = value.match(locationRegEx)
				fieldValidationErrors.location = locationValid
					? ''
					: ' is invalid'
				break
			default:
				break
		}
		this.setState(
			{
				formErrors: fieldValidationErrors,
				locationValid: locationValid
			},
			this.validateForm
		)
	}

	validateForm() {
		this.setState({
			formValid: this.state.locationValid
		})
	}

	errorClass(error) {
		return error.length === 0 ? 'valid' : 'has-error'
	}

	// <div className="panel panel-default">
	// 	<FormErrors formErrors={this.state.formErrors} />
	// </div>
	// <div
	// 	className={`form-group ${this.errorClass(
	// 		this.state.formErrors.location
	// 	)}`}
	// >

	render() {
		const { inputClass, formValid, location } = this.state
		return (
			<div className="locationSearchform">
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="location">Find a charity near</label>
					<input
						type="text"
						required
						className={`form-control ${inputClass}`}
						id="location"
						name="location"
						placeholder="City, ST OR Zipcode "
						value={location}
						onChange={this.handleUserInput}
					/>

					<button type="submit" disabled={!formValid}>
						GO!
					</button>
				</form>
			</div>
		)
	}
}

export default LocationSearchForm
