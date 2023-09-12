import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { asyncPreloadProcess } from './states/isPreload/action';
import LoginPageAdmin from './pages/admin/LoginPageAdmin';
import DashboardPage from './pages/admin/DashboardPage';
import AdminPage from './pages/admin/AdminPage';
import LoginPageCashier from './pages/cashier/LoginPageCashier';
import CategoryPage from './pages/admin/CategoryPage';
import ReportPageAdmin from './pages/admin/ReportPageAdmin';
import MainPage from './pages/cashier/MainPage';
import ReportPageCashier from './pages/cashier/ReportPageCashier';

function App() {
  const authUser = useSelector((states) => states.authUser);
  const isPreload = useSelector((states) => states.isPreload);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <Routes>
        <Route path="/admin-login" element={<LoginPageAdmin />} />
        <Route path="/cashier-login" element={<LoginPageCashier />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {authUser.isAdmin &&
        (() => (
          <>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/categories" element={<CategoryPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/products" element={<DashboardPage />} />
            <Route path="/admin-report" element={<ReportPageAdmin />} />
          </>
        ))()}
      {authUser.isCashier &&
        (() => (
          <>
            <Route path="/main" element={<MainPage />} />
            <Route path="/cashier-report" element={<ReportPageCashier />} />
          </>
        ))()}
    </Routes>
  );
}

export default App;
