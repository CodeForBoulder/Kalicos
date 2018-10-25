import React from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

export default () => (
  <Card>
    <CardContent>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Typography component='h2' variant='headline'>
            Working Hours
          </Typography>
        </Grid>
 
        <Grid item xs={12}>
          <FormGroup row>
            <FormControlLabel
              label='Su'
              control={
                <Checkbox value='Sunday' />
              }
            />
            <FormControlLabel
              label='Mo'
              control={
                <Checkbox value='Monday' />
              }
            />
            <FormControlLabel
              label='Tu'
              control={
                <Checkbox value='Tuesday' />
              }
            />
            <FormControlLabel
              label='We'
              control={
                <Checkbox value='Wednesday' />
              }
            />
            <FormControlLabel
              label='Th'
              control={
                <Checkbox value='Thursday' />
              }
            />
            <FormControlLabel
              label='Fr'
              control={
                <Checkbox value='Friday' />
              }
            />
            <FormControlLabel
              label='Sa'
              control={
                <Checkbox value='Saturday' />
              }
            />
          </FormGroup>
        </Grid>

        <Grid item xs={6}>
          <TextField type='time' label='start' InputLabelProps={{shrink:true}} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField type='time' label='end' InputLabelProps={{shrink:true}} fullWidth />
        </Grid>
      </Grid>
    </CardContent>
  </Card>
)
