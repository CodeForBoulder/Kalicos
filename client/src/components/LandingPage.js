import React from 'react'
import Header from './Header'
import About from './About'
import LocationSearch from './LocationSearch'
import FilterBoxes from './FilterBoxes'
import ItemSearchBox from './ItemSearchBox'
import DonationMap from './DonationMap'
import Contact from './Contact'


const LandingPage = () => (
	<div>
		<div>
			<Header/>
		</div>
		<div>
			<About/>
		</div>
		<div>
			<LocationSearch/>
		</div>
		<div>
			<FilterBoxes/>
		</div>
		<div>
			<ItemSearchBox/>
		</div>
		<div>
			<DonationMap/>
		</div>
		<div>
			<Contact/>
		</div>
	</div>
)

export default LandingPage

