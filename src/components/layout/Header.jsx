import {
  Box,
  Heading,
  Flex,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { FaTools, FaSignOutAlt, FaCog } from "react-icons/fa";
import useAuth from "src/hooks/useAuth.js";
import faceImage from "src/assets/face.png";

const Header = () => {
  const { logOut, user } = useAuth();
  const navigate = useNavigate();

  return (
    <Box as="nav" role="navigation" bg="teal.400">
      <Flex justifyContent="space-between" color="white" p="15px">
        <ChakraLink as={ReactRouterLink} to="/">
          <Flex>
            <Heading>M</Heading>
            <Heading color="black">M</Heading>
          </Flex>
        </ChakraLink>
        {user && (
          <Menu>
            <MenuButton
              as={IconButton}
              variant="outline"
              colorScheme="white"
              borderRadius="full"
              p={0}
            >
              <Image
                src={faceImage}
                alt="User"
                borderRadius="full"
                boxSize="40px"
              />
            </MenuButton>
            <MenuList color="black">
              {user.role === "admin" && (
                <>
                  <MenuItem
                    icon={<FaCog />}
                    onClick={() => {
                      navigate("/settings");
                    }}
                  >
                    Settings
                  </MenuItem>
                  <MenuItem
                    icon={<FaTools />}
                    onClick={() => {
                      navigate("/admin");
                    }}
                  >
                    Administration
                  </MenuItem>
                </>
              )}
              <MenuItem icon={<FaSignOutAlt />} onClick={logOut}>
                Log Out
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
    </Box>
  );
};

export default Header;
