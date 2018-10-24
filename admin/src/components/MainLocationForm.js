import React from 'react'
import Grid from '@material-ui/core/Grid'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import { checkHandler, checkValue, states } from './utils'


export default ({locationData, handler}) => (
  <CardContent>
    <Grid container spacing={24}>
      <Grid item xs={12}>
        <Typography component='h2' variant='headline'>
          Main Location Information
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <TextField 
          fullWidth
          label='Organization Name' 
          onChange={checkHandler(handler, 'name')}
          value={checkValue(locationData, 'name')}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField 
          fullWidth multiline rowmax='3'
          label='Mission'  
          onChange={checkHandler(handler, 'mission')}
          value={checkValue(locationData, 'mission')}
        />
      </Grid>
      <Grid item xs={12} />

      <Grid item xs={6}>
        <TextField
          fullWidth
          label='Address'
          onChange={checkHandler(handler, 'address')}
          value={checkValue(locationData, 'address')}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField 
          fullWidth
          label='Address2'
          onChange={checkHandler(handler, 'address2')}
          value={checkValue(locationData, 'address2')}
        />
      </Grid>

      <Grid item xs={7}>
        <TextField 
          fullWidth
          label='City' 
          onChange={checkHandler(handler, 'city')}
          value={checkValue(locationData, 'city')}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField 
          fullWidth
          select
          label='State' 
          InputLabelProps={{shrink:true}}
          onChange={checkHandler(handler, 'state')}
          value={checkValue(locationData, 'state') || ''}
        >
          {states.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={3}>
        <TextField 
          fullWidth
          label='Zip Code'
          onChange={checkHandler(handler, 'zip')}
          value={checkValue(locationData, 'zip')}
        />
      </Grid>
    </Grid>
  </CardContent>
)
