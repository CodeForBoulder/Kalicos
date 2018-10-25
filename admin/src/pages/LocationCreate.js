import React from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import { Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

import MainLocationForm from '../components/MainLocationForm'
import http from '../httpClient'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 6
  }
})

class CreateLocation extends React.Component {
  // can eventually apply validators
  state = {
    location: {
      name: '', mission: '', address: '',
      address2: '', city: '', state: '', zip: ''
    },
    redirect: false
  }

  componentDidMount() {
    this.setState({
      location: {
        name: 'GoodWill',
        mission: 'Goodwill works to enhance the dignity ' +
        'and quality of life of individuals and families by ' +
        'strengthening communities, eliminating barriers to' + 
        'opportunity, and helping people in need reach their ' +
        'full potential through learning and the power of work.',
        address: '2486 Baseline Rd',
        address2: '', // destructive set, address2 would be undefined otherwise
        city: 'Boulder',
        state: 'CO',
        zip: '80305'
      }
    })
  }

  handler = name => event => (
    this.setState({ 
      location: Object.assign(this.state.location, {[name]: event.target.value})
    })
  )

  outputFmt = () => {
    let {name, mission, address, address2, city, state, zip} = this.state.location,
      newAddress = address + ' ' + (address2 || '') + ' ' + city + ' ' + state + ', ' + zip
    return {name, mission, address: newAddress}
  }

  submit = () => {
    http.post('/location', this.outputFmt())
      .catch(err => console.log('Error: ', err))
      .then(({data}) => {
        this.setState({result: data, redirect: true })
      })
  }

  printer = () => {
    console.log(this.state)
  }

  test = () => {
    http.get('/location')
      .catch(err => console.log('Error: ', err))
      .then(({data}) => console.log('Data: ', data))
  }

  render() {
    const { classes } = this.props,
      { redirect, location, result } = this.state

    if(redirect) {
      return (
        <Redirect to={{ 
          pathname: '/location/' + result._id,
          state: { result }
        }}/> 
      )
    }

    return (
      <Grid container spacing={24} className={classes.root}>
        <Grid item xs={4} />
        <Grid item xs={4}>
          <Card>
            <MainLocationForm 
              locationData={location}
              handler={this.handler}
            />
            <CardActions>
              <Button onClick={this.submit}>Create</Button>
              <Button onClick={this.printer}>Print</Button>
              <Button onClick={this.test}>Call</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={4} />
      </Grid>
    )
  }
}

export default withStyles(styles)(CreateLocation)
