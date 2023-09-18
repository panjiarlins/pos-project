import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ProductsCard } from '../../components/cashier/MainPage/Products';
import { asyncReceiveProducts } from '../../states/products/action';
import { asyncReceiveCategories } from '../../states/categories/action';
// import OrderDetailSidebar from '../../components/cashier/MainPage/sidebar';

function MainPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveCategories());
    dispatch(asyncReceiveProducts());
  }, [dispatch]);

  return (
    <div>
      {console.log('test2')}
      <ProductsCard />
      {/* <OrderDetailSidebar /> */}
    </div>
  );
}

export default MainPage;
