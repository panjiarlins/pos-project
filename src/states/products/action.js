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

function asyncReceiveProducts({ name, categoryId, sortBy, orderBy } = {}) {
  return async (dispatch) => {
    try {
      const nameQuery = name ? `name=${name}` : '';
      const categoryIdQuery =
        categoryId && categoryId !== '0' ? `categoryId=${categoryId}` : '';
      const sortByQuery = sortBy ? `sortBy=${sortBy}` : '';
      const orderByQuery = orderBy ? `orderBy=${orderBy}` : '';
      const allQuery = `${nameQuery}&${categoryIdQuery}&${sortByQuery}&${orderByQuery}`;

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

function asyncEditProduct(productId, formData) {
  return async () => {
    try {
      await api.patch(`/products/${productId}`, formData);
    } catch (error) {
      console.log(error);
    }
  };
}

function asyncDeleteProduct(productId) {
  return async () => {
    try {
      await api.delete(`/products/${productId}`);
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
  asyncEditProduct,
  asyncDeleteProduct,
};
