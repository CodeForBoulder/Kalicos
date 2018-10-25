import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { checkValue } from './utils'


export default ({ orgData }) => (
  <Card>
    <CardContent>
      <Typography variant='h5' color='textSecondary' gutterBottom>
        Main Location Info
      </Typography>

      <Typography variant='subtitle2'>Organization Name</Typography>
      <Typography variant='body1' gutterBottom>{ checkValue(orgData, 'name') }</Typography>


      <Typography variant='subtitle2'>Mission</Typography>
      <Typography variant='body1' gutterBottom>{ checkValue(orgData, 'mission') }</Typography>

      <Typography variant='subtitle2'>Address</Typography>
      <Typography variant='body1'>{ checkValue(orgData, 'address') }</Typography>
    </CardContent>
  </Card>
)
