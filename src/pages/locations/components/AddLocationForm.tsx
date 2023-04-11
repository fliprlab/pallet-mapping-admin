import { Box } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { memo } from "react";
import InputField from "../../../components/input/InputField";
import SubmitBtn from "../../../components/button/SubmitBtn";
import { VALIDATIONS } from "../../../validations";
import { useCreateLocationMutation } from "../../../hooks/locations/mutation/useCreateLocation.mutation";
import { showNotification } from "@mantine/notifications";

interface IProps {
  toggleModal: () => void;
}

const AddLocationForm: React.FC<IProps> = ({ toggleModal }) => {
  const { isLoading, mutateAsync } = useCreateLocationMutation();

  const handleSubmit = async (value: { location: string }) => {
    const res = await mutateAsync(value);
    if (res.status === "success") {
      showNotification({ message: res.message, color: "green" });
      toggleModal();
    } else {
      showNotification({ message: res.data.message, color: "red" });
    }
  };

  const { getInputProps, onSubmit } = useForm({
    initialValues: { location: "" },
    validateInputOnBlur: true,
    validateInputOnChange: true,
    validate: yupResolver(VALIDATIONS.location),
  });

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <Box my={15}>
        <InputField
          withAsterisk
          type={"text"}
          placeholder="Enter Location"
          {...getInputProps("location")}
        />
      </Box>
      <Box mt={40}>
        <SubmitBtn loading={isLoading} label="Submit" />
      </Box>
    </form>
  );
};

export default memo(AddLocationForm);
