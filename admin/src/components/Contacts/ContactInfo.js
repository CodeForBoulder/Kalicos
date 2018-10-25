import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import CardContent from '@material-ui/core/CardContent'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'


class ContactList extends React.Component {
  state = { panel: null }

  switchPanel = panelName => () => (
    this.setState({panel: panelName})
  )

  render() {
    return (
      <React.Fragment>
        {this.props.contacts.map((contact, idx) => (
          <ExpansionPanel key={idx} expanded={this.state.panel===idx} onChange={this.switchPanel(idx)}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant='h6' color='textSecondary'>{contact.name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <CardContent>
                <Typography variant='subtitle2' gutterBottom>Phone</Typography>
                <Typography variant='body1'>{contact.phone}</Typography><br />

                <Typography variant='subtitle2' gutterBottom>Email</Typography>
                <Typography variant='body1'>{contact.email}</Typography>

                <br />

                <IconButton><EditIcon /></IconButton>
                <IconButton><DeleteIcon /></IconButton>
              </CardContent>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </React.Fragment>
    )
  }
}

export default ContactList
