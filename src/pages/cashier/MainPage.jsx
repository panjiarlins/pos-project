import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ProductsCard } from '../../components/cashier/MainPage/Products';
import { asyncReceiveProducts } from '../../states/products/action';
// import OrderDetailSidebar from '../../components/cashier/MainPage/sidebar';

function MainPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    // const fetchProducts = () => {
    //   try {
    //     dispatch(asyncReceiveProducts());
    //     console.log('asyncReceiveProducts fired');
    //   } catch (error) {
    //     console.error('Error fetching products:', error);
    //   }
    // };

    // fetchProducts();
    console.log('test');
    dispatch(asyncReceiveProducts());
  }, []);

  return (
    <div>
      {console.log('test2')}
      <ProductsCard />
      {/* <OrderDetailSidebar /> */}
    </div>
  );
}

export default MainPage;
