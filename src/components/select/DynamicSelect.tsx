import { Select } from "@mantine/core";
import React, { memo, useMemo } from "react";
import { useSelectDataQuery } from "../../hooks/select/useSelectData.query";
import { UseFormReturnType } from "@mantine/form";

interface IDynamicSelect {
  url: string;
  formHandler: UseFormReturnType<any>;
  name: string;
  label: string;
  selectLabel: string;
  selectValue: string;
  disabled?: boolean;
}

const DynamicSelect: React.FC<IDynamicSelect> = ({
  url,
  formHandler,
  name,
  label,
  selectLabel,
  selectValue,
  disabled = false,
}) => {
  const { data, isLoading } = useSelectDataQuery({ url });

  const selectData = useMemo(() => {
    if (!isLoading && data) {
      return data.data.map((item: any) => {
        return {
          label: item[selectLabel],
          value: item[selectValue],
        };
      });
    } else {
      return [];
    }
  }, [isLoading, data, selectLabel, selectValue]);

  return (
    <Select
      disabled={disabled}
      placeholder={label}
      data={selectData}
      {...formHandler.getInputProps(name)}
    />
  );
};

export default memo(DynamicSelect);
