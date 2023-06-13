import React, { memo, Fragment, useRef, useState } from "react";
import { ActionIcon, Tooltip } from "@mantine/core";
import { CSVLink } from "react-csv";
import moment from "moment";
import { IHubGridListFilter } from "../../../../grid-list/HubGridList";
import { useGetGridsHubQuery } from "../../../../../../hooks/grid/query/hub/useGetGridsHub.query";
import { ICONS } from "../../../../../../icons";

const getCSVData = (data: any[]) => {
  let csvData: any[] = [];

  data.forEach((item) => {
    csvData.push({
      gridId: item.gridId,
      palletId: item.status === "unoccupied" ? "" : item.palletId.name,
      destination: item.status === "unoccupied" ? "" : item.destination,
      status: item.status,
      time:
        item.status === "unoccupied"
          ? ""
          : moment(item.time).format("DD MMM YYYY, hh:mm a"),
    });

    if (item.status === "unoccupied") {
    }
  });
  return csvData;
};

interface IProps {
  filter: IHubGridListFilter;
}

const DownloadBtn: React.FC<IProps> = ({ filter }) => {
  const downloadRef = useRef<any>(null);
  const [tableData, setTableData] = useState<any[]>([]);

  const { refetch, isFetching } = useGetGridsHubQuery({}, filter, {
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
        headers={[
          { label: "Grid ID", key: "gridId" },
          { label: "Pallet ID", key: "palletId" },
          { label: "Time", key: "time" },
          { label: "Destination", key: "destination" },
          { label: "Status", key: "status" },
        ]}
        filename="BagData.csv"
        hidden
      />
    </Fragment>
  );
};

export default memo(DownloadBtn);
