import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContetxt } from '../../context/AuthProvider';
import useAdmin from '../../hooks/useAdmin';

const AdminRoute = ({children}) => {

    const {user, loading} =useContext(AuthContetxt);
    const [isAdmin,isAdminLoading] = useAdmin();
    const location = useLocation();

    if(loading || isAdminLoading){
        return <progress className="progress w-56"></progress>
    }
    if(user && isAdmin){
        return children
    }
  return <Navigate to={'/login'} state={{from:location}} replace ></Navigate>
}

export default AdminRoute