import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { checkHandler } from './utils'

const styles = theme => ({
  setRight: { float: 'right' }
})

const LocationTable = ({ classes, locations, adder, deleter, viewer }) => (
  <Card>
    <CardContent>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.grow}>Organization Name</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {locations.map((location, idx) => (
            <TableRow key={idx}>
              <TableCell>{location.name}</TableCell>
              <TableCell>
                <IconButton 
                  className={classes.setRight}
                  onClick={checkHandler(deleter, location._id)}
                >
                  <DeleteIcon />
                </IconButton>
                <Link to={{
                  pathname: '/location/' + location._id,
                  state: { result: location }
                }}>
                  <IconButton 
                    className={classes.setRight}
                  >
                    <EditIcon />
                  </IconButton>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
    <CardActions>
      <Link to='/location/create'>
        <IconButton onClick={adder}>
          <AddIcon />
        </IconButton>
      </Link>
    </CardActions>
  </Card>
)

export default withStyles(styles)(LocationTable)
