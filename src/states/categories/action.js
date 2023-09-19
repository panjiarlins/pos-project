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

function asyncReceiveCategories({ name } = {}) {
  return async (dispatch) => {
    const nameQuery = name ? `name=${name}` : '';
    const allQuery = `${nameQuery}`;

    const { data } = await api.get(`/categories?${allQuery}`);
    dispatch(receiveCategoriesActionCreator(data.data));
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
