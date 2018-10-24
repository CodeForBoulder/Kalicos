import React from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'


export default class SocialForm extends React.Component {
  state = {
    website: this.props.social.website || '',
    facebook: this.props.social.facebook || '',
    instagram: this.props.social.instagram || '',
    twitter: this.props.social.twitter || '',
    amazon: this.props.social.amazon || '',
  }

  handleChange = name => event => this.setState({[name]: event.target.value})

  render() {
    const { website, facebook, instagram, twitter, amazon } = this.state
    const { cancel, save } = this.props

    return (
      <Card>
        <CardContent>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Typography component='h2' variant='headline'>
                Online Presence
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Website'
                value={website}
                onChange={this.handleChange('website')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Facebook'   
                value={facebook}
                onChange={this.handleChange('facebook')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label='Instagram'
                value={instagram}
                onChange={this.handleChange('instagram')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth 
                label='Twitter'
                value={twitter}
                onChange={this.handleChange('twitter')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                fullWidth  
                label='Amazon Smile'
                value={amazon}
                onChange={this.handleChange('amazon')}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button onClick={() => {
            save(this.state)()
            cancel() // which is just toggle to view
          }}>
            Save
          </Button>
          <Button onClick={cancel}>Cancel</Button>
        </CardActions>
      </Card>
    )
  }
}
