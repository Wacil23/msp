"use client";
import { Button, createTheme } from "@mantine/core";

const theme = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        color: "primary.8",
        autoContrast: false,
      },
    }),
  },
  colors: {
    primary: [
      "#e5fdf4",
      "#d6f6e8",
      "#b1e9d1",
      "#87ddb8",
      "#64d2a3",
      "#4ecc95",
      "#40c98e",
      "#2fb17b",
      "#239e6c",
      "#07895b",
    ],
    secondary: [
      "#edf1fd",
      "#d7dff4",
      "#abbbeb",
      "#7d95e4",
      "#5775dd",
      "#4162da",
      "#3558da",
      "#2849c1",
      "#2140ad",
      "#153799",
    ],
  },
  fontFamily: "Avenir",
});

export default theme;
