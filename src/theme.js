import { extendTheme } from "@chakra-ui/react";

const theme = {
  components: {
    Button: {
      defaultProps: {
        colorScheme: "teal",
      },
    },
    Link: {
      baseStyle: {
        _hover: {
          textDecoration: 'none',
        },
      },
    }
  },
};

export default extendTheme(theme);
