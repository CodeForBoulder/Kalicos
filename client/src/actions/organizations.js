import axios from 'axios';

const RECEIVE_ALL_ORGANIZATIONS = 'RECEIVE_ALL_ORGANIZATIONS';
const RECEIVE_ADDED_ORGANIZATION = 'RECEIVE_ADDED_ORGANIZATION';
const RECEIVE_UDPATED_ORGANIZATION = 'RECEIVE_UDPATED_ORGANIZATION';
const RECEIVE_ORGANIZATIONS_BY_LOCATION = 'RECEIVE_ORGANIZATIONS_BY_LOCATION';

const dbUrl = 'http://localhost:3000/api/';

// Pull all accepted organizations
const receiveAllOrganizations = data => {
	return {
		type: RECEIVE_ALL_ORGANIZATIONS,
		organizations: data
	};
};

const getAllOrganizations = () => {
	return dispatch => {
		return axios
			.get(`${dbUrl}organizations`)
			.then(
				response => response.data,
				error => console.log('A request error occurred', error)
			)
			.then(data => dispatch(receiveAllOrganizations(data)));
	};
};

// Pull accepted organizations by location search
const receiveOrganizationsByLocation = data => {
	return {
		type: RECEIVE_ORGANIZATIONS_BY_LOCATION,
		organizations: data
	};
};

const getOrganizationsByLocation = (address, distance) => {
	console.log('in action', address, distance);
	return dispatch => {
		return axios
			.get(`${dbUrl}organizations`, {
				params: {
					address,
					distance
				}
			})
			.then(
				response => response.data,
				error => console.log('A request error occurred', error)
			)
			.then(data => dispatch(receiveOrganizationsByLocation(data)));
	};
};

// Create new organization
const receiveAddedOrganization = data => {
	return {
		type: RECEIVE_ADDED_ORGANIZATION,
		organization: data
	};
};

const addOrganization = ({
	name = '',
	category = '',
	description = '',
	address = ''
}) => {
	return dispatch => {
		return axios
			.post(`${dbUrl}organization`, {
				name,
				category,
				description,
				address
			})
			.then(
				response => response.data,
				error => console.log('A request error occurred', error)
			);
	};
};

// Update organization
const receiveUpdatedOrganization = updates => {
	return {
		type: RECEIVE_UDPATED_ORGANIZATION,
		updates
	};
};

const updateOrganization = updates => {
	return dispatch => {
		return axios
			.put(`${dbUrl}updateorganization`, updates)
			.then(
				response => response.data,
				error => console.log('A request error occurred', error)
			)
			.then(data => dispatch(receiveUpdatedOrganization(data[0])));
	};
};

export {
	getAllOrganizations,
	RECEIVE_ALL_ORGANIZATIONS,
	getOrganizationsByLocation,
	RECEIVE_ORGANIZATIONS_BY_LOCATION,
	addOrganization,
	receiveAddedOrganization,
	RECEIVE_ADDED_ORGANIZATION,
	updateOrganization,
	RECEIVE_UDPATED_ORGANIZATION,
	receiveUpdatedOrganization
};
