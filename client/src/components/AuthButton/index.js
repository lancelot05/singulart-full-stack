import { Button, ButtonGroup } from '@material-ui/core';
import React, { useState } from 'react';
import Login from '../Login';
import Signup from '../Signup';

const AuthButton = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);

  const handleClickOpenLogin = () => {
    setOpenLogin(true);
  };
  const handleClickOpenSignup = () => {
    setOpenSignup(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };
  const handleCloseSignup = () => {
    setOpenSignup(false);
  };

  return (
    <>
      <ButtonGroup
        variant="text"
        color="primary"
        aria-label="text primary button group"
      >
        <Button onClick={handleClickOpenLogin}>Login</Button>
        <Button onClick={handleClickOpenSignup}>Signup</Button>
      </ButtonGroup>

      <Login open={openLogin} />

      <Signup open={openSignup} handleCloseSignup={handleCloseSignup} />
    </>
  );
};

export default AuthButton;
