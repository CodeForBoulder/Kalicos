import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { reset } from 'redux-form'
import '../styles/LocationSearch.css'
import { geocodeAddress } from '../utils'
import LocationSearchForm from './LocationSearchForm'
import { setMapCenter } from '../actions/userControl'
import { getOrganizationsByLocation } from '../actions/organizations'


class LocationSearch extends React.Component {
	handleSubmit = (search) => {
		this.props.dispatch(getOrganizationsByLocation(search.address))
		geocodeAddress(search.address)
			.then(latLng => this.props.dispatch(setMapCenter(latLng)))
			.then(() => this.props.history.push('/maps'))
			this.props.dispatch(reset('locationSearchForm'))
	}

	render() {
		return (
			<div>
				<LocationSearchForm 
					onSubmit={this.handleSubmit}
				/>
			</div>
		)
	}
}

export default withRouter(connect()(LocationSearch))