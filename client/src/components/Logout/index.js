import React from 'react';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logout } from '../../actions/authActions';
import { useDispatch } from 'react-redux';

const Logout = () => {
  const dispatch = useDispatch();
  const userLogout = (e) => {
    dispatch(logout());
  };
  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<ExitToAppIcon />}
        style={{ margin: '0 6px' }}
        onClick={userLogout}
      >
        Logout
      </Button>
    </>
  );
};

export default Logout;
