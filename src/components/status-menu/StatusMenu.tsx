import { Button, Menu, createStyles } from "@mantine/core";
import React from "react";

interface IStatusMenu {
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  options: {
    label: string;
    value: string;
  }[];
}

const StatusMenu: React.FC<IStatusMenu> = ({
  setStatus,
  status,
  options = [],
}) => {
  const { classes } = useStyles();
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button size="xs" className={classes.menuBtn}>
          {status === "" ? "Status" : status}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item onClick={() => setStatus("")}>Status</Menu.Item>
        {options.map((option) => (
          <Menu.Item key={option.value} onClick={() => setStatus(option.value)}>
            {option.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default StatusMenu;

const useStyles = createStyles({
  menuBtn: {
    backgroundColor: "#fff !important",
    border: "1px solid #ced4da",
    color: "#909090",
    fontWeight: 300,
    fontSize: 14,
    height: 36,
    borderRadius: 5,
  },
});
