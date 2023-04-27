import { useState } from 'react'
import { Route, Routes, Link, useParams } from 'react-router-dom'
import './App.css'
import User from './components/User/Index';
import Navigation from './components/Navigation/Index';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
      <div className="App">
        <title>SUP</title>
        <Navigation />
      </div>

    <Routes>
      <Route path='users'>
        <Route path=":userId" element={<User />} />hey
      </Route>
    </Routes>

    </>
  )
}

export default App
