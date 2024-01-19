import React from 'react';
import { Box } from '@chakra-ui/react';
import MainBackground from './MainBackground';

const Background = ({ children }) => {
  return (
    <Box position="relative" h="full" overflow="hidden">
      <MainBackground />
      {children}
    </Box>
  );
};

export default Background;
