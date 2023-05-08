import { Box, Select } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { memo, useMemo } from "react";
import InputField from "../../../components/input/InputField";
import SubmitBtn from "../../../components/button/SubmitBtn";
import { useGetLocations } from "../../../hooks/locations/query/useGetLocations.query";
import { useCreateGridMutation } from "../../../hooks/grid/mutation/useCreateGrid.mutation";
import { showNotification } from "@mantine/notifications";
import { VALIDATIONS } from "../../../validations";

interface IProps {
  toggle: () => void;
}

const AddGridForm: React.FC<IProps> = ({ toggle }) => {
  const { getInputProps, onSubmit } = useForm({
    initialValues: { gridId: "", location: "" },
    validateInputOnBlur: true,
    validateInputOnChange: true,
    validate: yupResolver(VALIDATIONS.grid),
  });

  const { isLoading, data } = useGetLocations();

  const locations = useMemo(() => {
    if (!isLoading && data) {
      return data.data.map((item: any) => {
        return { label: item.location, value: item._id };
      });
    } else {
      return [];
    }
  }, [data, isLoading]);

  const { isLoading: createLoading, mutateAsync } = useCreateGridMutation();

  const handleSubmit = async (values: { gridId: string; location: string }) => {
    const res = await mutateAsync(values);

    if (res.status === "success") {
      showNotification({ message: res.message, color: "green" });
      toggle();
    } else {
      showNotification({ message: res.data.message, color: "red" });
    }
  };

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <Box my={15}>
        <InputField
          withAsterisk
          type={"text"}
          placeholder="Enter Grid Id"
          {...getInputProps("gridId")}
        />
      </Box>
      <Box my={15}>
        <Select
          placeholder="Enter Location"
          data={locations}
          {...getInputProps("location")}
        />
      </Box>
      <Box mt={40}>
        <SubmitBtn loading={createLoading} label="Submit" />
      </Box>
    </form>
  );
};

export default memo(AddGridForm);
