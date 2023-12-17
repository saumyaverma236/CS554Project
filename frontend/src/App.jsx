import "../src/App.css"
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Landing from './components/Landing'
import Navigation from './components/Navigation'
import Dashboard from './components/Dashboard'
import {AuthProvider} from './context/AuthContext';
import RoomDetail from "./components/RoomDetail";


function App() {
  return (
    <AuthProvider>
      <div className='App'>
        <header className='App-header card'>
          <Navigation />
        </header>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/rooms/:id' element={<RoomDetail />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
