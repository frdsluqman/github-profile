import './App.css'
import React from 'react'
import Logo from './components/Logo';
import Users from './routes/Users';
import { Routes, Route } from 'react-router-dom'
import UsersInfo from './routes/UsersInfo';

const App = () => {
  return (
    <div className="min-h-screen bg-black">
      <div className="container text-gray-200 py-3">
        <Logo />
        <Routes>
          <Route path='/' element={<Users />}></Route>
          <Route path='/:name' element={<UsersInfo />}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App;
