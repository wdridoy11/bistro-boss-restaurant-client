import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContetxt } from '../context/AuthProvider';


const useCart = () => {
    const  {user} = useContext(AuthContetxt);
    const token= localStorage.getItem("access-token")
    const { refetch, isError, data:cart=[], error } = useQuery({
      queryKey: ['cart',user?.email],
      queryFn: async ()=>{
        const res = await fetch(`http://localhost:5000/carts?email=${user?.email}`,{
          headers:{
            authorization:`bearer ${token}`
          }
        })
        return res.json();
      },
    })
  return [cart,refetch]
}

export default useCart