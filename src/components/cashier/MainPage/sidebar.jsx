// import React from 'react';
// import { Box, VStack, Text, Divider } from '@chakra-ui/react';
// import { useSelector } from 'react-redux';

// function OrderDetailSidebar() {
//   const products = useSelector((state) => state.products);
//   const calculateTotal = () =>
//     products.reduce((total, item) => total + item.totalPrice, 0);

//   return (
//     <Box
//       w="300px"
//       h="100vh"
//       p="4"
//       borderRight="1px solid #ccc"
//       boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
//       position="absolute"
//       top="0"
//       right="0"
//     >
//       <VStack spacing="4">
//         <Text fontSize="xl" fontWeight="bold">
//           Order Summary
//         </Text>
//         {products.map((item, index) => (
//           // eslint-disable-next-line react/no-array-index-key
//           <Box key={index} w="100%">
//             <Text fontSize="md">
//               {item.productName} - {item.variant}
//               <Text ml="auto">
//                 {item.quantity} x ${item.unitPrice}
//               </Text>
//             </Text>
//             <Divider />
//           </Box>
//         ))}
//         <Text fontSize="md" fontWeight="bold">
//           Subtotal
//           <Text ml="auto">${calculateTotal()}</Text>
//         </Text>
//       </VStack>
//     </Box>
//   );
// }

// export default OrderDetailSidebar;
