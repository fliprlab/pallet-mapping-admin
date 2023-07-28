import React, { memo, Fragment, useRef, useState } from "react";
import { Tooltip } from "@mantine/core";
import { CSVLink } from "react-csv";
import moment from "moment";
import { useGetLocationItemsQuery } from "../../../hooks/location-items/query/useGetLocationItems.query";
import { DateRangePickerValue } from "@mantine/dates";
import OutlineButton from "../../../components/button/OutlineButton";

const status = (item: TLocationItems) => {
  if (item.status === "created" && item.pallet) {
    return "sort";
  } else if (item.status === "picked up") {
    return "bagged";
  } else {
    return item.status;
  }
};

const getCSVData = (data: TLocationItems[]) => {
  let csvData: any[] = [];

  data.forEach((item) => {
    csvData.push({
      itemId: item.itemId,
      destination: item.destination,
      palletId: item?.pallet?.name ?? "",
      lpst: item.lpst,
      zone: item.zone,
      createdAt: moment(item.createdAt).format("lll"),
      status: status(item),
    });
  });
  return csvData;
};

interface IProps {
  filter: {
    search?: string;
    status?: string;
    date?: DateRangePickerValue;
  };
}

const DownloadItemsBtn: React.FC<IProps> = ({ filter }) => {
  const downloadRef = useRef<any>(null);
  const [tableData, setTableData] = useState<any[]>([]);

  const { refetch, isFetching } = useGetLocationItemsQuery(
    { ...filter },
    "hub",
    {
      enabled: false,

      onSuccess: (res) => {
        if (res.status === "success") {
          setTableData(res.data);
          setTimeout(() => {
            downloadRef.current.link.click();
          }, 100);
        }
      },
    }
  );

  return (
    <Fragment>
      <Tooltip label="Download">
        <OutlineButton
          mx={10}
          title="Download"
          loading={isFetching}
          loaderProps={{ color: "#324D90" }}
          onClick={() => refetch()}
        />
      </Tooltip>

      <CSVLink
        ref={downloadRef}
        data={getCSVData(tableData)}
        filename="items.csv"
        hidden
      />
    </Fragment>
  );
};

export default memo(DownloadItemsBtn);
