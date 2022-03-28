import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { getSessionAction } from '../actions/v2/session.actions';
import PageTransition from './PageTransition';

const GuestRoute = ({ component: Component, restricted, ...rest }) => {
  const { loading, userInfo } = useSelector(state => state.session);

  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    dispatch(getSessionAction());
  }, [dispatch]);
  console.log(loading);
  return (
    <Route
      {...rest}
      render={props => {
        return loading ? (
          <PageTransition />
        ) : (
          <>
            {userInfo !== null && restricted ? (
              <Redirect to='/' />
            ) : (
              <Component {...props} />
            )}
          </>
        );
      }}
    />
  );
};

export default GuestRoute;
