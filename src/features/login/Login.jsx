import {
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { OAuthButtonGroup } from "./OAuthButtonGroup";
import { PasswordField } from "./PasswordField";
import BoxWithShadow from "../../components/BoxWithShadow.jsx";
import useAuth from "../../hooks/useAuth.js";

const Login = () => {
  const { logIn } = useAuth();
  return (
    <Container maxW="lg" px={{ base: "0", sm: "8" }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={{ base: "xs", md: "sm" }}>
              Log in to your account
            </Heading>
            <Text color="fg.muted">
              Don't have an account?{" "}
              <Link
                href="#"
                _hover={{
                  textDecoration: "underline",
                }}
              >
                Sign up
              </Link>
            </Text>
          </Stack>
        </Stack>
        <BoxWithShadow>
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" />
              </FormControl>
              <PasswordField />
            </Stack>
            <HStack justify="space-between">
              <Checkbox defaultChecked>Remember me</Checkbox>
              <Button variant="text" size="sm">
                Forgot password?
              </Button>
            </HStack>
            <Stack spacing="6">
              <Button
                onClick={() => logIn({ id: 1, name: "John", role: "admin" })}
              >
                Sign in
              </Button>
              <HStack>
                <Divider />
                <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
                  or continue with
                </Text>
                <Divider />
              </HStack>
              <OAuthButtonGroup />
            </Stack>
          </Stack>
        </BoxWithShadow>
      </Stack>
    </Container>
  );
};

export default Login;
