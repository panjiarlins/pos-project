import { api } from '../../api';

const ActionType = {
  RECEIVE_PRODUCTS: 'RECEIVE_PRODUCTS',
};

function receiveProductsActionCreator(products) {
  return {
    type: ActionType.RECEIVE_PRODUCTS,
    payload: { products },
  };
}

function asyncReceiveProducts({ categoryId, sortBy, orderBy } = {}) {
  return async (dispatch) => {
    try {
      const categoryIdQuery = categoryId ? `categoryId=${categoryId}` : '';
      const sortByQuery = sortBy ? `sortBy=${sortBy}` : '';
      const orderByQuery = orderBy ? `orderBy=${orderBy}` : '';

      const allQuery = `${categoryIdQuery}&${sortByQuery}&${orderByQuery}`;

      const { data } = await api.get(`/products?${allQuery}`);
      dispatch(receiveProductsActionCreator(data.data));
    } catch (error) {
      console.log(error);
    }
  };
}

function asyncCreateProduct(formData) {
  return async () => {
    try {
      await api.post('/products', formData);
    } catch (error) {
      console.log(error);
    }
  };
}

export {
  ActionType,
  receiveProductsActionCreator,
  asyncReceiveProducts,
  asyncCreateProduct,
};
