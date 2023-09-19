import {
  Card,
  CardBody,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';

function ProductItem({ product }) {
  return (
    <Card
      // eslint-disable-next-line react/no-array-index-key
      //   key={index}
      maxW="320px"
      borderWidth="1px"
      borderRadius="lg"
      m="2"
      cursor="pointer"
      onClick={() => {
        handleCardClick(product);
      }}
    >
      <CardBody p="2">
        <Image
          src="https://placehold.co/600x400"
          alt={product?.name || ''}
          borderRadius="lg"
        />
        <Stack mt="4" spacing="2">
          <Heading size="sm">{product?.name}</Heading>
          <Text fontSize="sm">{product?.description}</Text>
        </Stack>
      </CardBody>
      <Divider />
    </Card>
  );
}

export default ProductItem;
