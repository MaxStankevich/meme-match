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
  Box,
  Image,
} from "@chakra-ui/react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

import BoxWithShadow from "src/components/BoxWithShadow.jsx";
import Modal from "./Modal.jsx";

const Admin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([
    {
      name: "pepe",
      imageUrl:
        "https://ichef.bbci.co.uk/news/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg",
      labels: "frog, pepe",
    },
    {
      name: "doge",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Original_Doge_meme.jpg/220px-Original_Doge_meme.jpg",
      labels: "dog, doge, pet",
    },
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
      setData((currentData) => [...currentData, { ...formData }]);
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
              <Th>Image</Th>
              <Th>Labels</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr key={item.name}>
                <Td>{item.name}</Td>
                <Td>
                  <Box width="50px" height="50px" overflow="hidden">
                    <Image
                      src={item.imageUrl}
                      alt={`${item.name}`}
                      objectFit="cover"
                      boxSize="100%"
                    />
                  </Box>
                </Td>
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

export default Admin;
