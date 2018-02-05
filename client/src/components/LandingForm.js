import React, { Component } from 'react';
// import { Field, reduxForm } from 'redux-form';
import { FormErrors } from './FormErrors';

class LandingForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			location: '',
			formErrors: { location: '' },
			locationValid: false,
			formValid: false
		};

		this.handleUserInput = this.handleUserInput.bind(this);
		this.validateField = this.validateField.bind(this);
		this.validateForm = this.validateForm.bind(this);
		this.errorClass = this.errorClass.bind(this);
	}

	handleUserInput(e) {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({ [name]: value }, () => {
			this.validateField(name, value);
		});
	}

	validateField(fieldName, value) {
		let { fieldValidationErrors, locationValid } = this.state;

		// 80020
		const zipRegEx = /(^[0-9]{5}(-[0-9]{4})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}[0-9]{1}[A-Z]{1} *[0-9]{1}[A-Z]{1}[0-9]{1}$)/;

		const locationRegEx =
			/(^[0-9]{5}(-[0-9]{4})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}[0-9]{1}[A-Z]{1} *[0-9]{1}[A-Z]{1}[0-9]{1}$)/ |
			/^[A-Za-z ]+(?:,?\s+)[A-Za-z]{2,}$/gm;

		// Boulder, CO OR Boulder co
		const cityStateRegEx = /^[A-Za-z ]+(?:,?\s+)[A-Za-z]{2,}$/gm;

		//TODO full address and add all 3 regex to below to be tested/validated\
		// 1600 Range St #101, Boulder, CO 80301
		const fullAddressRegEx = '';

		// 80301 DONE
		switch (fieldName) {
			case 'location':
				locationValid = value.match(locationRegEx);
				fieldValidationErrors.location = locationValid
					? ''
					: ' is invalid';
				break;
			default:
				break;
		}
		this.setState(
			{
				formErrors: fieldValidationErrors,
				locationValid: locationValid
			},
			this.validateForm
		);
	}

	validateForm() {
		this.setState({
			formValid: this.state.locationValid
		});
	}

	errorClass(error) {
		return error.length === 0 ? '' : 'has-error';
	}

	render() {
		return (
			<div>
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
					<label htmlFor="distance">Miles</label>
					<select name="distance" id="distance">
						<option defaultValue>Select</option>
						<option value="1">1</option>
						<option value="5">5</option>
						<option value="10">10</option>
					</select>
					<button type="submit" disabled={!this.state.formValid}>
						Search
					</button>
				</form>
			</div>
		);
	}
}
//
// LandingForm = reduxForm({
// 	form: 'landingForm'
// })(LandingForm);

export default LandingForm;
