import React, { memo } from "react";
import { Pagination } from "@mantine/core";
import { TABLE_PAGE_LIMIT } from "../../constants";

interface Props {
  activePage: number;
  totalPages: number;
  setPage: (number: number) => void;
}

const ThemePagination = (props: Props) => {
  const { activePage, setPage, totalPages } = props;

  if (totalPages && totalPages <= TABLE_PAGE_LIMIT) {
    return null;
  }

  return (
    <Pagination
      page={activePage}
      onChange={setPage}
      size={"sm"}
      total={Math.ceil(totalPages / TABLE_PAGE_LIMIT)}
      radius="sm"
      mt={20}
      styles={{
        item: {
          "&[data-active]": {
            background: "#324D90",
          },
        },
      }}
    />
  );
};

export default memo(ThemePagination);
