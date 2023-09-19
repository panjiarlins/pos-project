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
// import { useDispatch } from 'react-redux';
// import { asyncTransaction } from '../../../states/transaction/action';
// import { asyncReceiveProducts } from '../../../states/products/action';

function CustomModal({
  isOpen,
  onClose,
  selectedProduct: product,
  variants,
  setVariants,
}) {
  const [selectedVariants, setSelectedVariants] = useState();

  useEffect(() => {
    setSelectedVariants(product?.Variants.map((variant) => ({ ...variant })));
  }, [product, isOpen]);

  const handleAddVariantQuantity = (variantId) => {
    setSelectedVariants(
      selectedVariants?.map((variant) => {
        const newVariant = { ...variant };
        if (newVariant.id === variantId && newVariant.stock - 1 >= 0) {
          newVariant.quantity = newVariant.quantity + 1 || 0;
          return newVariant;
        }
        return newVariant;
      })
    );
  };

  const handleOnSave = () => {
    // get all selected variantId
    const arrSelectedVariantsId = selectedVariants.map(({ id, quantity }) => {
      if (quantity && quantity > 0) return id;
      return null;
    });

    const newVariants = variants.filter(
      (variant) => !arrSelectedVariantsId.includes(variant.variantId)
    );

    selectedVariants.forEach((variant) => {
      if (arrSelectedVariantsId.includes(variant.id)) {
        newVariants.push({
          variantId: variant.id,
          quantity: variant.quantity,
        });
      }
    });

    setVariants(newVariants);

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
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
              {selectedVariants &&
                selectedVariants?.map((variant) => (
                  <Button
                    key={variant.id}
                    size="sm"
                    colorScheme={variant.quantity ? 'red' : 'gray'}
                    onClick={() => handleAddVariantQuantity(variant.id)}
                    width="250px"
                  >
                    {variant.name} ({variant.quantity || 0})
                  </Button>
                ))}
            </Stack>
          </FormControl>
        </ModalBody>

        <ModalFooter display="flex" justifyContent="space-between">
          <Button
            size="sm"
            border="1px solid black"
            colorScheme="red"
            onClick={onClose}
            color="black"
          >
            Close
          </Button>
          <Button
            size="sm"
            variant="solid"
            colorScheme="red"
            color="white"
            onClick={handleOnSave}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CustomModal;
