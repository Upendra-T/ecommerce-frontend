import Orders from '../features/order/Orders';
import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
function UserOrderPage() {
  const { uid } = useContext(UserContext);
  console.log(uid);
  if (!uid) {
    alert('Please login to view orders');
    return;
  
  }
 
 
  return (
    <div>
        <h1 className='mx-auto text-2xl'>My Orders</h1>
        <Orders userId={uid} ></Orders>
    </div>
  );
}

export default UserOrderPage;