import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import AuthButton from './AuthButton'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
})

class AdminAppBar extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h5' color='inherit' className={classes.grow}>
              Admin
            </Typography>
            <AuthButton />
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(AdminAppBar)
