import { useState } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import './App.css'
import axios from 'axios';

import Nav from './components/Nav/Index';

function App() {


  return (
    <>
      <div className="App">
        <title>SUP</title>
          <Nav />
      </div>


    </>
  )
}

export default App
