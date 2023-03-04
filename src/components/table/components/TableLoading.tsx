import { Box, Flex, Loader } from "@mantine/core";
import React, { memo } from "react";
import { COLORS } from "../../../colors";

const TableLoading = () => {
  return (
    <Flex mih={"50vh"} align={"center"} justify="center">
      <Loader color={COLORS.primary} />
    </Flex>
  );
};

export default memo(TableLoading);
