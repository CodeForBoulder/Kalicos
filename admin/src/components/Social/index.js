import React from 'react'

import SocialInfo from './SocialInfo'
import SocialForm from './SocialForm'

class SocialToggle extends React.Component {
  state = { toggle: false }

  handleToggle = () => {
    this.setState({toggle: !this.state.toggle})
  }

  render() {
    if(this.state.toggle) {
      return (
        <SocialForm 
          cancel={this.handleToggle}
          social={this.props.social}
          save={this.props.save}
        />
      )    
    } else {
      return <SocialInfo social={this.props.social} edit={this.handleToggle}/>
    }
  }
}

export default SocialToggle
