import React, { useState, useEffect } from "react";
import {
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
  Button,
  Image,
  Box,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const MemeModal = ({ isOpen, onClose, onSave, currentItem }) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [imageUrlPreview, setImageUrlPreview] = useState("");
  const imageUrl = watch("imageUrl");

  useEffect(() => {
    if (currentItem) {
      setValue("name", currentItem.name);
      setValue("labels", currentItem.labels);
      setValue("imageUrl", currentItem.imageUrl);
      setImageUrlPreview(currentItem.imageUrl);
    } else {
      reset();
    }
  }, [currentItem, setValue, reset]);

  useEffect(() => {
    setImageUrlPreview(imageUrl);
  }, [imageUrl]);

  const onSubmit = (data) => {
    onSave(data, currentItem);
    onClose();
  };

  return (
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
            <FormControl mt={4}>
              <FormLabel>Image URL</FormLabel>
              <Input {...register("imageUrl")} />
              {imageUrlPreview && (
                <Box mt={4}>
                  <Image
                    src={imageUrlPreview}
                    alt="Meme preview"
                    maxH="200px"
                    objectFit="contain"
                  />
                </Box>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} type="submit">
              Save
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default MemeModal;
