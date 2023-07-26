import React, { memo, Fragment, useRef, useState } from "react";
import { ActionIcon, Tooltip } from "@mantine/core";
import { CSVLink } from "react-csv";
import moment from "moment";
import { useGetLocationItemsQuery } from "../../hooks/location-items/query/useGetLocationItems.query";
import { DateRangePickerValue } from "@mantine/dates";
import { ICONS } from "../../icons";

const status = (item: TLocationItems & { pallet: Object; status: string }) => {
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

const DownloadBtn: React.FC<IProps> = ({ filter }) => {
  const downloadRef = useRef<any>(null);
  const [tableData, setTableData] = useState<any[]>([]);

  const { refetch, isFetching } = useGetLocationItemsQuery({}, "admin", {
    enabled: false,

    onSuccess: (res) => {
      if (res.status === "success") {
        setTableData(res.data);
        setTimeout(() => {
          downloadRef.current.link.click();
        }, 100);
      }
    },
  });

  return (
    <Fragment>
      <Tooltip label="Download">
        <ActionIcon
          loading={isFetching}
          loaderProps={{ color: "#324D90" }}
          onClick={() => refetch()}
        >
          <img src={ICONS.download} width={22} alt="download" />
        </ActionIcon>
      </Tooltip>

      <CSVLink
        ref={downloadRef}
        data={getCSVData(tableData)}
        filename="BagData.csv"
        hidden
      />
    </Fragment>
  );
};

export default memo(DownloadBtn);
