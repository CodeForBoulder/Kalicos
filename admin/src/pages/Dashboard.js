import React from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles'

import SocialForm from '../components/Social/SocialForm'
import WorkingHoursForm from '../components/WorkingHoursForm'
import EventForm from '../components/EventForm'
import ContactForm from '../components/Contacts/ContactForm'
import MainLocationForm from '../components/MainLocationForm'

import MainLocationInfo from '../components/MainLocationInfo'
import LocationTable from '../components/LocationTable'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 6,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  }
})

const exampleLocations = [
  {name: 'cycling for fun'},
  {name: 'givers of aid'},
  {name: 'kid rock climbers group'}
]

const Dashboard = ({ classes }) => (
  <Grid container spacing={24} className={classes.root}>
    <Grid item xs={4}>
      <Card>
        <MainLocationForm />
      </Card>
      <br />
      <SocialForm />
      <br />
      <LocationTable locations={exampleLocations} />
    </Grid>
    <Grid item xs={4}>
      <WorkingHoursForm />
      <br />
      <ContactForm />
      <br />
      <MainLocationInfo 
        orgData={{
          name: 'Cycling in CO Foundation',
          mission: 'To get an many more people on bikes,' +
          ' and commuting to work, as to begin to convince the ' +
          'municiple government to put more bike lanes in place.',
          address: '5620 28th St Boulder, CO 80304'
        }}
      />
    </Grid>
    <Grid item xs={4}>
      <EventForm />
    </Grid>
  </Grid>
)

export default withStyles(styles)(Dashboard)
