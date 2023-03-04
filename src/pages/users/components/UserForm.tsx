import { Box, TextInput, createStyles } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { memo } from "react";
import { COLORS } from "../../../colors";
import SubmitBtn from "../../../components/button/SubmitBtn";
import {
  userEditValidation,
  userValidation,
} from "../../../validations/user/user.validation";

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
  const { classes } = useStyles();
  const formHandler = useForm({
    initialValues: initialValues,
    validate: yupResolver(
      type === "edit" ? userEditValidation : userValidation
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
        <TextInput
          classNames={{ input: classes.input }}
          withAsterisk
          type={"text"}
          placeholder="Origin"
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
