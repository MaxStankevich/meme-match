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
  Text,
  Select,
  Checkbox,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import axios from "src/axios";
import BoxWithShadow from "../../components/BoxWithShadow.jsx";
import Sentences from "./sentences/Sentences.jsx";

const MatchForm = () => {
  const toast = useToast();
  const storedValues = JSON.parse(localStorage.getItem("formValues") || "{}");
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      text: storedValues.text || "",
      count: storedValues.count || 3,
      algorithm: storedValues.algorithm || "L2",
      splitBySentences:
        storedValues.splitBySentences !== undefined
          ? storedValues.splitBySentences
          : true,
    },
  });

  const [response, setResponse] = useState("");
  const [models, setModels] = useState([]);
  const [isLoadingModels, setLoadingModels] = useState(false);

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
        JSON.stringify({ text, count, modelId, algorithm, splitBySentences }),
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
      toast({
        title: "Error matching memes",
        description: error.message,
        status: "error",
      });
      setResponse(error.message);
    }
  };

  useEffect(() => {
    setLoadingModels(true);
    axios
      .get("/models")
      .then((rs) => {
        setModels(rs.data);
        if (
          !storedValues.modelId ||
          !rs.data.some((m) => m.id == storedValues.modelId)
        ) {
          setValue("modelId", rs.data[0]?.id);
        } else {
          setValue("modelId", storedValues.modelId);
        }
        setLoadingModels(false);
      })
      .catch((error) => {
        console.error("Error fetching models:", error);
        toast({
          title: "Error fetching models",
          description: error.message,
          status: "error",
        });
        setLoadingModels(false);
      });
  }, [setValue, storedValues.modelId]);

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

        <FormControl isInvalid={errors.modelId}>
          <FormLabel htmlFor="modelId">
            Select model {isLoadingModels && <Spinner size="xs" />}
          </FormLabel>
          <Controller
            name="modelId"
            control={control}
            rules={{ required: "Model selection is required" }}
            render={({ field }) => (
              <Select
                id="modelSelect"
                placeholder="Select model"
                isDisabled={!models.length || isLoadingModels}
                {...field}
              >
                {models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </Select>
            )}
          />
          <FormErrorMessage>
            {errors.modelId && errors.modelId.message}
          </FormErrorMessage>
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
      </VStack>

      {response?.sentences ? (
        <Sentences sentences={response.sentences} />
      ) : (
        <Text>{response}</Text>
      )}
    </BoxWithShadow>
  );
};

export default MatchForm;
