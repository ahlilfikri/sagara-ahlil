import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const isAuthenticated = () => {
  return !!sessionStorage.getItem('token');
};

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return isAuthenticated() ? <Component {...rest} /> : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;
