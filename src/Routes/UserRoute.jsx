// import React from 'react';
import useRole from '../hook/useRole';
import { Navigate } from 'react-router';
import Loading from '../Components/Loading';

const UserRoute = ({ children }) => {
  const [role, isRoleLoading ] = useRole()
  if (isRoleLoading) {
    return <Loading></Loading>
  }
  //console.log(role)

  if (role !== "user") {
    return (
      <Navigate to='/' replace='true'></Navigate>
    )
  } 
  return children
};

export default UserRoute;