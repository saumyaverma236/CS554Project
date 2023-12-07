import React from 'react';
import '../App.css';
import {Route, Routes} from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Landing from './Landing';
import Navigation from './Navigation';
import Dashboard from './Dashboard';
import {AuthProvider} from '../context/AuthContext';

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
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
