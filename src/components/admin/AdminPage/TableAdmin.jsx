/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Switch,
  IconButton,
  ButtonGroup,
  Avatar,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncGetAllUser,
  asyncDeleteUser,
  asyncEditUser,
} from '../../../states/users/action';
import RegisterAdminModal from './NewAdmin';

function TableAdmin() {
  const dispatch = useDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedRole, setSelectedRole] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const data = useSelector((state) => state.users);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    dispatch(asyncGetAllUser());
  }, [dispatch]);

  const filterDataByRole = () => {
    if (selectedRole === '') {
      setFilteredData(data);
    } else {
      const filteredUsers = data.filter(
        (user) => user.isAdmin === (selectedRole === 'admin')
      );
      setFilteredData(filteredUsers);
    }
    setCurrentPage(1);
  };

  useEffect(() => {
    filterDataByRole();
  }, [selectedRole, data]);

  const handleEditUser = (userId) => {
    setSelectedUserId(userId);
    setIsEditModalOpen(true);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setEditedUserData({ ...editedUserData, image: file });
      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);
    }
  };
  const handleToggleStatus = async (userId, isActive) => {
    try {
      const updatedUserData = {
        isActive: !isActive,
      };
      await dispatch(asyncEditUser(userId, updatedUserData));
      dispatch(asyncGetAllUser());
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteUser = async (userId) => {
    try {
      await dispatch(asyncDeleteUser(userId));
      dispatch(asyncGetAllUser());
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const formdata = new FormData();
      formdata.append('username', editedUserData.username);
      formdata.append('fullname', editedUserData.fullname);

      formdata.append('email', editedUserData.email);
      formdata.append('image', editedUserData.image);
      await dispatch(asyncEditUser(selectedUserId, editedUserData));
      setIsEditModalOpen(false);
      dispatch(asyncGetAllUser());
    } catch (error) {
      console.log(error);
    }
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Box>
      <Flex justify="space-between" alignItems="center" mb="4">
        <Text fontSize="2xl" fontWeight="bold">
          Admin
        </Text>
        <Button
          margin={2}
          bg="#B42318"
          color="white"
          _hover={{ bg: '#B42318' }}
          onClick={() => setIsRegisterModalOpen(true)}
        >
          + Admin
        </Button>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Role</Th>
            <Th>Email</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentData.map((user, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Tr key={index}>
              <Td>
                <Flex align="center">
                  <Avatar size="sm" src={user.image} mr="2" />
                  <Text>{user.fullname}</Text>
                </Flex>
              </Td>
              <Td>{user.isAdmin ? 'Admin' : 'Cashier'}</Td>
              <Td>{user.email}</Td>
              <Td>
                <Switch
                  colorScheme="teal"
                  isChecked={user.isActive}
                  onChange={() => handleToggleStatus(user.id, user.isActive)}
                />
              </Td>
              <Td>
                <ButtonGroup size="sm" spacing={2}>
                  <IconButton
                    colorScheme="blue"
                    aria-label="Edit"
                    icon={<EditIcon />}
                    onClick={() => handleEditUser(user.id)}
                  />
                  <IconButton
                    colorScheme="red"
                    aria-label="Delete"
                    icon={<DeleteIcon />}
                    onClick={() => handleDeleteUser(user.id)}
                  />
                </ButtonGroup>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <RegisterAdminModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />

      <Flex justify="center" mt="4">
        {data.length > itemsPerPage && (
          <ButtonGroup spacing={2}>
            {Array(Math.ceil(data.length / itemsPerPage))
              .fill()
              .map((_, index) => (
                <Button
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  onClick={() => paginate(index + 1)}
                  colorScheme={currentPage === index + 1 ? 'gray' : 'red'}
                >
                  {index + 1}
                </Button>
              ))}
          </ButtonGroup>
        )}
      </Flex>

      {/* Modal untuk edit user */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection="column" alignItems="center">
              <label htmlFor="file-input">
                <Avatar
                  size="xl"
                  src={imagePreview || editedUserData.image}
                  mb="4"
                  cursor="pointer"
                  _hover={{ opacity: 0.8 }}
                />
              </label>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <FormControl>
                <FormLabel>Fullname</FormLabel>
                <Input
                  type="text"
                  name="fullname"
                  value={editedUserData.fullname}
                  onChange={(e) =>
                    setEditedUserData({
                      ...editedUserData,
                      fullname: e.target.value,
                    })
                  }
                />
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  name="username"
                  value={editedUserData.username}
                  onChange={(e) =>
                    setEditedUserData({
                      ...editedUserData,
                      username: e.target.value,
                    })
                  }
                />
                <FormLabel>Email</FormLabel>
                <Input
                  type="text"
                  name="email"
                  value={editedUserData.email}
                  onChange={(e) =>
                    setEditedUserData({
                      ...editedUserData,
                      email: e.target.value,
                    })
                  }
                />
              </FormControl>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleSubmit}>
              Simpan
            </Button>
            <Button variant="ghost" onClick={() => setIsEditModalOpen(false)}>
              Tutup
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default TableAdmin;
