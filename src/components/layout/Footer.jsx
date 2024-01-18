import {
  Box,
  ButtonGroup,
  Container,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
// import { Logo } from './Logo'

const Footer = () => (
  <Box role="presentation" py="3" px="4" bg="teal.100">
    <Container
      as="footer"
      role="contentinfo"
      py={{ base: "12", md: "16" }}
      maxW="7xl"
    >
      <Stack spacing={{ base: "4", md: "5" }}>
        <Stack justify="space-between" direction="row" align="center">
          Logo
          <ButtonGroup variant="tertiary">
            <IconButton
              as="a"
              href="#"
              aria-label="LinkedIn"
              icon={<FaLinkedin />}
            />
            <IconButton
              as="a"
              href="#"
              aria-label="GitHub"
              icon={<FaGithub />}
            />
            <IconButton
              as="a"
              href="#"
              aria-label="Twitter"
              icon={<FaTwitter />}
            />
          </ButtonGroup>
        </Stack>
        <Text fontSize="sm" color="fg.subtle">
          &copy; {new Date().getFullYear()} MemeMatch, Inc. All rights reserved.
        </Text>
      </Stack>
    </Container>
  </Box>
);

export default Footer;
