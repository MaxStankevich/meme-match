import React from "react";
import { Box } from "@chakra-ui/react";
import BackgroundLine from "./BackgroundLine";
import "./BackgroundLine.css";

const MainBackground = () => {
  const lines = Array.from({ length: 20 }, (_, index) => ({
    direction: index % 2 === 0 ? "moveRight" : "moveLeft",
    speed: 50,
  }));

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      width="100vw"
      height="100vh"
      overflow="hidden"
      zIndex={-1}
    >
      {lines.map((line, index) => (
        <BackgroundLine key={index} {...line} />
      ))}
    </Box>
  );
};

export default MainBackground;
