/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncTransaction } from '../../../states/transaction/action';

function Sidebar({ orderDetails }) {
  console.log(orderDetails, 'orderDetails in sidebar');
  const [updatedOrderDetails, setUpdatedOrderDetails] = useState([]);
  // const [selectedVoucher] = useState(undefined);
  // const [selectedVariants] = useState({});
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  console.log(updatedOrderDetails, ' updatedOrderDetails in sidebar');

  useEffect(() => {
    setUpdatedOrderDetails(orderDetails);
  }, [orderDetails]);

  // const handleCharge = async () => {
  //   try {
  //     const variantQuantities = Object.entries(selectedVariants).map(
  //       ([variantId, { quantity }]) => ({
  //         variantId,
  //         quantity,
  //       })
  //     );
  //     const userId = authUser.id;
  //     const voucherCode = selectedVoucher?.code || undefined;
  //     await dispatch(
  //       asyncTransaction({
  //         userId,
  //         voucherCode,
  //         variants: variantQuantities,
  //       })
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   setUpdatedOrderDetails([]);
  // };

  return (
    <div style={{ border: '1px solid black', padding: '16px' }}>
      <h2>Order Details</h2>
      <ul>
        {updatedOrderDetails.map((product, index) => (
          <li key={index}>{product.name}</li>
        ))}
      </ul>
      <button onClick={handleCharge}>Charge</button>
    </div>
  );
}

export default Sidebar;
