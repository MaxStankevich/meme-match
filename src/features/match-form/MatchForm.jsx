import { useState, useEffect } from "react";
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
  Checkbox,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import axios from "src/axios";
import BoxWithShadow from "../../components/BoxWithShadow.jsx";
import { getMemeImageUrl } from "../../utils/index.js";

const MatchForm = () => {
  const storedValues = JSON.parse(localStorage.getItem("formValues") || "{}");
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      text: "",
      count: storedValues.count || 3,
      modelId: storedValues.modelId || "",
      algorithm: storedValues.algorithm || "L2",
      splitBySentences:
        storedValues.splitBySentences !== undefined
          ? storedValues.splitBySentences
          : true,
    },
  });

  const [response, setResponse] = useState("");
  const [models, setModels] = useState([]);

  const onSubmit = async ({
    text,
    count,
    modelId,
    algorithm,
    splitBySentences,
  }) => {
    try {
      localStorage.setItem(
        "formValues",
        JSON.stringify({ count, modelId, algorithm, splitBySentences }),
      );

      const responseData = await axios.post(
        `/memes/match?modelId=${modelId}&split=${splitBySentences}&algorithm=${algorithm}`,
        {
          text,
          count,
        },
      );
      setResponse(responseData.data);
    } catch (error) {
      setResponse(error.message);
    }
  };

  useEffect(() => {
    axios
      .get("/models")
      .then((rs) => {
        setModels(rs.data);
        if (
          !storedValues.modelId ||
          !rs.data.some((m) => m.id == storedValues.modelId)
        ) {
          setValue("modelId", rs.data[0]?.id);
        }
      })
      .catch((error) => {
        console.error("Error fetching models:", error);
      });
  }, []);

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
          <NumberInput>
            <NumberInputField id="count" {...register("count")} />
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="modelId">Select model</FormLabel>
          <Controller
            name="modelId"
            control={control}
            render={({ field }) => (
              <Select id="modelSelect" placeholder="Select model" {...field}>
                {models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="algo">Select matching algorithm</FormLabel>
          <Controller
            name="algorithm"
            control={control}
            render={({ field }) => (
              <Select id="algoSelect" placeholder="Select algorithm" {...field}>
                <option value="L2">L2</option>
                <option value="COSINE">Cosine</option>
              </Select>
            )}
          />
        </FormControl>

        <FormControl>
          <Controller
            name="splitBySentences"
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Checkbox
                ref={ref}
                isChecked={value}
                onChange={onChange}
                onBlur={onBlur}
              >
                Match by sentences
              </Checkbox>
            )}
          />
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
              {response.sentences.map((sentence, index) => (
                <SimpleGrid
                  key={index}
                  columns={2}
                  spacingX="40px"
                  spacingY="20px"
                >
                  <Box mt={4}>
                    <Text>{sentence.sentence}</Text>
                  </Box>
                  {sentence.matches.map((match) => (
                    <Box key={match.meme.id} mt={4}>
                      <Wrap spacing="20px">
                        <Image
                          boxSize="150px"
                          src={getMemeImageUrl(match.meme)}
                          alt={match.meme.id}
                        />
                        <Box>{match.score}/5</Box>
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

export default MatchForm;
