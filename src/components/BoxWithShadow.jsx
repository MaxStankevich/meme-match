import React from "react";
import { Box } from "@chakra-ui/react";

const BoxWithShadow = ({ children, ...props }) => {
  return (
    <Box
      bg="white"
      boxShadow={{ base: "none", sm: "md" }}
      borderRadius={{ base: "none", sm: "xl" }}
      py={{ base: "0", sm: "8" }}
      px={{ base: "4", sm: "10" }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default BoxWithShadow;
