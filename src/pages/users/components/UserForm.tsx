import { Box, TextInput, createStyles } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { memo } from "react";
import { COLORS } from "../../../colors";
import SubmitBtn from "../../../components/button/SubmitBtn";
import { userValidation } from "../../../validations/user/user.validation";

interface IProps {
  handleSubmit: () => void;
  initialValues: {
    name: string;
    password: string;
    origin: string;
  };
}

const UserForm: React.FC<IProps> = ({ handleSubmit, initialValues }) => {
  const { classes } = useStyles();
  const formHandler = useForm({
    initialValues: initialValues,
    validate: yupResolver(userValidation),
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
          type={"email"}
          placeholder="User Name"
          {...formHandler.getInputProps("name")}
        />
      </Box>
      <Box my={15}>
        <TextInput
          classNames={{ input: classes.input }}
          withAsterisk
          type={"string"}
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
        <SubmitBtn label="Submit" />
      </Box>
    </form>
  );
};

export default memo(UserForm);

const useStyles = createStyles({
  input: { backgroundColor: COLORS.inputBg, borderColor: "#EBEBEB" },
});
