import React from 'react'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'

export default class Contacts extends React.Component {
  state = {
    events: [
      { name: 'Drive for shoes', dayLength: false,
        address: 'stuff',
        email: 'john@example.com', phone: '9556128888' },
      { name: '20k marathon', email: 'mary@cfb.com', phone: '2938847182' },
      { name: 'Gerard', email: 'gbarrent@fooz.com', phone: '3825732913' }
    ],
    enableForm: false,
    currentForm: {}
  }

  render() {
    return (
      <React.Fragment>
        <div>Will be a list</div>
        <Button variant='fab' color='secondary'><AddIcon /></Button>
      </React.Fragment>
    )
  }
}

