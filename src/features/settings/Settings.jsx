import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { updateBaseUrl } from "src/axios";
import BoxWithShadow from "src/components/BoxWithShadow.jsx";

const predefinedUrls = [
  "http://localhost:5000/api",
  "http://meme-match.eu-central-1.elasticbeanstalk.com:9090/api",
];

const getInitialUrl = () => localStorage.getItem("apiUrl") || predefinedUrls[0];

const Settings = () => {
  const [selectedUrl, setSelectedUrl] = useState(getInitialUrl);
  const [isCustomUrl, setIsCustomUrl] = useState(
    !predefinedUrls.includes(getInitialUrl()),
  );
  const toast = useToast();

  useEffect(() => {
    updateBaseUrl(selectedUrl);
  }, [selectedUrl]);

  const handleChange = (event) => {
    const url = event.target.value;
    setSelectedUrl(url);
    setIsCustomUrl(!predefinedUrls.includes(url));
  };

  const handleSave = () => {
    localStorage.setItem("apiUrl", selectedUrl);
    updateBaseUrl(selectedUrl);
    toast({ title: "Settings updated", status: "success" });
  };

  return (
    <BoxWithShadow>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel htmlFor="apiUrl">API Url</FormLabel>
          <Select
            id="apiUrl"
            value={isCustomUrl ? "custom" : selectedUrl}
            onChange={handleChange}
          >
            {predefinedUrls.map((url) => (
              <option key={url} value={url}>
                {url}
              </option>
            ))}
            <option value="custom">Custom URL</option>
          </Select>
        </FormControl>

        {isCustomUrl && (
          <FormControl>
            <FormLabel htmlFor="customApiUrl">Custom API Url</FormLabel>
            <Input
              id="customApiUrl"
              value={isCustomUrl ? selectedUrl : ""}
              onChange={(e) => setSelectedUrl(e.target.value)}
            />
          </FormControl>
        )}

        <Button colorScheme="teal" onClick={handleSave}>
          Save URL
        </Button>
      </VStack>
    </BoxWithShadow>
  );
};

export default Settings;
