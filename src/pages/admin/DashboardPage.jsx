import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { asyncReceiveProducts } from '../../states/products/action';
import { asyncReceiveCategories } from '../../states/categories/action';
import CategoryList from '../../components/admin/DashboardPage/CategoryList';
import NavbarAdmin from '../../components/admin/NavbarAdmin';

function DashboardPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveCategories());
    dispatch(asyncReceiveProducts());
  }, [dispatch]);

  return (
    <>
      <NavbarAdmin />
      <CategoryList />
    </>
  );
}

export default DashboardPage;
