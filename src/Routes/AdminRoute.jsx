// import React from 'react';
import useRole from '../hook/useRole';
import { Navigate } from 'react-router';
import Loading from '../Components/Loading';

const AdminRoute = ({ children }) => {
  const [role, isRoleLoading ] = useRole()
  if (isRoleLoading) {
    return <Loading></Loading>
  }

  if (role !== "admin") {
    return (
      <Navigate to='/' replace='true'></Navigate>
    )
  }
  return children
 
 
};

export default AdminRoute;