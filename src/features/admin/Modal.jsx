import React from "react";
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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const MemeModal = ({ isOpen, onClose, onSave, currentItem }) => {
  const { register, handleSubmit, reset, setValue } = useForm();

  React.useEffect(() => {
    if (currentItem) {
      setValue("name", currentItem.name);
      setValue("labels", currentItem.labels);
    } else {
      reset();
    }
  }, [currentItem, setValue, reset]);

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
