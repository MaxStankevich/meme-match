import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import BoxWithShadow from "../../components/BoxWithShadow.jsx";

const MyTableComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [data, setData] = useState([
    { name: "Name1", imageUrl: "url1", labels: "a,b,c" },
    { name: "Name2", imageUrl: "url2", labels: "d,e,f" },
  ]);
  const [currentItem, setCurrentItem] = useState(null);

  const onSubmit = (data) => {
    if (currentItem) {
      setData((currentData) =>
        currentData.map((item) =>
          item.name === currentItem ? { ...item, ...data } : item,
        ),
      );
    } else {
      setData((currentData) => [
        ...currentData,
        { ...data, imageUrl: "newUrl" },
      ]);
    }
    onClose();
  };

  const handleEdit = (itemName) => {
    const item = data.find((i) => i.name === itemName);
    if (item) {
      setValue("name", item.name);
      setValue("labels", item.labels);
      setCurrentItem(itemName);
      onOpen();
    }
  };

  const handleAdd = () => {
    reset();
    setCurrentItem(null);
    onOpen();
  };

  const handleDelete = (itemName) => {
    setData((currentData) =>
      currentData.filter((item) => item.name !== itemName),
    );
  };

  return (
    <>
      <BoxWithShadow>
        <Flex justifyContent="end" mb="10px">
          <Button colorScheme="teal" onClick={handleAdd}>
            Add Meme
          </Button>
        </Flex>
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Image URL</Th>
              <Th>Labels</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr key={item.name}>
                <Td>{item.name}</Td>
                <Td>{item.imageUrl}</Td>
                <Td>{item.labels}</Td>
                <Td>
                  <Button
                    colorScheme="blue"
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(item.name)}
                  >
                    <FiEdit />
                  </Button>
                  <Button
                    colorScheme="red"
                    variant="outline"
                    size="sm"
                    ml={2}
                    onClick={() => handleDelete(item.name)}
                  >
                    <FiTrash2 />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </BoxWithShadow>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>{currentItem ? "Edit Meme" : "New Meme"}</ModalHeader>
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input {...register("name", { required: true })} />
              </FormControl>
              <FormControl isRequired mt={4}>
                <FormLabel>Labels</FormLabel>
                <Textarea {...register("labels", { required: true })} />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button mr={3} type="submit">
                Save
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  reset();
                  onClose();
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MyTableComponent;
