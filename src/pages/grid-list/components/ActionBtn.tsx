import { ActionIcon, Box, Tooltip } from "@mantine/core";
import { IconEye, IconEyeOff } from "@tabler/icons";
import React, { memo } from "react";
import { useInactiveGridMutation } from "../../../hooks/grid/mutation/useInactiveGrid.mutation";
import { showNotification } from "@mantine/notifications";

interface IActionBtn {
  data: { _id: string; active: boolean };
  refetch: () => void;
}

const ActionBtn: React.FC<IActionBtn> = ({ data: { active = true, _id } }) => {
  const { mutateAsync, isLoading } = useInactiveGridMutation();

  const handleInactive = async () => {
    const res = await mutateAsync({ _id, active });
    if (res.status === "success") {
      showNotification({ message: res.message, color: "green" });
    } else {
      showNotification({ message: res.data.message, color: "red" });
    }
  };

  return (
    <Box>
      <Tooltip label={active ? `In-Active Grid` : `Active Grid`}>
        <ActionIcon
          disabled={isLoading}
          loading={isLoading}
          onClick={handleInactive}
        >
          {active ? <IconEye /> : <IconEyeOff />}
        </ActionIcon>
      </Tooltip>
    </Box>
  );
};

export default memo(ActionBtn);
