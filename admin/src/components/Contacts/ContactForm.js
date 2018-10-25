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
            Contact Information
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField label='Contact Type || Not sure what I meant for this' fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label='Name' fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label='Phone' fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label='Email' fullWidth />
        </Grid>
      </Grid>
    </CardContent>
  </Card>
)

