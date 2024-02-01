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
import axios from "src/axios";
import { getMemeImageUrl } from "../../utils/index.js";

const MemeModal = ({ isOpen, onClose, onSave, currentItem }) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const watchedImage = watch("image");

  useEffect(() => {
    if (currentItem) {
      setValue("name", currentItem.name);
      setValue("labels", currentItem.labels.join(", "));
      setImagePreview(getMemeImageUrl(currentItem));
    } else {
      reset();
      setImagePreview("");
    }
  }, [currentItem, setValue, reset]);

  useEffect(() => {
    if (watchedImage && watchedImage.length > 0) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      fileReader.readAsDataURL(watchedImage[0]);
    }
  }, [watchedImage]);

  const handleClose = () => {
    reset();
    setImagePreview("");
    onClose();
  };

  const onSubmit = async (memeData) => {
    setIsSubmitting(true);
    let response;
    let imageData = {};

    try {
      if (currentItem) {
        response = await axios.put(`/memes/${currentItem.id}`, {
          ...memeData,
          id: currentItem.id,
          labels: memeData.labels.split(",").map((label) => label.trim()),
        });
      } else {
        response = await axios.post("/memes", {
          ...memeData,
          labels: memeData.labels.split(",").map((label) => label.trim()),
        });
      }

      if (memeData.image[0] && response.data.id) {
        const formData = new FormData();
        formData.append("image", memeData.image[0]);

        const newImage = await axios[currentItem ? "put" : "post"](
          currentItem && currentItem.sources?.length
            ? `/memes/${response.data.id}/sources/${currentItem.sources[0]?.id}/image?type=S3`
            : `/memes/${response.data.id}/sources/image?type=S3`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        imageData = {
          sources: [newImage.data],
          imageUpdated: true,
        };
      }

      onSave({
        ...response.data,
        ...imageData,
      });
    } catch (error) {
      console.error("Error processing meme:", error);
    }

    setIsSubmitting(false);
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
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
              <Textarea rows={6} {...register("labels", { required: true })} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Image</FormLabel>
              <Input type="file" {...register("image")} />
              {imagePreview && (
                <Box mt={4}>
                  <Image
                    src={imagePreview}
                    alt="Meme preview"
                    maxH="200px"
                    objectFit="contain"
                  />
                </Box>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button isLoading={isSubmitting} mr={3} type="submit">
              Save
            </Button>
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default MemeModal;
