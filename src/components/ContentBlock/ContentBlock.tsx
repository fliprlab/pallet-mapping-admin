import { Box, Flex, Text, LoadingOverlay } from "@mantine/core";
import React, { memo } from "react";

type Props = {
  loading: boolean;
  title: string;
  rightComponent?: React.ReactNode;
  children: (() => React.ReactNode) | React.ReactNode;
};

const ContentBlock = (props: Props) => {
  const { title, rightComponent, children, loading } = props;

  return (
    <Flex
      direction={"column"}
      sx={{ height: "100%", backgroundColor: "#fff", padding: 16 }}
    >
      <Flex justify="space-between">
        <Text fz="xl">{title}</Text>
        {rightComponent && rightComponent}
      </Flex>
      <Box mt={20} sx={{ position: "relative", height: "100%" }}>
        {loading ? (
          <LoadingOverlay top={0} visible={true} overlayBlur={2} />
        ) : typeof children === "function" ? (
          children()
        ) : (
          children
        )}
      </Box>
    </Flex>
  );
};

export default memo(ContentBlock);
