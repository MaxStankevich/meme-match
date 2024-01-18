import { extendTheme } from "@chakra-ui/react";

const theme = {
  components: {
    Button: {
      defaultProps: {
        colorScheme: "teal",
      },
    },
  },
};

export default extendTheme(theme);
