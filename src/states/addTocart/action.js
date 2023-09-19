// sidebarActions.js

const ActionType = {
  ADD_TO_CART: 'ADD_TO_CART',
};

function addToCartAction(product, variants, voucher) {
  return {
    type: ActionType.ADD_TO_CART,
    payload: {
      product,
      variants,
      voucher,
    },
  };
}

export { ActionType, addToCartAction };
