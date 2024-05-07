import { Box, Image, Badge, Flex, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { getMemeImageUrl } from "src/utils/index.js";

const Sentences = ({ sentences }) => {
  return (
    <Flex direction="column" maxWidth="100%">
      {sentences.map((sentence, index) => (
        <Flex key={index} borderBottom="1px" borderColor="gray.200" p={2} align="stretch">
          <Box flex="1" p={2} minWidth="0">
            <Text>{sentence.sentence}</Text>
          </Box>
          <Box flex="1" p={2}>
            <Wrap spacing="2">
              {sentence.matches.sort((a, b) => b.score - a.score).map((match) => (
                <WrapItem key={match.meme.id} position="relative">
                  <Image
                    boxSize="100px"
                    objectFit="cover"
                    src={getMemeImageUrl(match.meme)}
                    alt={`Meme ${match.meme.id}`}
                  />
                  <Badge colorScheme="purple" position="absolute" top="1" right="1">
                    {match.score}/5
                  </Badge>
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        </Flex>
      ))}
    </Flex>
  );
};

export default Sentences;
