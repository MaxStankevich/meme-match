import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  FormErrorMessage,
  VStack,
  Box,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import BoxWithShadow from "../../components/BoxWithShadow.jsx";

const MyForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      apiUrl: "http://localhost:5000/match",
      count: 3,
    },
  });
  const [responseText, setResponseText] = useState("");

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("text", values.text);
      formData.append("count", values.count);

      const response = await fetch(values.apiUrl, {
        method: "POST",
        body: formData,
      });
      const responseData = await response.text();
      setResponseText(responseData);
    } catch (error) {
      setResponseText(error.message);
    }
  };

  return (
    <BoxWithShadow>
      <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
        <FormControl isInvalid={errors.apiUrl}>
          <FormLabel htmlFor="apiUrl">API Url</FormLabel>
          <Input
            id="apiUrl"
            {...register("apiUrl", { required: "API Url is required" })}
          />
          <FormErrorMessage>
            {errors.apiUrl && errors.apiUrl.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.text}>
          <FormLabel htmlFor="text">Text</FormLabel>
          <Textarea
            id="text"
            {...register("text", { required: "Text is required" })}
          />
          <FormErrorMessage>
            {errors.text && errors.text.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="count">Max Memes Count</FormLabel>
          <NumberInput defaultValue={0}>
            <NumberInputField id="count" {...register("count")} />
          </NumberInput>
        </FormControl>

        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Submit
        </Button>

        {responseText && (
          <Box mt={4}>
            <Text>Response:</Text>
            <Text>{responseText}</Text>
          </Box>
        )}
      </VStack>
    </BoxWithShadow>
  );
};

export default MyForm;
