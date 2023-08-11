import { Box } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { memo } from "react";
import InputField from "../../../components/input/InputField";
import SubmitBtn from "../../../components/button/SubmitBtn";
import { VALIDATIONS } from "../../../validations";
import { showNotification } from "@mantine/notifications";
import { useCreateZoneMutation } from "../../../hooks/zone/mutation/useCreateZone.mutation";

interface IProps {
  toggleModal: () => void;
}

const AddZoneForm: React.FC<IProps> = ({ toggleModal }) => {
  const { isLoading, mutateAsync } = useCreateZoneMutation();

  const handleSubmit = async (value: { zone: string }) => {
    const res = await mutateAsync(value);
    if (res.status === "success") {
      showNotification({ message: res.message, color: "green" });
      toggleModal();
    } else {
      showNotification({ message: res.data.message, color: "red" });
    }
  };

  const { getInputProps, onSubmit } = useForm({
    initialValues: { zone: "" },
    validateInputOnBlur: true,
    validateInputOnChange: true,
    validate: yupResolver(VALIDATIONS.zone.addZoneValidation),
  });

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <Box my={15}>
        <InputField
          withAsterisk
          type={"text"}
          placeholder="Enter Zone"
          {...getInputProps("zone")}
        />
      </Box>
      <Box mt={40}>
        <SubmitBtn loading={isLoading} label="Submit" />
      </Box>
    </form>
  );
};

export default memo(AddZoneForm);
