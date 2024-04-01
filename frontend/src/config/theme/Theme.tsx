"use client";
import { Button, Input, createTheme } from "@mantine/core";
import classes from "./theme.module.css";

const theme = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        color: "primary.3",
        autoContrast: true,
      },
    }),
    InputWrapper: Input.Wrapper.extend({
      classNames: {
        label: classes.label,
      },
    }),
  },
  colors: {
    primary: [
      "#f6fde4",
      "#eef9d2",
      "#ddf1a8",
      "#caea7a",
      "#bbe353",
      "#b0df3a",
      "#abdd2b",
      "#96c41c",
      "#84ae13",
      "#6f9700",
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
  },
  fontFamily: "Avenir",
});

export default theme;
