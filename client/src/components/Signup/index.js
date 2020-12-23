import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/authActions';

import Alert from '@material-ui/lab/Alert';

const Signup = ({ open, handleClose }) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleRegister = (error, isAuthenticated) => {
      if (error) {
        if (error.id === 'REGISTER_FAIL') {
          setErrorMsg(error.msg.msg);
        } else {
          setErrorMsg(null);
        }
      }
      if (isAuthenticated) {
        handleClose();
      }
    };
    handleRegister(error, isAuthenticated);
  }, [error, isAuthenticated, handleClose]);

  const handleChange = (e) => {
    switch (e.target.id) {
      case 'email':
        return setEmail(e.target.value);
      case 'password':
        return setPassword(e.target.value);
      case 'firstName':
        return setFirstName(e.target.value);
      case 'lastName':
        return setLastName(e.target.value);
      default:
        return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(email, password, firstName, lastName);
    const newUser = {
      email,
      password,
      firstName,
      lastName,
    };
    dispatch(register(newUser));
  };

  const handleLogin = async (googleData) => {
    const res = await Axios.post(
      '/api/auth/google/v2',

      { token: googleData.tokenId },

      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const data = await res.data;
    localStorage.setItem('token', data.token);
    handleClose();
    // store returned user somehow
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Create Your New Account</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Signup NOW to experience the ultimate home of most satisfying artworks
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          placeholder="JohnDoe@singulart.com"
          fullWidth
          required
          value={email}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="firstName"
          label="First Name"
          type="text"
          placeholder="John"
          fullWidth
          required
          value={firstName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="lastName"
          label="Last Name"
          type="text"
          placeholder="Doe"
          fullWidth
          value={lastName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          required
          value={password}
          onChange={handleChange}
        />
        {errorMsg && (
          <Alert
            style={{ marginTop: '18px' }}
            variant="filled"
            severity="error"
          >
            {errorMsg}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <GoogleLogin
          clientId="636884656263-1g3od5t2m3o1hrsuh2i9sg8njqpg81m2.apps.googleusercontent.com"
          buttonText="Continue with Google"
          onSuccess={handleLogin}
          onFailure={handleClose}
          cookiePolicy={'single_host_origin'}
          theme="dark"
        />
        <Button variant="contained" color="secondary" onClick={handleSubmit}>
          Sign Up
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Signup;
