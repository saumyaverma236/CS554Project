import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import SignOutButton from './SignOut';
import '../App.css';

const Navigation = () => {
  const {currentUser} = useContext(AuthContext);
  return <div>{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

const NavigationAuth = () => {
  return (
    <nav className='navigation'>
      <ul>
        <li>
          <NavLink to='/dashboard'>Dashboard</NavLink>
        </li>
        <li>
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
};

const NavigationNonAuth = () => {
  return (
    <nav className='navigation'>
      <ul>

        <li>
          <NavLink to='/signup'>Sign-up</NavLink>
        </li>

        <li>
          <NavLink to='/signin'>Sign-In</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
