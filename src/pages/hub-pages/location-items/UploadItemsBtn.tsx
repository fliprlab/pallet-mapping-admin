import React, { CSSProperties, Fragment, useState } from "react";

import { useCSVReader } from "react-papaparse";
import OutlineButton from "../../../components/button/OutlineButton";
import { ActionIcon } from "@mantine/core";
import { IconTrash, IconUpload } from "@tabler/icons";
import { COLORS } from "../../../colors";
import { useCreateLocationItemMutation } from "../../../hooks/location-items/mutation/createLocationItem.mutation";
import { showNotification } from "@mantine/notifications";
import { useAppDispatch } from "../../../app/hooks";
import {
  setLoading,
  toggleDrawer,
  updateItems,
} from "../../../app/reducers/upload-items/upload-items.reducer";

interface IUploadItemsBtn {
  refetchData: () => void;
}

const styles = {
  csvReader: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  } as CSSProperties,
  browseFile: {
    width: "20%",
  } as CSSProperties,
  acceptedFile: {
    border: "1px solid #ccc",
    height: 45,
    lineHeight: 2.5,
    paddingLeft: 10,
    width: "80%",
  } as CSSProperties,
  remove: {
    borderRadius: 0,
    padding: "0 20px",
  } as CSSProperties,
  progressBarBackgroundColor: {
    backgroundColor: "red",
  } as CSSProperties,
};

const UploadItemsBtn: React.FC<IUploadItemsBtn> = () => {
  const { CSVReader } = useCSVReader();
  const [items, setItems] = useState<TLocationItems[]>([]);
  const dispatch = useAppDispatch();
  const { isLoading, mutateAsync } = useCreateLocationItemMutation("hub");

  const onUploadAccept = (results: any) => {
    const { data } = results as { data: any[] };
    const csvArray: any[] = [];

    data.forEach((item: any[], i) => {
      if (i > 0) {
        let object: any = {};

        item.forEach((value, index) => {
          object[data[0][index]] = value;
        });

        csvArray.push(object);
      }
    });
    setItems(
      csvArray.map((item: any) => ({
        destination: item.shipment_destination_location_name,
        itemId: item.primary_key,
        zone: item.Zone,
        lpst: item.LPST,
      }))
    );
  };

  const handleUploadItems = async () => {
    dispatch(toggleDrawer());
    dispatch(setLoading(true));
    try {
      const res = await mutateAsync({ items, prefix: "hub" });

      if (res.status === "success") {
        dispatch(updateItems({ ...res.data, validEntries: res.data.inserted }));
        setItems([]);
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
    <CSVReader onUploadAccepted={onUploadAccept}>
      {({ getRootProps, acceptedFile, getRemoveFileProps }: any) => (
        <>
          <div style={styles.csvReader}>
            <OutlineButton
              {...getRootProps()}
              title={
                acceptedFile && items.length > 0
                  ? acceptedFile.name
                  : "Upload Items"
              }
            />

            {acceptedFile && items.length > 0 && (
              <Fragment>
                <ActionIcon
                  disabled={isLoading}
                  loading={isLoading}
                  mx={10}
                  size={36}
                  style={{ borderColor: COLORS.primary, color: COLORS.primary }}
                  variant="outline"
                  onClick={handleUploadItems}
                >
                  <IconUpload />
                </ActionIcon>
                <ActionIcon
                  size={36}
                  color="red"
                  variant="outline"
                  {...getRemoveFileProps()}
                >
                  <IconTrash />
                </ActionIcon>
              </Fragment>
            )}
          </div>
        </>
      )}
    </CSVReader>
  );
};

export default UploadItemsBtn;
