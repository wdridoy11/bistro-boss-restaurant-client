import React from 'react'
import {createBrowserRouter} from "react-router-dom";
import Main from '../../layout/Main';
import Home from '../../pages/home/home/Home';
import Menu from '../../pages/menu/menu/Menu';
import Login from '../../pages/login/Login';
import Order from '../../pages/order/order/Order';

const router = createBrowserRouter([
    {
      path: "/",
      element:<Main></Main> ,
      children:[
        {
            path:"",
            element:<Home></Home>
        },
        {
          path:"menu",
          element:<Menu></Menu>
        },
        {
          path:"order",
          element:<Order></Order>
        }
      ]
    },
    {
      path:"login",
      element:<Login></Login>
    }
  ]);


export default router