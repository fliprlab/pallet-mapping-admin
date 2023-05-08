import { TextInput, TextInputProps, createStyles } from "@mantine/core";
import React, { memo } from "react";
import { COLORS } from "../../colors";

const InputField = (props: TextInputProps) => {
  const { classes } = useStyles();
  return (
    <TextInput
      classNames={{ input: classes.input }}
      style={{ borderColor: "red" }}
      {...props}
    />
  );
};

export default memo(InputField);

const useStyles = createStyles({
  input: { backgroundColor: COLORS.inputBg, borderColor: "#EBEBEB" },
});
