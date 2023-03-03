import { TextInput, createStyles } from "@mantine/core";
import React, { memo } from "react";
import { COLORS } from "../../../colors";

interface IProps {
  onChangeText?: (value: string) => void;
}

const SearchField: React.FC<IProps> = ({ onChangeText }) => {
  const { classes } = useStyle();
  return (
    <TextInput
      className={classes.root}
      placeholder="search"
      onChange={(e) => {
        onChangeText && onChangeText(e.target.value);
      }}
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
      padding: "4.5px 15px",
      height: "auto !important",
      fontSize: "14px",
      fontWeight: 300,
    },
  },
});
