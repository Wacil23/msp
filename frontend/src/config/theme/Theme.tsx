"use client";
import { Button, Input, createTheme } from "@mantine/core";
import classes from "./theme.module.css";

const theme = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        color: "primary.3",
        fw: "bold",
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
      "#68cc45",
      "#68cc45",
      "#68cc45",
      "#68cc45",
      "#68cc45",
      "#68cc45",
      "#68cc45",
      "#68cc45",
      "#68cc45",
      "#68cc45",
    ],
    darker: [
      "#23410C",
      "#23410C",
      "#23410C",
      "#23410C",
      "#23410C",
      "#23410C",
      "#23410C",
      "#23410C",
      "#23410C",
      "#23410C",
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
