import {
  Box,
  Button,
  Heading,
  Flex,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import useAuth from "/src/hooks/useAuth.js";

const Header = () => {
  const { logOut, user } = useAuth();

  return (
    <Box as="nav" role="navigation" bg="teal.400">
      <Flex justifyContent="space-between" color="white" p="15px">
        <ChakraLink as={ReactRouterLink} to="/">
          <Flex>
            <Heading>M</Heading>
            <Heading color="black">M</Heading>
          </Flex>
        </ChakraLink>
        {user && <Button onClick={logOut}>Log Out</Button>}
      </Flex>
    </Box>
  );
};

export default Header;
