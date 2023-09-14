import { Flex, Heading, Input, Button, Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import useValueInput from '../../hooks/useValueInput';
import { asyncSetAuthUser } from '../../states/authUser/action';

function LoginPageCashier() {
  const [username, handleUsernameChange] = useValueInput();
  const [password, handlePasswordChange] = useValueInput();
  const dispacth = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispacth(asyncSetAuthUser({ username, password }));
  };
  return (
    <Flex
      h="100vh"
      // w="100vw"
      // className="w-full aspect-auto"
      alignItems="center"
      justifyContent="center"
      backgroundImage=" https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      backgroundSize="cover"
      position="relative"
    >
      <Flex flexDirection="column" p={12} borderRadius={8} bg="#FFFF">
        <Heading mb={6} textAlign="center" color="#B42318">
          <Text>Pizza</Text>
          <Text>Pizzazz</Text>
        </Heading>
        <Input
          placeholder="Username"
          color="gray.500"
          mb={3}
          onChange={handleUsernameChange}
        />
        <Input
          placeholder="Password"
          type="password"
          color="gray.500"
          mb={6}
          onChange={handlePasswordChange}
        />
        <Button bgColor="#B42318" color="white" mb={5} onClick={handleSubmit}>
          Log In
        </Button>
      </Flex>
    </Flex>
  );
}

export default LoginPageCashier;
