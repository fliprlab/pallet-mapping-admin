import { ActionIcon, Tooltip } from "@mantine/core";
import React, { memo, useState, Fragment, useRef } from "react";
import { ICONS } from "../../../../../../icons";
import * as XLSX from "xlsx";
import { showNotification } from "@mantine/notifications";
import { useAddHubGridsMutation } from "../../../../../../hooks/hub-admin/mutation/useAddHubGrids.mutation";

interface IProps {
  refetchData: () => void;
}

const UploadBtn: React.FC<IProps> = ({ refetchData }) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const { mutateAsync, isLoading } = useAddHubGridsMutation();

  const resetFile = () => {
    if (inputFileRef && inputFileRef.current) {
      inputFileRef.current.files = null;
      inputFileRef.current.value = "";
    }
  };

  const importTemp = async (importFile: any) => {
    setLoading(true);
    try {
      const file = importFile;
      const reader = new FileReader();
      reader.onload = async (evt: any) => {
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = await XLSX.utils.sheet_to_json(ws, { raw: true });

        const res = await mutateAsync({
          grids: data.map((item: any) => item["GRID ID"]),
        });

        if (res.status === "success") {
          showNotification({ message: res.message, color: "green" });
          refetchData();
        } else {
          showNotification({
            message: res.message ?? res.data.message,
            color: "red",
          });
        }
      };
      reader.readAsBinaryString(file);
    } catch (error: any) {
      showNotification({ message: error.message, color: "red" });
    } finally {
      setLoading(false);
      resetFile();
    }
  };

  return (
    <Fragment>
      <label htmlFor="gridListFile">
        <Tooltip label="Upload">
          {loading || isLoading ? (
            <ActionIcon loading={true} />
          ) : (
            <img src={ICONS.upload} width={22} alt="download" />
          )}
        </Tooltip>
      </label>

      <input
        ref={inputFileRef}
        id="gridListFile"
        hidden
        type="file"
        onChange={(e: any) => {
          if (e.target.files?.length > 0) {
            // setTemplate(e.target.files[0]);
            importTemp(e.target.files[0]);
          }
        }}
      />
    </Fragment>
  );
};

export default memo(UploadBtn);
