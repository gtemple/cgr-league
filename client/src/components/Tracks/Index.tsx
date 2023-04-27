import React from 'react'
import { useParams } from 'react-router-dom'

const Tracks= () => {
  const { id } = useParams();

  return (

    <div>traaaacks {id}</div>
  )
}

export default Tracks