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
  Box,
  ButtonGroup,
  ModalHeader,
  // Checkbox,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { asyncgetAllVoucher } from '../../../states/voucher/action';
import { asyncgetAllVariant } from '../../../states/variant/action';
import { asyncTransaction } from '../../../states/transaction/action';

function CustomModal({ isOpen, onClose, product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [selectedVariants, setSelectedVariants] = useState([]); // Array to store selected variants
  const dispatch = useDispatch();
  const vouchers = useSelector((state) => state.voucher);
  // const variants = useSelector((state) => state.variants);
  // const products = useSelector((state) => state.products);

  // console.log('variants :> ', variants);

  useEffect(() => {
    const fetchVouchersAndVariants = async () => {
      try {
        await dispatch(asyncgetAllVoucher());
        await dispatch(asyncgetAllVariant());

        console.log('Async fetch vouchers and variants');
      } catch (error) {
        console.error('Error fetching vouchers and variants:', error);
      }
    };

    fetchVouchersAndVariants();
  }, [dispatch]);

  const handleTransaction = async () => {
    try {
      await dispatch(
        asyncTransaction({
          product,
          quantity,
          variant: selectedVariants,
          // addOn,
          voucher: selectedVoucher,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleVoucherToggle = (voucher) => {
    setSelectedVoucher(voucher);
  };

  const handleButtonClick = (variantName) => {
    if (selectedVariants.includes(variantName)) {
      setSelectedVariants(
        selectedVariants.filter((variant) => variant !== variantName)
      );
    } else {
      setSelectedVariants([...selectedVariants, variantName]);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW="40%">
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
            <Text color="blue.600" fontSize="lg">
              Rp{product?.price || 0}
            </Text>
          </Stack>
          <FormControl mt="4">
            <FormLabel>Variant | Choose Many</FormLabel>
            <Stack direction="row" spacing={2}>
              {console.log(product)}
              {product.Variants?.map((variantOption) => (
                <Button
                  key={variantOption.id}
                  size="sm"
                  colorScheme={
                    selectedVariants.includes(variantOption.name)
                      ? 'red'
                      : 'gray'
                  }
                  onClick={() => handleButtonClick(variantOption.name)}
                >
                  {variantOption.name}
                </Button>
              ))}
            </Stack>
          </FormControl>

          <FormControl mt="4">
            <FormLabel>Quantity</FormLabel>
            <ButtonGroup size="sm">
              <Button onClick={handleDecrement}>-</Button>
              <Button>{quantity}</Button>
              <Button onClick={handleIncrement}>+</Button>
            </ButtonGroup>
          </FormControl>
          <Box p="4" bg="white" borderRadius="md" textAlign="center" mt="4">
            <Text>Voucher Discounts:</Text>
            {vouchers.map((voucher) => (
              <Button
                key={voucher.id}
                onClick={() => handleVoucherToggle(voucher)}
                colorScheme={selectedVoucher === voucher ? 'red' : 'gray'}
                size="sm"
                mr={2}
              >
                {voucher.name}
              </Button>
            ))}
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button
            size="sm"
            variant="solid"
            colorScheme="red"
            color="white"
            onClick={handleTransaction}
          >
            Save
          </Button>
          <Button
            size="sm"
            variant="solid"
            colorScheme="red"
            onClick={onClose}
            color="white"
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CustomModal;
