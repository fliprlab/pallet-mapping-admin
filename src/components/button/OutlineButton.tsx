import { Button, createStyles } from "@mantine/core";
import React, { memo } from "react";
import { COLORS } from "../../colors";

interface IProps {
  onClick?: () => void;
  title: string;
}

const OutlineButton: React.FC<IProps> = ({ onClick, title, ...props }) => {
  const { classes } = useStyles();
  return (
    <Button
      {...props}
      variant="outline"
      className={classes.root}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default memo(OutlineButton);

const useStyles = createStyles({
  root: {
    borderColor: COLORS.primary,
    color: COLORS.primary,
    fontWeight: 500,
    fontSize: 16,
    padding: "10px 16px",
    "&:focus-visible": {
      outline: "none",
    },
  },
});
