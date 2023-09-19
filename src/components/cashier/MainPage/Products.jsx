import {
  Grid,
  Card,
  CardBody,
  Divider,
  Stack,
  Image,
  Heading,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveProducts } from '../../../states/products/action';
import CustomModal from './modalVariants';
import ProductItem from './ProductItem';

export function ProductsCard() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSmallScreen] = useMediaQuery('(max-width: 768px)');
  const [orderDetails, setOrderDetails] = useState([]);

  const addToOrderDetails = (product) => {
    const existingProductIndex = orderDetails.findIndex(
      (p) => p.id === product.id
    );

    if (existingProductIndex !== -1) {
      const updatedOrderDetails = [...orderDetails];

      updatedOrderDetails[existingProductIndex].quantity += 1;

      setOrderDetails(updatedOrderDetails);
      console.log(
        updatedOrderDetails,
        'updatedOrderDetails in component products123'
      );
    } else {
      const updatedOrderDetails = [
        ...orderDetails,
        { ...product, quantity: 1 },
      ];

      setOrderDetails(updatedOrderDetails);
    }
    console.log(product, ' data products in component product');
  };

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    addToOrderDetails(product);
  };

  useEffect(() => {
    dispatch(asyncReceiveProducts());
  }, [dispatch]);

  const getGridTemplateColumns = () => {
    if (isSmallScreen) {
      return 'repeat(1, 1fr)';
    }
    return 'repeat(3, 1fr)';
  };

  return (
    <>
      <Grid templateColumns={getGridTemplateColumns()} maxWidth="1200x">
        {products.map((product) => (
          <ProductItem key={product.id} />
        ))}
      </Grid>
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        orderDetails={addToOrderDetails}
      />
    </>
  );
}
