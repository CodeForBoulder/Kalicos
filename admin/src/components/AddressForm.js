import React from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'

export default () => (
  <Card>
    <CardContent>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <TextField label='Organization Name' fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label='Mission' multiline rowsMax='3' fullWidth />
        </Grid>

        <Grid item xs={6}>
          <TextField label='Address' fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label='Address2' fullWidth />
        </Grid>

        <Grid item xs={7}>
          <TextField label='City' fullWidth />
        </Grid>
        <Grid item xs={2}>
          <TextField label='State' fullWidth />
        </Grid>
        <Grid item xs={3}>
          <TextField label='Zip Code' fullWidth />
        </Grid>
      </Grid>
    </CardContent>
  </Card>
)
