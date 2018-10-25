import React from 'react'
import Button from '@material-ui/core/Button'
import { Consumer } from './Authenticator'

export default () => (
  <Consumer>
    {context => {
      if(context.isAuthenticated()) {
        return <Button color='inherit' onClick={context.logout}>Sign Out</Button>
      } else {
        return <Button color='inherit' onClick={context.login}>Sign In</Button>
      }
    }}
  </Consumer>
)
