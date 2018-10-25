import React from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import http from '../httpClient'

import LocationTable from '../components/LocationTable'

const styles = theme => ({
  root: { marginTop: theme.spacing.unit * 6 }
})

class LocationList extends React.Component {
  state = { locations: [] }

  componentDidMount() {
    http.get('/location')
      .catch(err => console.log('Error: ', err))
      .then(({data}) => this.setState({locations: data}))
  }

  dropById = id => {
    return this.state.locations.filter(
      location => location._id !== id
    )
  }

  deleter = id => () => {
    http.delete('/location/' + id)
      .catch(err => console.log('Error: ', err))
      .then(data => this.setState({locations: this.dropById(id)}))
  }

  render() {
    const { classes } = this.props
    return (
      <Grid container spacing={24} className={ classes.root }>
        <Grid item xs={4} />
        <Grid item xs={4} >
          <LocationTable 
            locations={this.state.locations}
            deleter={this.deleter}
          />
        </Grid>
        <Grid item xs={4} />
      </Grid>
    )
  }
}

export default withStyles(styles)(LocationList)
