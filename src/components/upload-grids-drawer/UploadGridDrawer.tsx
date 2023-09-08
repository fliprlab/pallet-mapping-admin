import { Box, Drawer, Loader, Progress } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { memo, useEffect } from "react";
import ItemsList from "./components/ItemsList";

import { useWebsocket } from "../../services/socket.service";
import {
  setProgress,
  toggleDrawer,
} from "../../app/reducers/upload-grids/upload-grids.reducer";

const UploadGridDrawer = () => {
  const { socket } = useWebsocket();
  const { drawerOpened, drawerLoading, items, progress } = useAppSelector(
    (state) => state.uploadGrids
  );
  const dispatch = useAppDispatch();
  const { duplicateEntries, invalidEntries, invalidLocation, validEntries } =
    items;

  useEffect(() => {
    socket &&
      socket.on("grid-progress", (percentage: number) => {
        dispatch(setProgress(percentage));
      });

    return () => {
      socket && socket.off("grid-progress");
    };
  }, [dispatch, socket]);

  return (
    <Drawer
      position="right"
      opened={drawerOpened}
      onClose={() => dispatch(toggleDrawer())}
      title="Upload Grids"
      overlayOpacity={0}
      overlayBlur={2}
      size={600}
      closeOnClickOutside={false}
      padding={25}
    >
      <Box style={{ maxHeight: "90vh", overflow: "auto" }}>
        <Progress
          label={progress < 100 ? `${progress}%` : "Completed"}
          color="green"
          size={"xl"}
          animate={progress < 100 ? true : false}
          value={progress}
        />
        {drawerLoading && (
          <Box
            display={"flex"}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              minHeight: "100vh",
            }}
          >
            <Loader />
          </Box>
        )}

        {!drawerLoading && (
          <Box>
            <ItemsList
              key={"Invalid Location Grids"}
              items={invalidLocation}
              color="#ff9966"
              title="Invalid Location Grids"
            />
            <ItemsList
              key={"Invalid Grids"}
              items={invalidEntries}
              color="#cc3300"
              title="Invalid Grids"
            />
            <ItemsList
              key={"Duplicate Grids"}
              items={duplicateEntries}
              color="#ffcc00"
              title="Duplicate Grids"
            />
            <ItemsList
              key={"Inserted Grids"}
              items={validEntries}
              color="#339900"
              title="Inserted Grids"
            />
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default memo(UploadGridDrawer);
