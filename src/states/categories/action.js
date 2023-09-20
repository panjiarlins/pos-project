import { api } from '../../api';

const ActionType = {
  RECEIVE_CATEGORIES: 'RECEIVE_CATEGORIES',
};

function receiveCategoriesActionCreator(categories) {
  return {
    type: ActionType.RECEIVE_CATEGORIES,
    payload: { categories },
  };
}

function asyncReceiveCategories({ name, page, perPage } = {}) {
  return async (dispatch) => {
    const nameQuery = name ? `name=${encodeURIComponent(name)}` : '';
    const pageQuery = page ? `page=${encodeURIComponent(page)}` : '';
    const perPageQuery = perPage
      ? `perPage=${encodeURIComponent(perPage)}`
      : '';
    const allQuery = `${nameQuery}&${pageQuery}&${perPageQuery}`;

    const { data } = await api.get(`/categories?${allQuery}`);
    dispatch(receiveCategoriesActionCreator(data.data));

    return data.info;
  };
}

function asyncCreateCategory(formData) {
  return async () => {
    await api.post('/categories', formData);
  };
}

function asyncEditCategory(categoryId, formData) {
  return async () => {
    await api.patch(`/categories/${categoryId}`, formData);
  };
}

function asyncDeleteCategory(categoryId) {
  return async () => {
    await api.delete(`/categories/${categoryId}`);
  };
}

export {
  ActionType,
  receiveCategoriesActionCreator,
  asyncReceiveCategories,
  asyncCreateCategory,
  asyncEditCategory,
  asyncDeleteCategory,
};
