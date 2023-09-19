/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Image,
  Text,
  Button,
  FormControl,
  FormLabel,
  // Box,
  ModalHeader,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
// import { asyncTransaction } from '../../../states/transaction/action';
import { asyncReceiveProducts } from '../../../states/products/action';

function CustomModal({ isOpen, onClose, product, orderDetails }) {
  // const [selectedVoucher, setSelectedVoucher] = useState(undefined);
  // const [selectedVariants, setSelectedVariants] = useState({});

  // const dispatch = useDispatch();
  // // const authUser = useSelector((state) => state.authUser);

  // useEffect(() => {
  //   const fetchVouchersAndVariants = async () => {
  //     try {
  //       await dispatch(asyncReceiveProducts());
  //       console.log('Async fetch');
  //     } catch (error) {
  //       console.error('Error fetching vouchers and variants:', error);
  //     }
  //   };

  //   fetchVouchersAndVariants();
  // }, [dispatch]);

  // eslint-disable-next-line no-shadow

  const handleTransaction = async () => {
    try {
      const variantQuantities = Object.entries(selectedVariants).map(
        ([variantId, { quantity }]) => ({
          variantId,
          quantity,
        })
      );

      // const productWithVariants = {
      //   ...product,
      //   variants: variantQuantities,
      // };

      orderDetails(variantQuantities);
      // console.log(product, 'product in modal');
      handleModalClose();
    } catch (error) {
      console.log(error);
    }
  };
  const handleVoucherToggle = (voucher) => {
    setSelectedVoucher((prevSelectedVoucher) =>
      prevSelectedVoucher === voucher ? undefined : voucher
    );
  };

  const handleButtonClick = (variantId, quantityType) => {
    setSelectedVariants((prevSelectedVariants) => {
      const updatedVariants = { ...prevSelectedVariants };

      if (!updatedVariants[variantId]) {
        updatedVariants[variantId] = {};
      }

      if (!updatedVariants[variantId][quantityType]) {
        updatedVariants[variantId][quantityType] = 1;
      } else {
        updatedVariants[variantId][quantityType] += 0.5;
      }

      return updatedVariants;
    });
  };

  const handleModalClose = () => {
    setSelectedVoucher(undefined);
    setSelectedVariants({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW="30%">
        <ModalHeader>{product?.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image
            src={product?.image || 'https://placehold.co/600x400'}
            alt={product?.name || ''}
            borderRadius="lg"
          />
          <Stack mt="4" spacing="2">
            <Text>{product?.description}</Text>
          </Stack>
          <FormControl mt="4">
            <FormLabel>Variant | Choose Many</FormLabel>
            <Stack direction="row" spacing={5}>
              {product &&
                product.Variants?.map((variantOption) => (
                  <Button
                    key={variantOption.id}
                    size="sm"
                    colorScheme={
                      selectedVariants[variantOption.id] ? 'red' : 'gray'
                    }
                    onClick={() =>
                      handleButtonClick(variantOption.id, 'quantity')
                    }
                    width="250px"
                  >
                    {variantOption.name} (
                    {selectedVariants[variantOption.id]?.quantity || 0})
                  </Button>
                ))}
            </Stack>
          </FormControl>
          <FormControl mt="4">
            <FormLabel>Voucher</FormLabel>
            <Stack direction="row" spacing={2}>
              {product &&
                product.Vouchers.map((voucher) => (
                  <Button
                    key={voucher.id}
                    onClick={() => handleVoucherToggle(voucher)}
                    colorScheme={selectedVoucher === voucher ? 'red' : 'gray'}
                    width="280px"
                    height="30px"
                    mr={2}
                    mb={2}
                  >
                    {voucher.name}
                  </Button>
                ))}
            </Stack>
          </FormControl>
        </ModalBody>

        <ModalFooter display="flex" justifyContent="space-between">
          <Button
            size="sm"
            border="1px solid black"
            // colorScheme="red"
            onClick={handleModalClose}
            color="black"
          >
            Close
          </Button>
          <Button
            size="sm"
            variant="solid"
            colorScheme="red"
            color="white"
            onClick={handleTransaction}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CustomModal;
