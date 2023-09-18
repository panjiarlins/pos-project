/* eslint-disable default-param-last */
import { ActionType } from './action';

const transactionReducer = (transaction = [], action) => {
  switch (action.type) {
    case ActionType.SET_TRANSACTION:
      return action.payload.transaction;
    default:
      return transaction;
  }
};

export default transactionReducer;
