import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import { updateBaseUrl } from "src/axios";
import BoxWithShadow from "src/components/BoxWithShadow.jsx";

const predefinedUrls = [
  "http://localhost:5000/api",
  "http://meme-match.eu-central-1.elasticbeanstalk.com:9090/api",
];

const Settings = () => {
  const [selectedUrl, setSelectedUrl] = useState(
    localStorage.getItem("apiUrl") || predefinedUrls[0],
  );
  const [isCustomUrl, setIsCustomUrl] = useState(
    !predefinedUrls.includes(localStorage.getItem("apiUrl")),
  );

  useEffect(() => {
    if (!predefinedUrls.includes(selectedUrl)) {
      setIsCustomUrl(true);
    }
  }, [selectedUrl]);

  const handleChange = (event) => {
    const url = event.target.value;
    setSelectedUrl(url);
    setIsCustomUrl(url === "custom");
  };

  const handleSave = () => {
    localStorage.setItem("apiUrl", selectedUrl);
    updateBaseUrl(selectedUrl);
  };

  return (
    <BoxWithShadow>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel htmlFor="apiUrl">API Url</FormLabel>
          <Select id="apiUrl" value={selectedUrl} onChange={handleChange}>
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
              value={selectedUrl === "custom" ? "" : selectedUrl}
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
