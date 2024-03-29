import React from 'react'
import { Helmet } from 'react-helmet-async';
import { FaShoppingCart, FaWallet, FaCalendarAlt, FaHome, FaBars,FaShoppingBag, FaEnvelope, FaUtensils, FaUsers, FaBook} from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import useCart from '../hooks/useCart';
import { useContext } from 'react';
import { AuthContetxt } from '../context/AuthProvider';
import useAdmin from '../hooks/useAdmin'

const Dashboard = () => {
  const [cart] = useCart();
  const {user} = useContext(AuthContetxt);
  // TODB : load data from the server to have dynamic isAdmin base
  // const isAdmin =true;
  const [isAdmin] = useAdmin();
  return (
    <>
    <Helmet><title>Bistro | Dashboard</title></Helmet>
    <div className="drawer drawer-mobile ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <Outlet></Outlet>
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
      </div> 
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
        <ul className="menu p-4 w-80 bg-[#D1A054] text-base-content">
          <div className='text-center mb-4'>
              <img className='w-32 h-32 object-cover rounded-full mx-auto border' src={user?.photoURL} alt="profile" />
              <h3 className='text-lg font-medium mt-2'>{user?.displayName}</h3>
              <h3 className='text-base font-normal mt-1'>{user?.email}</h3>
          </div>
          {
           isAdmin ? <> 
              <li className='text-base font-medium'><NavLink to={'/dashboard/home'}><FaHome></FaHome>Admin Home</NavLink></li>
              <li className='text-base font-medium'><NavLink to={'/dashboard/additems'}><FaUtensils></FaUtensils>Add Items</NavLink></li>
              <li className='text-base font-medium'><NavLink to={'/dashboard/'}><FaWallet></FaWallet>Manage Items</NavLink></li>
              <li className='text-base font-medium'><NavLink to={'/dashboard/'}><FaBook></FaBook>Manage Bookings</NavLink></li>
              <li className='text-base font-medium'><NavLink to={'/dashboard/allusers'}><FaUsers></FaUsers>All Users</NavLink></li>
           </>:<> 
              <li className='text-base font-medium'><NavLink to={'/dashboard/home'}><FaHome></FaHome>User Home</NavLink></li>
              <li className='text-base font-medium'><NavLink to={'/dashboard/reservation'}><FaCalendarAlt></FaCalendarAlt>Reservation</NavLink></li>
              <li className='text-base font-medium'>
                <NavLink to={'/dashboard/mycart'}>
                  <FaShoppingCart></FaShoppingCart>My Cart
                  <span className="badge">+{cart?.length || 0}</span>
                </NavLink>
              </li>
              <li className='text-base font-medium'><NavLink to={'/dashboard/history'}><FaWallet></FaWallet>Payment History</NavLink></li>
           </>
        }
          <div className="divider"></div> 
          <li className='text-base font-medium'><NavLink to={'/'}><FaHome></FaHome>Home</NavLink></li>
          <li className='text-base font-medium'><NavLink to={'/menu'}><FaBars></FaBars>Menu</NavLink></li>
          <li className='text-base font-medium'><NavLink to={'/order/salad'}><FaShoppingBag></FaShoppingBag>Shop</NavLink></li>
          <li className='text-base font-medium'><NavLink to={'/contact'}><FaEnvelope></FaEnvelope>Contact</NavLink></li>
        </ul>
      </div>
    </div>
  </>
  )
}

export default Dashboard