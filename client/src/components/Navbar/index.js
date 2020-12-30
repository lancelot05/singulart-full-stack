import React, { useEffect, useState } from 'react';
// import { Button } from '../Button';
import Button from '@material-ui/core/Button';
import './Navbar.css';

import { ButtonGroup, ThemeProvider } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Logout from '../Logout';
import { theme } from '../../MaterialUiTheme';
import AuthButton from '../AuthButton';

const Navbar = () => {
  const [scrollNav, setScrollNav] = useState(false);
  const [name, setName] = useState(null);

  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const handleUserName = (user) => {
      if (user) {
        setName(user.firstName);
      } else {
        setName(null);
      }
    };

    handleUserName(user);
  }, [user]);

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeNav);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <nav className={`Navbar ${scrollNav ? 'NavStick' : ''}`}>
        <div className="NavContainer">
          <a href="/" className="NavLogo">
            Singulart
          </a>
          <ul className="NavMenu">
            {isAuthenticated && (
              <>
                <a href="/upload" className="NavItem">
                  Upload
                </a>
                <a href="/favorites" className="NavItem">
                  Favorites
                </a>
              </>
            )}
            <a href="/gallery" className="NavItem">
              Artworks
            </a>

            <a href="/" className="NavItem">
              Artists
            </a>
            <a href="/" className="NavItem">
              About
            </a>
            <a href="/" className="NavItem">
              Contact
            </a>
          </ul>
          <div className="ButtonWrapper">
            {name ? (
              <>
                <p className="text">Hello,&nbsp; {name}</p>
                <Logout />
              </>
            ) : (
              <>
                <AuthButton />
              </>
            )}
          </div>
        </div>
      </nav>
    </ThemeProvider>
  );
};

export default Navbar;
