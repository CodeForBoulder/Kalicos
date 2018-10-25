import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import http from '../httpClient'
import _ from 'lodash'

import MainLocationInfo from '../components/MainLocationInfo'
import Social from '../components/Social'
import Contacts from '../components/Contacts'
import Schedules from '../components/Schedules'
import Events from '../components/Events'

import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import BusinessIcon from '@material-ui/icons/Business'
import EventIcon from '@material-ui/icons/Event'
import ScheduleIcon from '@material-ui/icons/Schedule'
import GroupIcon from '@material-ui/icons/Group'

const styles = theme => ({
  root: { marginTop: theme.spacing.unit * 6 },
  second: { marginTop: theme.spacing.unit * 2}
})

class LocationView extends React.Component {
  state = {
    location: null,
    tabVal: 0
  }

  componentDidMount() {
    if(this.props.location.state && this.props.location.state.result) {
      this.setState({location: this.props.location.state.result})
    } else {
      http.get('/location' + this.props.match.params.id)
        .then(({data}) => this.setState({location: data}))
        .catch(err => console.log('Error: ', err))
    }
  }

  getSocial = () => _.pick(
    this.state.location, 
    ['website', 'facebook', 'instagram', 'twitter', 'amazon']
  )

  saveSocial = social => () => (
    this.setState({location:
      Object.assign(this.state.location, social)
    })
  )

  saveToList = list => item => () => 'foo'

  tabChange = (event, tabVal) => {
    this.setState({ tabVal })
  }

  render() {
    const { classes } = this.props
    const { tabVal, location } = this.state
    return (
      <React.Fragment>
        <Paper square>
          <Tabs 
            value={tabVal} 
            onChange={this.tabChange}
            centered
          >
            <Tab label='Main Info' icon={<BusinessIcon />} />
            <Tab label='Contacts' icon={<GroupIcon />} />
            <Tab label='Operating Hours' icon={<ScheduleIcon />} />
            <Tab label='Events' icon={<EventIcon />}/>
          </Tabs>
        </Paper>
        <Grid container spacing={24} className={ classes.root }>
          <Grid item xs />
          <Grid item xs={4} >
            {
              tabVal === 0 && 
                <React.Fragment>
                  <MainLocationInfo orgData={location} />
                  <div className={classes.second}>
                    <Social 
                      social={this.getSocial()}
                      save={this.saveSocial}
                    />
                  </div>
                </React.Fragment>
            }
            {tabVal === 1 && <Contacts contacts={location.contacts || []} />}
            {tabVal === 2 && <Schedules schedules={location.schedules || []} />}
            {tabVal === 3 && <Events events={location.events || []} />}
          </Grid>
          <Grid item xs />
        </Grid>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(LocationView)
