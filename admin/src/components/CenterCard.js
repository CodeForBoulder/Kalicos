import React from 'react'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles'


const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block',
    [theme.breakpoints.up(480 + theme.spacing.unit * 3 * 2)]: {
      width: 480,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  card: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
})

const CenterCard = ({ classes, children }) => (
  <div className={classes.layout}>
    <Card className={classes.card}>
      {children}
   </Card>
  </div>
)

export default withStyles(styles)(CenterCard)
