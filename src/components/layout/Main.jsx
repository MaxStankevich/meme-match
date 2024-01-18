import { Box, Container, Flex, Spinner } from "@chakra-ui/react";
import MatchForm from "/src/features/match-form/MatchForm";
import Login from "/src/features/login/Login.jsx";
import useAuth from "/src/hooks/useAuth.js";

const Main = () => {
  const { user, logIn, isLoading } = useAuth();

  return (
    <Flex as="main" role="main" direction="column" flex="1" py="16">
      <Container flex="1" maxW="7xl">
        <Box role="presentation" py="3" px="4" minH="lg">
          {isLoading ? (
            <Flex
              role="presentation"
              minH="lg"
              justifyContent="center"
              alignItems="center"
            >
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="teal.500"
                size="xl"
              />
            </Flex>
          ) : (
            <>{user ? <MatchForm /> : <Login onLogin={logIn} />}</>
          )}
        </Box>
      </Container>
    </Flex>
  );
};

export default Main;
