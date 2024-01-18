import { extendTheme } from "@chakra-ui/react";

const theme = {
  components: {
    Button: {
      defaultProps: {
        colorScheme: "teal",
      },
    },
    Spinner: {
      defaultProps: {
        color: "blue.500"
      }
    }
  },
};

export default extendTheme(theme);
