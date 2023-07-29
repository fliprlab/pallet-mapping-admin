import React, { useRef, useState } from "react";
import { ActionIcon, Button, FileButton, Group } from "@mantine/core";
import { useCreateLocationItemMutation } from "../../hooks/location-items/mutation/createLocationItem.mutation";
import { IconTrash } from "@tabler/icons";

interface IUploadItemsBtn {
  refetchData: () => void;
}

const UploadItemsBtn: React.FC<IUploadItemsBtn> = () => {
  const [file, setFile] = useState<File | null>(null);
  const resetRef = useRef<() => void>(null);

  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
  };

  const { isLoading, mutateAsync } = useCreateLocationItemMutation("admin");

  // const handleUploadItems = async () => {
  //   const res = await mutateAsync({ items, prefix: "admin" });

  //   if (res.status === "success") {
  //     console.log("res", res);

  //     setItems([]);
  //     showNotification({
  //       message: res.message,
  //       color: "green",
  //     });

  //     if (res.data.invalidLocation.length > 0) {
  //       showNotification({
  //         message: `Items of this location ${res.data.invalidLocation[0].destination} is not added
  //         Kindly add this location first.`,
  //         color: "red",
  //       });
  //     }
  //   } else {
  //     showNotification({
  //       message: res.data.message,
  //       color: "red",
  //     });
  //   }
  // };

  return (
    <Group position="center">
      <FileButton resetRef={resetRef} onChange={setFile} accept=".csv">
        {(props) => (
          <Button {...props}>{file ? file.name : "Upload Items"}</Button>
        )}
      </FileButton>
      {file && (
        <ActionIcon disabled={!file} color="red" onClick={clearFile}>
          <IconTrash color="red" />
        </ActionIcon>
      )}
    </Group>
  );
};

export default UploadItemsBtn;
