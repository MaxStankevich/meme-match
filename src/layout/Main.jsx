import { Box, Container, Flex } from "@chakra-ui/react";
import MatchForm from "../features/match-form/MatchForm";
import Login from "../features/login/Login.jsx";
import useAuth from "../hooks/useAuth.js";

const Main = () => {
  const { user, logIn } = useAuth();

  return (
    <Flex as="main" role="main" direction="column" flex="1" py="16">
      <Container flex="1" maxW="7xl">
        <Box role="presentation" py="3" px="4" minH="lg">
          {user ? <MatchForm /> : <Login onLogin={logIn} />}
        </Box>
      </Container>
    </Flex>
  );
};

export default Main;
