import React from "react";
import { VStack } from "@chakra-ui/react";
import BackgroundLine from "./BackgroundLine";
import "./BackgroundLine.css";

const MainBackground = () => {
  const lines = Array.from({ length: 10 }, (_, index) => ({
    direction: index % 2 === 0 ? "moveRight" : "moveLeft",
    speed: 50,
  }));

  return (
    <VStack
      spacing="10px"
      position="absolute"
      top="0"
      left="0"
      right="0"
      bottom="0"
      overflow="hidden"
      zIndex={-1}
    >
      {lines.map((line, index) => (
        <BackgroundLine key={index} {...line} />
      ))}
    </VStack>
  );
};

export default MainBackground;
