"use client";
import { Button, Input, createTheme } from "@mantine/core";
import classes from "./theme.module.css";
import { config } from "../../middleware";

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
      "#7cbb73",
      "#7cbb73",
      "#7cbb73",
      "#7cbb73",
      "#7cbb73",
      "#7cbb73",
      "#7cbb73",
      "#7cbb73",
      "#7cbb73",
      "#7cbb73",
    ],
    darker: [
      "#0a1c2d",
      "#0a1c2d",
      "#0a1c2d",
      "#0a1c2d",
      "#0a1c2d",
      "#0a1c2d",
      "#0a1c2d",
      "#0a1c2d",
      "#0a1c2d",
      "#0a1c2d",
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
  fontFamily: "Silka",
});

export default theme;
