import React from 'react'
import { connect } from 'react-redux'
import { mapsApiKey } from '../config'
import GoogleMapReact from 'google-map-react'
import selectOrganizations from '../selectors/organizations'
import { Place } from '@material-ui/icons'

const MarkerPoints = ({ text }) => 
  <div>
	<Place />
    {text}
  </div>

const DonationMap = (props) => (
	// Important! Always set the container height explicitly
	<div style={{ height: '100vh', width: '100%' }}>
	<GoogleMapReact
		center={{ lat: props.latLng.lat, lng: props.latLng.lng }}
		defaultZoom={11}
		bootstrapURLKeys={{ key: mapsApiKey }}
		onChildClick={(e) => {}}
	>
		{props.visibleOrganizations.map((organization) => {
			return (
				<MarkerPoints
					key={organization._id}
					lng={organization.latLng.coordinates[0]}
					lat={organization.latLng.coordinates[1]}
					text={organization.name}
				/>
			)
		})}
	</GoogleMapReact>
	</div>
)

const mapStateToProps = (state, props) => {
	return {
		latLng: state.userControl.mapCenter,
		selectedModal: state.userControl.modal,
		visibleOrganizations: selectOrganizations(state.organizations, state.filters)
	}
}

export default connect(mapStateToProps)(DonationMap)