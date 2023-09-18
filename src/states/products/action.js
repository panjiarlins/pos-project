import { api } from '../../api';

const ActionType = {
  RECEIVE_PRODUCTS: 'RECEIVE_PRODUCTS',
  GETALL_PRODUCTS: 'GETALL_PRODUCTS',
};

function receiveProductsActionCreator(products) {
  return {
    type: ActionType.RECEIVE_PRODUCTS,
    payload: { products },
  };
}
// function getallProducts(product) {
//   return {
//     type: ActionType.GETALL_PRODUCTS,
//     payload: { product },
//   };
// }

function asyncGetAllProducts() {
  return async (dispatch) => {
    try {
      const { data } = await api.get(`/products`);
      await dispatch(receiveProductsActionCreator(data.data));
    } catch (error) {
      console.log(error);
    }
  };
}

function asyncReceiveProducts({ categoryId, sortBy, orderBy } = {}) {
  // function asyncReceiveProducts() {
  return async (dispatch) => {
    try {
      const categoryIdQuery =
        categoryId && categoryId !== '0' ? `categoryId=${categoryId}` : '';
      const sortByQuery = sortBy ? `sortBy=${sortBy}` : '';
      const orderByQuery = orderBy ? `orderBy=${orderBy}` : '';

      const allQuery = `${categoryIdQuery}&${sortByQuery}&${orderByQuery}`;

      const { data } = await api.get(`/products?${allQuery}`);
      // const { data } = await api.get(`/products`);
      console.log('data asyncReceiveProducts :>> ', data);
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
  asyncGetAllProducts,
};
