import { ActionIcon, Tooltip } from "@mantine/core";
import React, { memo, useState, Fragment } from "react";
import { ICONS } from "../../../../../../icons";
import * as XLSX from "xlsx";
import { showNotification } from "@mantine/notifications";

const UploadBtn = () => {
  const [loading, setLoading] = useState(false);
  const [template, setTemplate] = useState<any>(undefined);

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
        const data = XLSX.utils.sheet_to_json(ws, { raw: true });

        console.log("data--", data);

        setLoading(false);
      };
      reader.readAsBinaryString(file);
    } catch (error: any) {
      showNotification({ message: error.message, color: "red" });
    }
  };

  return (
    <Fragment>
      <label htmlFor="gridListFile" onClick={() => setLoading(true)}>
        {/* <Tooltip label="Upload"> */}

        <img src={ICONS.upload} width={22} alt="download" />

        {/* </Tooltip> */}
      </label>

      <input
        id="gridListFile"
        hidden
        type="file"
        onChange={(e: any) => {
          if (e.target.files?.length > 0) {
            setTemplate(e.target.files[0]);
            importTemp(e.target.files[0]);
          } else {
            setTemplate(undefined);
          }
        }}
      />
    </Fragment>
  );
};

export default memo(UploadBtn);
