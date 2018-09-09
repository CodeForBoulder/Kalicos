import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import LandingPage from './LandingPage'
import NotFound404 from './NotFound404'


class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ LandingPage } />
          <Route component={ NotFound404 } />
          </Switch>
      </div>
    )
  }
}


export default App