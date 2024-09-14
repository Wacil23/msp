"use client";
import { Button, Input, createTheme } from "@mantine/core";
import classes from "./theme.module.css";

const theme = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        color: "primary.3",
        fw: "400",
        fs: "1em",
        autoContrast: true,
      },
    }),
    InputWrapper: Input.Wrapper.extend({
      classNames: {
        label: classes.label,
      },
    }),
    Input: Input.extend({
      classNames: {
        input: classes.input,
      },
    }),
  },
  colors: {
    primary: [
      "#D5F1C4",
      "#D5F1C4",
      "#D5F1C4",
      "#D5F1C4",
      "#D5F1C4",
      "#D5F1C4",
      "#D5F1C4",
      "#D5F1C4",
      "#D5F1C4",
      "#D5F1C4",
    ],
    darker: [
      "#232323",
      "#232323",
      "#232323",
      "#232323",
      "#232323",
      "#232323",
      "#232323",
      "#232323",
      "#232323",
      "#232323",
    ],
    main: [
      "#FAFDF2",
      "#FAFDF2",
      "#FAFDF2",
      "#FAFDF2",
      "#FAFDF2",
      "#FAFDF2",
      "#FAFDF2",
      "#FAFDF2",
      "#FAFDF2",
      "#FAFDF2",
    ],
    greeny: [
      "#eaffd9",
      "#eaffd9",
      "#eaffd9",
      "#eaffd9",
      "#eaffd9",
      "#eaffd9",
      "#eaffd9",
      "#eaffd9",
      "#eaffd9",
      "#eaffd9",
    ],
    light: [
      "#DCF1A7",
      "#DCF1A7",
      "#DCF1A7",
      "#DCF1A7",
      "#DCF1A7",
      "#DCF1A7",
      "#DCF1A7",
      "#DCF1A7",
      "#DCF1A7",
      "#DCF1A7",
    ],
  },
  fontFamily: "Silka",
});

export default theme;
