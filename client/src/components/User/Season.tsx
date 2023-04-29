import React from 'react'

interface Props {
  'id': number
}

const Season = (props: Props) => {
  return (

    <div>
      {props.id}
      Season
    </div>
  )
}

export default Season