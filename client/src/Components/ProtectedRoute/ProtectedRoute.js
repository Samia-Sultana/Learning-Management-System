import React from "react";
import {
  Navigate, useLocation
} from "react-router-dom";

const ProtectedRoute =({children}) =>{
  const location = useLocation();
  const isAuthorised =  sessionStorage.getItem('token') == null ? false : true;
  
    return (
       <div>
        {isAuthorised ? 
        children : <Navigate to="/admin" state={{ from: location.pathname }}/>}
       </div>         
  );
  
}
export default ProtectedRoute;