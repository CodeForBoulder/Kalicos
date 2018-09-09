import React from 'react'
import { setSelectedModal } from '../actions/userControl'



  const MapModalView = ( { _id, name, category, dispatch }) => {


  return (
    <div >
      <button onClick={() => dispatch(setSelectedModal({id: ''}))}>X</button>
      <li>{_id}</li>
      <li>{name}</li>
      <li>{category}</li>
    </div>
    )
}

export default MapModalView


