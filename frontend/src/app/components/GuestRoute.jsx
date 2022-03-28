import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { getSessionAction } from '../actions/v2/session.actions';
import PageTransition from './PageTransition';

const GuestRoute = ({ component: Component, restricted, ...rest }) => {
  const { loading, userInfo, status: sessionStatus } = useSelector(
    state => state.session
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!sessionStatus) {
      dispatch(getSessionAction());
    }
  }, [dispatch, sessionStatus]);

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

export default GuestRoute;
