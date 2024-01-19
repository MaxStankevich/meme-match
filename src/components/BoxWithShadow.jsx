import React from "react";
import { Box } from "@chakra-ui/react";

const BoxWithShadow = ({ children, ...props }) => {
  return (
    <Box
      bg="white"
      boxShadow="md"
      borderRadius="xl"
      py={{ base: "4", sm: "8" }}
      px={{ base: "4", sm: "10" }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default BoxWithShadow;
