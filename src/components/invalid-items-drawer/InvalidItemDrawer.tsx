import { Box, Drawer, Loader } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggleDrawer } from "../../app/reducers/upload-items/upload-items.reducer";
import { memo } from "react";
import ItemsList from "./components/ItemsList";

const InvalidItemDrawer = () => {
  const { drawerOpened, drawerLoading, items } = useAppSelector(
    (state) => state.uploadItems
  );
  const dispatch = useAppDispatch();
  const { duplicateEntries, invalidEntries, invalidLocation, validEntries } =
    items;

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
              items={invalidLocation}
              color="#ff9966"
              title="Invalid Location Items"
            />
            <ItemsList
              key={"Invalid Items"}
              items={invalidEntries}
              color="#cc3300"
              title="Invalid Items"
            />
            <ItemsList
              key={"Duplicate Items"}
              items={duplicateEntries}
              color="#ffcc00"
              title="Duplicate Items"
            />
            <ItemsList
              key={"Inserted Items"}
              items={validEntries}
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
