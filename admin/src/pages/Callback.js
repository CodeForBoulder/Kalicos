import React from 'react'
import CardContent from '@material-ui/core/CardContent'
import CenterCard from '../components/CenterCard'
import { Consumer } from '../components/Authenticator'


export default props => (
  <Consumer>
    {context => {
      context.authenticate()
      return (
        <CenterCard>
          <CardContent>
            <p>Hello from Callback</p>
          </CardContent>
        </CenterCard>
      )
    }}
  </Consumer>
)
