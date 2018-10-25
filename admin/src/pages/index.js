import React from 'react'
import withRoot from '../withRoot'
import { Router, Route, Switch } from 'react-router-dom'

import { AuthProvider } from '../components/Authenticator'
import AdminBar from '../components/AdminBar'
import Landing from './Landing'
import Dashboard from './Dashboard'
import LocationCreate from './LocationCreate'
import LocationView from './LocationView'
import LocationList from './LocationList'
import Callback from './Callback'
import history from '../history'

class Index extends React.Component {
  render() {
    return (
      <Router history={history}>
        <AuthProvider>
          <AdminBar />
          <Route exact path='/' component={Landing} />
          <Route path='/dashboard' component={Dashboard} />
          <Switch>
            <Route exact path='/location' component={LocationList} />
            <Route path='/location/create' component={LocationCreate} />
            <Route path='/location/:id' component={LocationView} />
          </Switch>
          <Route path='/callback' component={Callback} />
        </AuthProvider>
      </Router>
    )
  }
}

export default withRoot(Index);
