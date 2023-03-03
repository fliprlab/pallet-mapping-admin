import { Button, createStyles } from "@mantine/core";
import React, { memo } from "react";
import { COLORS } from "../../colors";

interface IProps {
  label: string;
  loading?: boolean;
  type?: "primary" | "secondary";
}

const SubmitBtn: React.FC<IProps> = ({
  label,
  loading = false,
  type = "primary",
}) => {
  const { classes } = useStyle();
  return (
    <Button
      loading={loading}
      disabled={loading}
      type="submit"
      className={type === "primary" ? classes.btnPrimary : classes.btn}
    >
      {label}
    </Button>
  );
};

export default memo(SubmitBtn);

const useStyle = createStyles((theme) => ({
  btn: {
    width: "100%",
    fontWeight: "bold",
    margin: "auto",
    height: 40,
    backgroundColor: COLORS.white,
    color: COLORS.primary,
    "&:hover": {
      backgroundColor: COLORS.white,
    },
  },
  btnPrimary: {
    width: "100%",
    fontWeight: "bold",
    margin: "auto",
    height: 40,
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    "&:hover": {
      backgroundColor: COLORS.primary,
    },
  },
}));
