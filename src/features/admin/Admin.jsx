import React, { useState, useEffect } from "react";
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
import axios from "src/axios";

import BoxWithShadow from "src/components/BoxWithShadow.jsx";
import Modal from "./Modal";
import { getMemeImageUrl } from "src/utils";

const Admin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    axios
      .get("/memes")
      .then((response) => {
        setData(response.data.items);
      })
      .catch((error) => {
        console.error("Error fetching memes:", error);
      });
  }, []);

  const handleModalSave = (meme) => {
    setData((currentData) => {
      const index = currentData.findIndex((item) => item.id === meme.id);
      if (index !== -1) {
        return [
          ...currentData.slice(0, index),
          meme,
          ...currentData.slice(index + 1),
        ];
      } else {
        return [...currentData, meme];
      }
    });
  };

  const handleEdit = (id) => {
    const item = data.find((i) => i.id === id);
    setCurrentItem(item);
    onOpen();
  };

  const handleAdd = () => {
    setCurrentItem(null);
    onOpen();
  };

  const handleDelete = (id) => {
    axios
      .delete(`/memes/${id}`)
      .then(() => {
        setData((currentData) => currentData.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
            {data.map((item) => {
              const displayLabels = item.labels.join(", ");
              const displayImageUrl = `${getMemeImageUrl(item)}?${item.imageUpdated ? Math.random() : ""}`;
              return (
                <Tr key={item.id}>
                  <Td>{item.name}</Td>
                  <Td>
                    <Box width="50px" height="50px" overflow="hidden">
                      <Image
                        src={displayImageUrl}
                        alt={`${item.name}`}
                        objectFit="cover"
                        boxSize="100%"
                      />
                    </Box>
                  </Td>
                  <Td>{displayLabels}</Td>
                  <Td>
                    <Flex>
                      <Button
                        colorScheme="blue"
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(item.id)}
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
                          <PopoverFooter
                            display="flex"
                            justifyContent="flex-end"
                          >
                            <ButtonGroup size="sm">
                              <Button
                                variant="outline"
                                colorScheme="red"
                                onClick={() => handleDelete(item.id)}
                              >
                                Yes
                              </Button>
                            </ButtonGroup>
                          </PopoverFooter>
                        </PopoverContent>
                      </Popover>
                    </Flex>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </BoxWithShadow>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          setCurrentItem(null);
          onClose();
        }}
        onSave={handleModalSave}
        currentItem={currentItem}
      />
    </>
  );
};

export default Admin;
