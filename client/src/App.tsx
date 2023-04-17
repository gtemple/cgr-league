import { useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {

  let server = {}

  axios
  .get('/users')
  .then(res => server = res)

  return (
    <div className="App">
        hello
        <h1>server</h1>
    </div>
  )
}

export default App
