import { Box, Drawer, Loader, Progress } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setProgress,
  toggleDrawer,
  updateItems,
} from "../../app/reducers/upload-items/upload-items.reducer";
import { memo, useEffect } from "react";
import ItemsList from "./components/ItemsList";
import { useWebsocket } from "../../services/socket.service";
import { userToken } from "../../services/authenticate.service";

const InvalidItemDrawer = () => {
  const { socket } = useWebsocket();
  const { drawerOpened, drawerLoading, items, progress } = useAppSelector(
    (state) => state.uploadItems
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("socket", socket);

    socket &&
      socket.on(`progress-${userToken}`, (uploadStatus: any) => {
        console.log("Secket ON");
        const { percentage, uploadItems: itm } = uploadStatus;
        dispatch(setProgress(percentage));
        dispatch(updateItems(itm));
      });
    return () => {
      socket && socket.off(`progress-${userToken}`);
    };
  }, [dispatch, socket]);

  return (
    <Drawer
      position="right"
      opened={drawerOpened}
      onClose={() => dispatch(toggleDrawer())}
      title="Upload Items"
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
              key={"Invalid Location Items"}
              items={items.invalidLocation}
              color="#ff9966"
              title="Invalid Location Items"
            />
            <ItemsList
              key={"Invalid Items"}
              items={items.invalidEntries}
              color="#cc3300"
              title="Invalid Items"
            />
            <ItemsList
              key={"Duplicate Items"}
              items={items.duplicateEntries}
              color="#ffcc00"
              title="Duplicate Items"
            />
            <ItemsList
              key={"Inserted Items"}
              items={items.inserted}
              color="#339900"
              title="Inserted Items"
            />
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default memo(InvalidItemDrawer);
