import React, { useEffect, useState } from "react";
import {
  Navigate,
  useLocation
} from "react-router-dom";
import AdminPage from "../AdminPage/AdminPage";

const ProtectedRoute =({ children, ...rest }) =>{
  console.log('inside protected route');
  const location = useLocation({});
  var redirectToLogin = <Navigate to={{ pathname: "/login",
                        state: { from: location.pathname }
                      }}
                    />
  var redirectToAdmin = <AdminPage></AdminPage>
  const [admin,setAdmin ] = useState();
  useEffect(()=>{
    if(sessionStorage.getItem('email') && sessionStorage.getItem('accessToken')){
      fetch('http://localhost:4200/admin')
      .then(res => res.json())
      .then(data =>{
        var flag = 0;
        for(var i = 0; i<data.length; i++){
          if (sessionStorage.getItem('email') === data[i].email ) {
            console.log('email set true')
                setAdmin({'email':true});
                flag = 1;
                  //break;        
          }
      }
      if(flag == 0){
        setAdmin({'email':false});
      }
      else{
        console.log('do nothing')
      }


    })
    }
    else{
      console.log('email sat false')
      setAdmin({'email':false})
    }
  },[])

    
  
    return (

       <div>
         {
           admin?.email == true && redirectToAdmin 
         }
         {
           admin?.email == false && redirectToLogin
         }
       </div>
            
        
        
            
  );
  
}
export default ProtectedRoute;