import { ActionType } from './action';

const initialState = {
  cartItems: [],
};

// eslint-disable-next-line default-param-last
const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ADD_PRODUCT_TO_SIDEBAR:
      return {
        ...state,
        cartItems: action.payload.cartItems,
      };
    default:
      return state;
  }
};

export default sidebarReducer;
