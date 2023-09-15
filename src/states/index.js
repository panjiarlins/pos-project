import { configureStore } from '@reduxjs/toolkit';
import isPreloadReducer from './isPreload/reducer';
import authUserReducer from './authUser/reducer';
import categoriesReducer from './categories/reducer';
import productsReducer from './products/reducer';
import usersReducer from './users/reducer';

const store = configureStore({
  reducer: {
    isPreload: isPreloadReducer,
    authUser: authUserReducer,
    categories: categoriesReducer,
    products: productsReducer,
    users: usersReducer,
  },
});

export default store;
