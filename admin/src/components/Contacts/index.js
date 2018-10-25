import React from 'react'
import ContactList from './ContactInfo'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'

export default class Contacts extends React.Component {
  state = {
    contacts: [
      { name: 'John', email: 'john@example.com', phone: '9556128888' },
      { name: 'Mary', email: 'mary@cfb.com', phone: '2938847182' },
      { name: 'Gerard', email: 'gbarrent@fooz.com', phone: '3825732913' }
    ],
    enableForm: false,
    currentForm: {}
  }

  render() {
    return (
      <React.Fragment>
        <ContactList contacts={this.state.contacts} />
        <Button variant='fab' color='secondary'><AddIcon /></Button>
      </React.Fragment>
    )
  }
}

