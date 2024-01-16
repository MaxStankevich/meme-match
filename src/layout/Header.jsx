import { Box, Container, Heading } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box as="nav" role="navigation" bg="teal.400">
      <Container maxW="7xl">
        <Box minH="20" role="presentation" py="3" px="4" color="white">
          <Heading>MemeMatch</Heading>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
