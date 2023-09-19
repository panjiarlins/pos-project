import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../../components/cashier/MainPage/sidebar';
import { ProductsCard } from '../../components/cashier/MainPage/Products';
import { asyncTransaction } from '../../states/transaction/action';
import { useValueInput } from '../../hooks';
import { asyncReceiveProducts } from '../../states/products/action';

function MainPage() {
  const authUser = useSelector((states) => states.authUser);
  const dispatch = useDispatch();
  const [voucherCode, handleVoucherCodeChange] = useValueInput('');
  const [variants, setVariants] = useState([]);

  useEffect(() => {
    dispatch(asyncReceiveProducts());
  }, [dispatch]);

  const handleCharge = async () => {
    try {
      await dispatch(
        asyncTransaction({
          userId: authUser.id,
          voucherCode: voucherCode || undefined,
          variants,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <ProductsCard
        {...{
          variants,
          setVariants,
        }}
      />

      <Sidebar
        variants={variants}
        voucherCode={voucherCode}
        handleVoucherCodeChange={handleVoucherCodeChange}
        handleCharge={handleCharge}
      />
    </div>
  );
}

export default MainPage;
