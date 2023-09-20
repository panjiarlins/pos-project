import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetAllTransaction } from '../../../states/transaction/action';

function SalesReport() {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transaction);
  const [salesData, setSalesData] = useState([]);
  console.log(transactions, 'tes');
  console.log(salesData);

  useEffect(() => {
    dispatch(asyncGetAllTransaction());
  }, [dispatch]);

  useEffect(() => {
    if (transactions && transactions.length > 0) {
      console.log('Transactions from Redux:', transactions);
      setSalesData(transactions);
    }
  }, [transactions]);

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>User ID</Th>
          <Th>Total</Th>
          <Th>Total With Discount</Th>
        </Tr>
      </Thead>
      <Tbody>
        {salesData.map((transaction) => (
          <Tr key={transaction.id}>
            <Td>{transaction.userId}</Td>
            <Td>${transaction.total}</Td>
            <Td>${transaction.totalWithDiscount}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default SalesReport;
