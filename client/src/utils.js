import { mapsApiKey } from './config';

// geocoding moved to server, can remove this function
export const geocodeAddress = address => {
	let url =
		'https://maps.googleapis.com/maps/api/geocode/json?address=' +
		encodeURI(address) +
		'&key=' +
		encodeURI(mapsApiKey);

	return new Promise(response => {
		fetch(url)
			.then(res => res.json())
			.then(json => response(json.results[0].geometry.location));
	});
};
