import React, { Fragment, memo, useRef, useState } from "react";
import { ActionIcon, FileButton, Group } from "@mantine/core";
import { useCreateLocationItemMutation } from "../../../hooks/location-items/mutation/createLocationItem.mutation";
import { IconDeviceFloppy, IconTrash } from "@tabler/icons";
import { showNotification } from "@mantine/notifications";
import { useAppDispatch } from "../../../app/hooks";
import {
  setLoading,
  toggleDrawer,
  updateItems,
} from "../../../app/reducers/upload-items/upload-items.reducer";
import OutlineButton from "../../../components/button/OutlineButton";

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

  const { isLoading, mutateAsync } = useCreateLocationItemMutation("hub");

  const handleUploadItems = async () => {
    dispatch(toggleDrawer());
    dispatch(setLoading(true));
    const formData = new FormData();

    formData.append("uploadFile", file);
    try {
      const res = await mutateAsync({ formData: formData, prefix: "hub" });

      if (res.status === "success") {
        refetchData();
        dispatch(updateItems({ ...res.data, validEntries: res.data.inserted }));
        clearFile();
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
          <OutlineButton
            title={file ? file.name : "Upload Items"}
            variant="outline"
            {...props}
          />
        )}
      </FileButton>
      {file && (
        <Fragment>
          <ActionIcon
            color="red"
            variant="filled"
            disabled={!file || isLoading}
            onClick={clearFile}
          >
            <IconTrash />
          </ActionIcon>

          <ActionIcon
            disabled={isLoading}
            onClick={handleUploadItems}
            variant="filled"
            color="blue"
          >
            <IconDeviceFloppy />
          </ActionIcon>
        </Fragment>
      )}
    </Group>
  );
};

export default memo(UploadItemsBtn);
