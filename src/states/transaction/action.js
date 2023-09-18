import { api } from '../../api';

const ActionType = {
  SET_TRANSACTION: 'SET_TRANSACTION',
};
function setTransactionData(transactionData) {
  return {
    type: ActionType.SET_TRANSACTION,
    payload: {
      transactionData,
    },
  };
}

function asyncTransaction(transactionData) {
  return async (dispatch) => {
    try {
      console.log('Sending transaction data:', transactionData);
      const response = await api.post('/transaction', transactionData);
      console.log('Transaction successful. Response:', response.data.data);

      dispatch(setTransactionData(response.data.data));
    } catch (error) {
      console.error('Error during transaction:', error);
    }
  };
}

export { ActionType, asyncTransaction };
