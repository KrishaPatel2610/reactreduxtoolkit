import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, Link } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

export default function Navigation() {
  const navigate = useNavigate();
  return (
    <Navbar className='navbar'>
      <NavbarContent className='nav-content'>
        <NavbarBrand>
          <Link onClick={() => navigate('/')} className='nav-brand'>
            POSTGRAM
          </Link>
        </NavbarBrand>

        <Link onClick={() => navigate('add-post')} className='nav-item'>
          Add Post
        </Link>

        <Link onClick={() => navigate('/')} className='nav-item'>
          View
        </Link>

        <Link onClick={() => navigate('/')} className='nav-item'>
          Profile
        </Link>

        <Link onClick={() => navigate('/sign-in')} className='nav-item'>
          Logout
        </Link>
      </NavbarContent>
    </Navbar>
  );
}
