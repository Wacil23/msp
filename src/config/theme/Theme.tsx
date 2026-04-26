"use client";
import { Button, Input, createTheme } from "@mantine/core";
import classes from "./theme.module.css";

const fill = (hex: string): [
  string, string, string, string, string,
  string, string, string, string, string
] => [hex, hex, hex, hex, hex, hex, hex, hex, hex, hex];

const theme = createTheme({
  fontFamily: "var(--font-poppins), system-ui, sans-serif",
  primaryColor: "secondary",
  components: {
    Button: Button.extend({
      defaultProps: {
        color: "secondary.0",
        fw: 500,
        radius: "md",
        autoContrast: true,
      },
    }),
    InputWrapper: Input.Wrapper.extend({
      classNames: { label: classes.label },
    }),
    Input: Input.extend({
      classNames: { input: classes.input },
    }),
  },
  colors: {
    primary: fill("#F4F8F2"),
    darker: fill("#0E1311"),
    main: fill("#FFFFFF"),
    light: fill("#E4EFE2"),
    secondary: fill("#4F7355"),
  },
});

export default theme;
