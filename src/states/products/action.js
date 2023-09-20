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

function asyncGetAllProducts() {
  return async (dispatch) => {
    try {
      const { data } = await api.get('/products');
      await dispatch(receiveProductsActionCreator(data.data));
    } catch (error) {
      console.log(error);
    }
  };
}

function asyncReceiveProducts({
  name,
  categoryId,
  sortBy,
  orderBy,
  page,
  perPage,
} = {}) {
  return async (dispatch) => {
    const nameQuery = name ? `name=${encodeURIComponent(name)}` : '';
    const categoryIdQuery =
      categoryId && categoryId !== '0'
        ? `categoryId=${encodeURIComponent(categoryId)}`
        : '';
    const sortByQuery = sortBy ? `sortBy=${encodeURIComponent(sortBy)}` : '';
    const orderByQuery = orderBy
      ? `orderBy=${encodeURIComponent(orderBy)}`
      : '';
    const pageQuery = page ? `page=${encodeURIComponent(page)}` : '';
    const perPageQuery = perPage
      ? `perPage=${encodeURIComponent(perPage)}`
      : '';
    const allQuery = `${nameQuery}&${categoryIdQuery}&${sortByQuery}&${orderByQuery}&${pageQuery}&${perPageQuery}`;

    const { data } = await api.get(`/products?${allQuery}`);
    dispatch(receiveProductsActionCreator(data.data));

    return data.info;
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

function asyncEditProduct({ productId, formData }) {
  return async () => {
    await api.patch(`/products/${productId}`, formData);
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
  asyncGetAllProducts,
};
