import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { getSessionAction } from '@actions/v2/session.actions';
import { userLogoutAction } from '@actions/v2/user.actions';
import PageTransition from './PageTransition';
/* eslint-disable */
const RoutePrivate = ({ component: Component, restricted, ...rest }) => {
  const { loading, userInfo, status: sessionStatus, isLogout } = useSelector(
    state => state.session
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!sessionStatus) {
      dispatch(getSessionAction());
    }
  }, [dispatch, sessionStatus]);

  React.useEffect(() => {
    if (isLogout) {
      dispatch(userLogoutAction());
    }
  }, [isLogout]);
  return (
    <Route
      {...rest}
      render={props => {
        return !loading ? (
          <>{userInfo ? <Component {...props} /> : <Redirect to='/login' />}</>
        ) : (
          <PageTransition />
        );
      }}
    />
  );
};

export default RoutePrivate;
