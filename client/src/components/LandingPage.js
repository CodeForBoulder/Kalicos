import React, { Component } from 'react';
import { connect } from 'react-redux';
import LandingForm from './LandingForm';
import { geocodeAddress } from '../utils';
import { setMapCenter } from '../actions/userControl';
import { getOrganizationsByLocation } from '../actions/organizations';

class LandingPage extends Component {
	handleSubmit = search => {
		this.props.dispatch(
			getOrganizationsByLocation(search.address, search.distance)
		);
		geocodeAddress(search.address).then(latLng =>
			this.props.dispatch(setMapCenter(latLng))
		);
		this.props.history.push('/maps');
	};
	render() {
		return (
			<div>
				<LandingForm handleSubmit={this.handleSubmit} />
				<br />
				<p>Find locations within area of zip code or address</p>
			</div>
		);
	}
}

export default connect()(LandingPage);
