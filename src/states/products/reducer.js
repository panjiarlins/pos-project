import { ActionType } from './action';

function productsReducer(products = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_PRODUCTS:
      return action.payload.products;

    default:
      return products;
  }
}

export default productsReducer;
