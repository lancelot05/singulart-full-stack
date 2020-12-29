import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return <Component {...props} />;
        } else {
          console.log(isAuthenticated);
          return null;
          // <Redirect
          //   to={{
          //     pathname: '/',
          //     state: {
          //       from: props.location,
          //     },
          //   }}
          // />
        }
      }}
    />
  );
};

export default ProtectedRoute;
