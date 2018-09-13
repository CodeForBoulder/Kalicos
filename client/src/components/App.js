import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import LandingPage from './LandingPage'
import NotFound404 from './NotFound404'
import CssBaseline from '@material-ui/core/CssBaseline'


class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <div>
          <Switch>
            <Route exact path="/" component={ LandingPage } />
            <Route component={ NotFound404 } />
            </Switch>
        </div>
      </React.Fragment>
    )
  }
}


export default App