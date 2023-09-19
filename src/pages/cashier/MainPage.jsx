import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../../components/cashier/MainPage/sidebar';
import { ProductsCard } from '../../components/cashier/MainPage/Products';
import { asyncTransaction } from '../../states/transaction/action';

function MainPage() {
  const authUser = useSelector((states) => states.authUser);
  const products = useSelector((state) => state.products);

  const [selectedVariants] = useState({});
  const [selectedVoucher] = useState(undefined);

  const dispatch = useDispatch();

  const handleCharge = async () => {
    try {
      const variantQuantities = Object.entries(selectedVariants).map(
        ([variantId, { quantity }]) => ({
          variantId,
          quantity,
        })
      );
      const voucherCode = selectedVoucher?.code || undefined;
      await dispatch(
        asyncTransaction({
          userId: authUser.id,
          voucherCode,
          variants: variantQuantities,
        })
      );
    } catch (error) {
      console.log(error);
    }

    setUpdatedOrderDetails([]);
  };

  // const [orderDetails, setOrderDetails] = useState([]);

  // const addToOrderDetails = (product) => {
  //   setOrderDetails([...orderDetails, product]);
  //   console.log(product, 'product in main pages');
  //   console.log(orderDetails, 'orderDetails in main pages');
  // };

  useEffect(() => {
    console.log(1, orderDetails);
  }, [orderDetails]);

  return (
    <div style={{ display: 'flex' }}>
      <ProductsCard />
      <Sidebar orderDetails={orderDetails} />
    </div>
  );
}

export default MainPage;
