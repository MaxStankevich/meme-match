import { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Textarea,
  NumberInput,
  NumberInputField,
  FormErrorMessage,
  VStack,
  Box,
  Text,
  Image,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios, { getBaseUrl } from "src/axios";
import BoxWithShadow from "../../components/BoxWithShadow.jsx";

const MyForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      count: 3,
    },
  });
  const [response, setResponse] = useState("");

  const onSubmit = async ({ text, count }) => {
    try {
      const responseData = await axios.post("/memes/match", {
        text,
        count,
      });
      setResponse(responseData.data);
    } catch (error) {
      setResponse(error.message);
    }
  };

  return (
    <BoxWithShadow>
      <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
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

        {response?.memes ? (
          <Box mt={4}>
            <Wrap spacing="20px">
              {response?.memes?.map((id) => (
                <WrapItem key={id}>
                  <Image
                    key={id}
                    boxSize="150px"
                    src={`${getBaseUrl()}/memes/${id}/sources/${id}/image`}
                    alt={id}
                  />
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        ) : (
          <Text>{response}</Text>
        )}
      </VStack>
    </BoxWithShadow>
  );
};

export default MyForm;
