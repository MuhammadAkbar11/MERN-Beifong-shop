import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PageTransition from './PageTransition';

const RouteGuest = ({ component: Component, restricted, ...rest }) => {
  const { loading, userInfo } = useSelector(state => state.session);

  return (
    <Route
      {...rest}
      render={props => {
        return !loading ? (
          <>
            {userInfo && restricted ? (
              <Redirect to='/' />
            ) : (
              <Component {...props} />
            )}
          </>
        ) : (
          <PageTransition />
        );
      }}
    />
  );
};

export default RouteGuest;
