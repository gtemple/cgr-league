import { useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {

  let server = {}

  axios
  .get('/api/users')
  .then(res => {
    console.log(res.data)
    return
  })

  axios
  .get('/api/tracks')
  .then(res => {
    console.log(res.data)
    return
  })

  axios
  .get('/api/race-results')
  .then(res => {
    console.log(res.data)
    return
  })

  axios
  .get('/api/teams')
  .then(res => {
    console.log(res.data)
    return
  })


  return (
    <div className="App">
      <title>SUP</title>
        hello
    </div>
  )
}

export default App
