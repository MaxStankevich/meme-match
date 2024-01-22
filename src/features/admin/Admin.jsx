import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useDisclosure,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  ButtonGroup,
} from "@chakra-ui/react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

import BoxWithShadow from "src/components/BoxWithShadow.jsx";
import Modal from "./Modal.jsx";

const MyTableComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([
    { name: "Name1", imageUrl: "url1", labels: "a,b,c" },
    { name: "Name2", imageUrl: "url2", labels: "d,e,f" },
  ]);
  const [currentItem, setCurrentItem] = useState(null);

  const handleModalSave = (formData, item) => {
    if (item) {
      setData((currentData) =>
        currentData.map((dataItem) =>
          dataItem.name === item.name ? { ...dataItem, ...formData } : dataItem,
        ),
      );
    } else {
      setData((currentData) => [
        ...currentData,
        { ...formData, imageUrl: "newUrl" },
      ]);
    }
  };

  const handleEdit = (itemName) => {
    const item = data.find((i) => i.name === itemName);
    setCurrentItem(item);
    onOpen();
  };

  const handleAdd = () => {
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
                  <Popover>
                    <PopoverTrigger>
                      <Button
                        colorScheme="red"
                        variant="outline"
                        size="sm"
                        ml={2}
                      >
                        <FiTrash2 />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverHeader>Confirmation</PopoverHeader>
                      <PopoverBody>
                        Are you sure you want to delete this item?
                      </PopoverBody>
                      <PopoverFooter display="flex" justifyContent="flex-end">
                        <ButtonGroup size="sm">
                          <Button
                            variant="outline"
                            colorScheme="red"
                            onClick={() => handleDelete(item.name)}
                          >
                            Yes
                          </Button>
                        </ButtonGroup>
                      </PopoverFooter>
                    </PopoverContent>
                  </Popover>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </BoxWithShadow>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onSave={handleModalSave}
        currentItem={currentItem}
      />
    </>
  );
};

export default MyTableComponent;
