import React, { Fragment, memo, useRef, useState } from "react";
import { ActionIcon, FileButton, Group } from "@mantine/core";

import { IconDeviceFloppy, IconTrash } from "@tabler/icons";
import { showNotification } from "@mantine/notifications";
import { useAppDispatch } from "../../../app/hooks";

import OutlineButton from "../../../components/button/OutlineButton";
import {
  setLoading,
  toggleDrawer,
  updateItems,
} from "../../../app/reducers/upload-grids/upload-grids.reducer";
import { useUploadGridsMutation } from "../../../hooks/grid/mutation/useUploadGrids.mutation";

interface IUploadGridBtn {
  refetchData: () => void;
}

const UploadGridBtn: React.FC<IUploadGridBtn> = ({ refetchData }) => {
  const [file, setFile] = useState<any>(undefined);
  const resetRef = useRef<() => void>(null);

  const dispatch = useAppDispatch();

  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
  };

  const { isLoading, mutateAsync } = useUploadGridsMutation();

  const handleUploadItems = async () => {
    dispatch(toggleDrawer());
    dispatch(setLoading(true));
    const formData = new FormData();

    formData.append("uploadFile", file);
    try {
      const res = await mutateAsync({ formData: formData });

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
    <Group mx={12} position="center">
      <FileButton resetRef={resetRef} onChange={setFile} accept=".csv">
        {(props) => (
          <OutlineButton
            title={file ? file.name : "Upload Grids"}
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

export default memo(UploadGridBtn);
