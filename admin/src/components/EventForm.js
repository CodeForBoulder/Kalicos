import React from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

export default () => (
  <Card>
    <CardContent>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Typography component='h2' variant='headline'>
            Event Form
          </Typography>
        </Grid>
 
        <Grid item xs={12}>
          <TextField label='Longer than a day?' fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label='Event Name' fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label='Description' fullWidth />
        </Grid>
        <Grid item xs={12} />


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
        <Grid item xs={12} />

        <Grid item xs={12}>
          <TextField label='Website' fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label='Admission Cost' fullWidth />
        </Grid>

        <Grid item xs={4}>
          <TextField type='date' InputLabelProps={{shrink:true}} label='Date' fullWidth />
        </Grid>
        <Grid item xs={4}>
          <TextField type='time' InputLabelProps={{shrink:true}} label='StartTime' fullWidth />
        </Grid>
        <Grid item xs={4}>
          <TextField type='time' InputLabelProps={{shrink:true}} label='End Time' fullWidth />
        </Grid>


        <Grid item xs={6}>
          <TextField type='date' InputLabelProps={{shrink:true}} label='Start Date' fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField type='date' InputLabelProps={{shrink:true}} label='End Date' fullWidth />
        </Grid>

      </Grid>
    </CardContent>
  </Card>
)

