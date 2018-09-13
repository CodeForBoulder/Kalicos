import React from 'react'
import Header from './Header'
import About from './About'
import LocationSearch from './LocationSearch'
import FilterBoxes from './FilterBoxes'
import ItemSearchBox from './ItemSearchBox'
import DonationMap from './DonationMap'
import Contact from './Contact'
import { withStyles } from '@material-ui/core/styles'


const styles = (theme) => ({
	root: {
	  display: 'flex',
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
	  flexGrow: 1,
	  padding: theme.spacing.unit * 3,
	  height: '100vh',
	  overflow: 'auto',
	},
  });

const LandingPage = (props) => { 
	const { classes } = props;
	return (<div className={classes.root}>
		<div>
			<Header/>
		</div>
		<main className={classes.content}>
            <div className={classes.appBarSpacer} />
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
		</main>
	</div>
)}

export default  withStyles(styles)(LandingPage)

