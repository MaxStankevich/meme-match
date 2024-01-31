import { Box, Container, Flex, Spinner } from "@chakra-ui/react";
import MatchForm from "/src/features/match-form/MatchForm";
import Login from "/src/features/login/Login.jsx";
import useAuth from "/src/hooks/useAuth.js";
import Background from "./Background/index.jsx";
import { Routes, Route } from "react-router-dom";
import Admin from "src/features/admin/Admin.jsx";
import Settings from "src/features/settings/Settings.jsx";

const Main = () => {
  const { user, isLoading } = useAuth();

  return (
    <Background>
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
              <>
                {user ? (
                  <Routes>
                    <Route path="/" element={<MatchForm />} />
                    {user.role === "admin" && (
                      <>
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/settings" element={<Settings />} />
                      </>
                    )}
                  </Routes>
                ) : (
                  <Login />
                )}
              </>
            )}
          </Box>
        </Container>
      </Flex>
    </Background>
  );
};

export default Main;
