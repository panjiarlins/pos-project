import { configureStore } from '@reduxjs/toolkit';
import isPreloadReducer from './isPreload/reducer';
import authUserReducer from './authUser/reducer';

const store = configureStore({
  reducer: {
    isPreload: isPreloadReducer,
    authUser: authUserReducer,
  },
});

export default store;
