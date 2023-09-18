import {
  Grid,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Stack,
  Image,
  Heading,
  Text,
  // eslint-disable-next-line no-unused-vars
  ButtonGroup,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  // asyncGetAllProducts,
  asyncReceiveProducts,
} from '../../../states/products/action';
import CustomModal from './modalVariants';

export function ProductsCard() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  useEffect(() => {
    // const fetchProducts = () => {
    //   try {
    //     dispatch(asyncReceiveProducts());
    //     console.log('asyncReceiveProducts fired');
    //   } catch (error) {
    //     console.error('Error fetching products:', error);
    //   }
    // };

    // fetchProducts();

    dispatch(asyncReceiveProducts());
  }, [dispatch]);

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap="4" maxWidth="1200px">
      {console.log('1', products)}
      {products.map((product, index) => (
        <Card
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          maxW="300px"
          borderWidth="1px"
          borderRadius="lg"
          m="2"
          cursor="pointer"
          onClick={() => handleCardClick(product)}
        >
          <CardBody p="2">
            <Image
              src={
                // product?.image ||
                'https://placehold.co/600x400'
              }
              alt={product?.name || ''}
              borderRadius="lg"
            />
            <Stack mt="4" spacing="2">
              <Heading size="sm">{product?.name}</Heading>
              <Text fontSize="sm">{product?.description}</Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter />
        </Card>
      ))}
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
      />
    </Grid>
  );
}
