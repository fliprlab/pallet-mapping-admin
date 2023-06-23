import { Chip } from "@mantine/core";
import React, { memo } from "react";

export type TItemStatus =
  | "all"
  | "created"
  | "asgin-grid"
  | "out"
  | "cancelled";

interface IProps {
  value: TItemStatus;
  setValue: React.Dispatch<React.SetStateAction<TItemStatus>>;
}

const StatusChip: React.FC<IProps> = ({ setValue, value }) => {
  return (
    <Chip.Group
      multiple={false}
      value={value}
      onChange={(e) => setValue(e as TItemStatus)}
    >
      <Chip color="blue" value="all">
        All
      </Chip>
      <Chip value="created">created</Chip>
      <Chip value="asgin-grid">Assgin grid</Chip>
      <Chip value="out">Out</Chip>
      <Chip value="cancelled">Cancelled</Chip>
    </Chip.Group>
  );
};

export default memo(StatusChip);
