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

function asyncReceiveCategories() {
  return async (dispatch) => {
    try {
      const { data } = await api.get(`/categories`);
      dispatch(receiveCategoriesActionCreator(data.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export { ActionType, receiveCategoriesActionCreator, asyncReceiveCategories };
