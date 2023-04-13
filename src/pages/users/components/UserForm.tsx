import { Box, Select, TextInput, createStyles } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { memo, useMemo } from "react";
import { COLORS } from "../../../colors";
import SubmitBtn from "../../../components/button/SubmitBtn";
import { VALIDATIONS } from "../../../validations";
import { useGetLocations } from "../../../hooks/locations/query/useGetLocations.query";

interface IProps {
  type?: "add" | "edit";
  isLoading: boolean;
  handleSubmit: (values: Partial<TUser>) => void;
  initialValues: {
    userName: string;
    password: string;
    origin: string;
  };
}

const UserForm: React.FC<IProps> = ({
  type = "add",
  handleSubmit,
  initialValues,
  isLoading,
}) => {
  const { isLoading: locationLoading, data } = useGetLocations({ search: "" });

  const locations = useMemo(() => {
    if (!locationLoading && data) {
      return data.data.map((item: any) => {
        return item.location;
      });
    } else {
      return [];
    }
  }, [data, locationLoading]);

  const { classes } = useStyles();
  const formHandler = useForm({
    initialValues: initialValues,
    validate: yupResolver(
      type === "edit"
        ? VALIDATIONS.userEditValidation
        : VALIDATIONS.userValidation
    ),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });
  return (
    <form onSubmit={formHandler.onSubmit(handleSubmit)}>
      <Box my={15}>
        <TextInput
          classNames={{ input: classes.input }}
          style={{ borderColor: "red" }}
          withAsterisk
          type={"text"}
          placeholder="User Name"
          {...formHandler.getInputProps("userName")}
        />
      </Box>
      <Box my={15}>
        <Select
          placeholder="Enter Origin"
          data={locations}
          {...formHandler.getInputProps("origin")}
        />
      </Box>
      <Box my={15}>
        <TextInput
          classNames={{ input: classes.input }}
          withAsterisk
          type={"password"}
          placeholder="Password"
          {...formHandler.getInputProps("password")}
        />
      </Box>

      <Box mt={40}>
        <SubmitBtn loading={isLoading} label="Submit" />
      </Box>
    </form>
  );
};

export default memo(UserForm);

const useStyles = createStyles({
  input: { backgroundColor: COLORS.inputBg, borderColor: "#EBEBEB" },
});
