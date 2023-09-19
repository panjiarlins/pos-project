import { configureStore } from '@reduxjs/toolkit';
import isPreloadReducer from './isPreload/reducer';
import authUserReducer from './authUser/reducer';
import categoriesReducer from './categories/reducer';
import productsReducer from './products/reducer';
import usersReducer from './users/reducer';
import transactionReducer from './transaction/reducer';
import voucherReducers from './voucher/reducers';
import variantReducers from './variant/reducers';
import cartReducer from './addTocart/reducers';

const store = configureStore({
  reducer: {
    isPreload: isPreloadReducer,
    authUser: authUserReducer,
    categories: categoriesReducer,
    products: productsReducer,
    users: usersReducer,
    transaction: transactionReducer,
    voucher: voucherReducers,
    variants: variantReducers,
    addtocart: cartReducer,
  },
});

export default store;
