import { Box, Container, Flex } from "@chakra-ui/react";
import MatchForm from "../features/match-form/MatchForm";

const Main = (props) => {
  return (
    <Flex as="main" role="main" direction="column" flex="1" py="16" {...props}>
      <Container flex="1" maxW="7xl">
        <Box role="presentation" py="3" px="4" minH="lg">
          <MatchForm />
        </Box>
      </Container>
    </Flex>
  );
};

export default Main;
