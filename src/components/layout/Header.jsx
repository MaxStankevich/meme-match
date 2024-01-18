import { Box, Button, Heading, Flex } from "@chakra-ui/react";
import useAuth from "/src/hooks/useAuth.js";

const Header = () => {
  const { logOut, user } = useAuth();

  return (
    <Box as="nav" role="navigation" bg="teal.400">
      <Flex justifyContent="space-between" color="white" p="15px">
        <Heading>MemeMatch</Heading>
        {user && <Button onClick={logOut}>Log Out</Button>}
      </Flex>
    </Box>
  );
};

export default Header;
