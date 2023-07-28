import { TextInput, createStyles } from "@mantine/core";
import React, { memo, useEffect } from "react";
import { COLORS } from "../../../colors";
import { useDebouncedState } from "@mantine/hooks";

interface IProps {
  onChangeText?: (value: string) => void;
}

const SearchField: React.FC<IProps> = ({ onChangeText }) => {
  const { classes } = useStyle();
  const [value, setValue] = useDebouncedState("", 400);

  useEffect(() => {
    onChangeText && onChangeText(value);
  }, [value, onChangeText]);

  return (
    <TextInput
      className={classes.root}
      placeholder="search"
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default memo(SearchField);

const useStyle = createStyles({
  root: {
    width: 380,
    "& input": {
      borderColor: COLORS.borderPrimary,
      borderRadius: 5,
      padding: "0px 15px",
      height: "auto !important",
      fontSize: "14px",
      fontWeight: 300,
    },
  },
});
