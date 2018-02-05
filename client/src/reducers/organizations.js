import {
	RECEIVE_ALL_ORGANIZATIONS,
	RECEIVE_ADDED_ORGANIZATION,
	RECEIVE_UDPATED_ORGANIZATION,
	RECEIVE_ORGANIZATIONS_BY_LOCATION
} from '../actions/organizations';

const organizationsReducerDefaultState = [];

const organizationsReducer = (
	state = organizationsReducerDefaultState,
	action
) => {
	switch (action.type) {
		case RECEIVE_ALL_ORGANIZATIONS:
			return [...action.organizations];
		case RECEIVE_ORGANIZATIONS_BY_LOCATION:
			return [...action.organizations];
		case RECEIVE_ADDED_ORGANIZATION:
			return [...state, action.organization];
		case RECEIVE_UDPATED_ORGANIZATION:
			return state.map(organization => {
				if (organization._id === action.updates._id) {
					return {
						...organization,
						...action.updates
					};
				} else {
					return organization;
				}
			});
		default:
			return state;
	}
};

export default organizationsReducer;
