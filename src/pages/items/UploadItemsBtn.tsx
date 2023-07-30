import React, { Fragment, useRef, useState } from "react";
import { ActionIcon, Button, FileButton, Group, Tooltip } from "@mantine/core";
import { useCreateLocationItemMutation } from "../../hooks/location-items/mutation/createLocationItem.mutation";
import { IconDeviceFloppy, IconTrash } from "@tabler/icons";
import { showNotification } from "@mantine/notifications";
import { useAppDispatch } from "../../app/hooks";
import {
  setLoading,
  toggleDrawer,
  updateItems,
} from "../../app/reducers/upload-items/upload-items.reducer";

interface IUploadItemsBtn {
  refetchData: () => void;
}

const UploadItemsBtn: React.FC<IUploadItemsBtn> = ({ refetchData }) => {
  const [file, setFile] = useState<any>(undefined);
  const resetRef = useRef<() => void>(null);

  const dispatch = useAppDispatch();

  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
  };

  const { isLoading, mutateAsync } = useCreateLocationItemMutation("admin");

  const handleUploadItems = async () => {
    dispatch(toggleDrawer());
    dispatch(setLoading(true));
    const formData = new FormData();

    formData.append("uploadFile", file);
    try {
      const res = await mutateAsync({ formData: formData, prefix: "admin" });
      console.log("res.status", res.status);

      if (res.status === "success") {
        console.log("res.data.", res.data);
        refetchData();
        dispatch(updateItems({ ...res.data, validEntries: res.data.inserted }));
        showNotification({
          message: res.message,
          color: "green",
        });
      } else {
        showNotification({
          message: res.data.message,
          color: "red",
        });
      }
    } catch (error) {
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Group position="center">
      <FileButton resetRef={resetRef} onChange={setFile} accept=".csv">
        {(props) => (
          <Button {...props}>{file ? file.name : "Upload Items"}</Button>
        )}
      </FileButton>
      {file && (
        <Fragment>
          <Tooltip label="Remove">
            <ActionIcon
              color="red"
              variant="filled"
              disabled={!file || isLoading}
              onClick={clearFile}
            >
              <IconTrash />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Save Items">
            <ActionIcon
              disabled={isLoading}
              onClick={handleUploadItems}
              variant="filled"
              color="blue"
            >
              <IconDeviceFloppy />
            </ActionIcon>
          </Tooltip>
        </Fragment>
      )}
    </Group>
  );
};

export default UploadItemsBtn;
