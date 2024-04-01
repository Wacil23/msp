"use client";
import { Button, createTheme } from "@mantine/core";

const theme = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        color: "primary.6",
        autoContrast: false,
      },
    }),
  },
  colors: {
    primary: [
      "#d0f4c3",
      "#c7f1b7",
      "#bdefab",
      "#b4ed9f",
      "#aaea93",
      "#a1e887",
      "#91d17a",
      "#81ba6c",
      "#71a25f",
      "#618b51",
    ],
    darker: [
      "#000D44",
      "#000D44",
      "#000D44",
      "#000D44",
      "#000D44",
      "#000D44",
      "#000D44",
      "#000D44",
      "#000D44",
      "#000D44",
    ],
  },
  fontFamily: "Avenir",
});

export default theme;
