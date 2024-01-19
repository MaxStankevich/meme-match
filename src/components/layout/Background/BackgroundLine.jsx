import React from 'react';
import { Box } from '@chakra-ui/react';
import './BackgroundLine.css';

const BackgroundLine = ({ direction, speed }) => {
  return (
    <Box
      className={`background-line ${direction}`}
      style={{
        animationDuration: `${speed}s`,
      }}
    />
  );
};

export default BackgroundLine;
