import {useEffect, useState} from "react";
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
  SimpleGrid,
  Select,
  Checkbox
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios, { getBaseUrl } from "src/axios";
import BoxWithShadow from "../../components/BoxWithShadow.jsx";
import { getMemeImageUrl } from "../../utils/index.js";

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
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState([]);
  const [splitBySentences, setSplitBySentences] = useState(true)

  const onSubmit = async ({ text, count }) => {
    try {
      const responseData = await axios.post(`/memes/match?modelId=${selectedModel}&split=${splitBySentences}`, {
        text,
        count,
      });
      setResponse(responseData.data);
    } catch (error) {
      setResponse(error.message);
    }
  };

  const handleModelChange = (event) => {
    const modelId = event.target.value;
    setSelectedModel(modelId);
  };

  const handleCheckboxChange = (event) => {
    const split = event.target.checked;
    setSplitBySentences(split)
  };

  useEffect(() => {
    axios.get("/models")
        .then((rs) => {
          setModels(rs.data)
        })
        .catch((error) => {
          console.error("Error fetching models:", error);
        })
  }, [])

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

        <FormControl>
          <FormLabel htmlFor="model">Select model</FormLabel>
          <Select
              id="modelSelect"
              placeholder="Select model"
              onChange={handleModelChange}
          >
            {models.map((model) => (
              <option key={model.id} value={model.id}>{model.name}</option>
              )
            )}
          </Select>
        </FormControl>

        <FormControl>
          <Checkbox
              defaultChecked
              onChange={handleCheckboxChange}
          >Match by sentences</Checkbox>
        </FormControl>

        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Submit
        </Button>

        {response?.sentences ? (
            <Box mt={4}>
              <Wrap spacing="20px">
                  {response?.sentences?.map((sentence) => (
                      <SimpleGrid columns={2} spacingX='40px' spacingY='20px'>
                        <Box mt={4}>
                          <Text>{sentence.sentence}</Text>
                        </Box>
                        <br/>
                        {sentence?.memes?.map((meme) => (
                            <Box mt={4}>
                              <Wrap spacing="20px">
                                <Image
                                    key={meme.id}
                                    boxSize="150px"
                                    src={getMemeImageUrl(meme)}
                                    alt={meme.id}
                                />
                              </Wrap>
                            </Box>
                        ))}
                      </SimpleGrid>
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
