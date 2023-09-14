import { configureStore } from '@reduxjs/toolkit';
import isPreloadReducer from './isPreload/reducer';
import authUserReducer from './authUser/reducer';
import categoriesReducer from './categories/reducer';
import productsReducer from './products/reducer';

const store = configureStore({
  reducer: {
    isPreload: isPreloadReducer,
    authUser: authUserReducer,
    categories: categoriesReducer,
    products: productsReducer,
  },
});

export default store;
