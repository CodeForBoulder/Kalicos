import React, { Component } from 'react'
import '../styles/LocationSearchForm.css'
import { FormErrors } from './FormErrors'

class LocationSearchForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			location: '',
			formErrors: { location: '' },
			locationValid: false,
			formValid: false
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
		return error.length === 0 ? '' : 'has-error'
	}

	render() {
		return (
			<div className="locationsearchform">
			<h3>Find a charity near</h3>
				<form onSubmit={this.handleSubmit}>
					<div className="panel panel-default">
						<FormErrors formErrors={this.state.formErrors} />
					</div>
					<div
						className={`form-group ${this.errorClass(
							this.state.formErrors.location
						)}`}
					>
						<label htmlFor="location">Location</label>
						<input
							type="text"
							required
							className="form-control"
							id="location"
							name="location"
							placeholder="Boulder, CO"
							value={this.state.location}
							onChange={this.handleUserInput}
						/>
					</div>
					<button type="submit" disabled={!this.state.formValid}>
						Search
					</button>
				</form>
			</div>
		)
	}
}

export default LocationSearchForm
