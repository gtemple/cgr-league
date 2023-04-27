import { useState } from 'react'
import { Route, Routes, Link, useParams } from 'react-router-dom'
import './App.css'
import User from './components/User/Index';
import Nav from './components/Nav/Index';

import getUsers from './Hooks/useGetUsers';

function App() {

const {userData, loaded} = getUsers();

  return (
    <>
      <div className="App">
        <title>SUP</title>
        {loaded}
        <Nav />
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
