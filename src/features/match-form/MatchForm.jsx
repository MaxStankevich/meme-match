import { useEffect, useState } from "react";
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
  Image,
  Wrap,
  WrapItem,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import BoxWithShadow from "../../components/BoxWithShadow.jsx";

const predefinedUrls = [
  "http://localhost:5000/api/memes/match",
  "http://meme-match.eu-central-1.elasticbeanstalk.com:9090/api/memes/match",
];

const defaultUrl = import.meta.env.PROD ? predefinedUrls[1] : predefinedUrls[0];

const MyForm = () => {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      apiUrl: localStorage.getItem("apiUrl") || defaultUrl,
      count: 3,
    },
  });
  const [response, setResponse] = useState("");
  const [isCustomUrl, setIsCustomUrl] = useState(false);

  const apiUrl = watch("apiUrl");

  useEffect(() => {
    const storedApiUrl = localStorage.getItem("apiUrl");
    if (storedApiUrl) {
      setValue("apiUrl", storedApiUrl);
      setIsCustomUrl(!predefinedUrls.includes(storedApiUrl));
    }
  }, [setValue, predefinedUrls]);

  const handleApiUrlChange = (event) => {
    const selectedApiUrl = event.target.value;
    setIsCustomUrl(
      selectedApiUrl === "custom" || !predefinedUrls.includes(selectedApiUrl),
    );
    localStorage.setItem("apiUrl", selectedApiUrl);
    setValue("apiUrl", selectedApiUrl);
  };

  const onSubmit = async ({ text, count, apiUrl }) => {
    try {
      const responseData = await axios.post(apiUrl, {
        text,
        count,
      });
      setResponse(responseData.data);
      if (isCustomUrl) {
        localStorage.setItem("apiUrl", apiUrl);
      }
    } catch (error) {
      setResponse(error.message);
    }
  };

  return (
    <BoxWithShadow>
      <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
        <FormControl isInvalid={errors.apiUrl}>
          <FormLabel htmlFor="apiUrl">API Url</FormLabel>
          <Select
            id="apiUrl"
            {...register("apiUrl", { required: "API Url is required" })}
            onChange={handleApiUrlChange}
            defaultValue={defaultUrl}
          >
            <option value="http://localhost:5000/api/memes/match">
              http://localhost:5000/api/memes/match
            </option>
            <option value="http://meme-match.eu-central-1.elasticbeanstalk.com:9090/api/memes/match">
              http://meme-match.eu-central-1.elasticbeanstalk.com:9090/api/memes/match
            </option>
            <option value="custom">Custom URL</option>
          </Select>
          <FormErrorMessage>
            {errors.apiUrl && errors.apiUrl.message}
          </FormErrorMessage>
        </FormControl>

        {isCustomUrl && (
          <FormControl isInvalid={errors.apiUrl}>
            <FormLabel htmlFor="customApiUrl">Custom API Url</FormLabel>
            <Input
              id="customApiUrl"
              {...register("apiUrl", {
                required: "Custom API Url is required",
              })}
            />
            <FormErrorMessage>
              {errors.apiUrl && errors.apiUrl.message}
            </FormErrorMessage>
          </FormControl>
        )}

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
                    src={`${new URL(apiUrl === "custom" ? predefinedUrls[0] : apiUrl).origin}/api/memes/${id}/sources/${id}/image`}
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
