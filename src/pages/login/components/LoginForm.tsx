import { Box, TextInput } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import React, { memo, useCallback } from "react";
import SubmitBtn from "../../../components/button/SubmitBtn";
import { useLoginMutation } from "../../../hooks/auth/useLoginMutation";
import { ILoginFormValues } from "../../../initial-values/login/login.values";
import { VALIDATIONS } from "../../../validations";
import { INITIALVALUES } from "../../../initial-values";

interface IProps {
  refetch: any;
  hubRefetch: any;
}

const LoginForm: React.FC<IProps> = ({ refetch, hubRefetch }) => {
  const { mutateAsync, isLoading } = useLoginMutation();
  const formHandler = useForm({
    initialValues: INITIALVALUES.loginInitialValues,
    validate: yupResolver(VALIDATIONS.loginValidation),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  const handleLogin = useCallback(
    async (values: ILoginFormValues) => {
      const res = await mutateAsync(values);
      if (res.status === "success") {
        formHandler.reset();
        const secret: any = process.env.REACT_APP_SECRET_KEY;
        sessionStorage.setItem(secret, res.data);
        sessionStorage.setItem("role", res.extraData ?? "undefined");

        if (res.extraData === "admin") {
          refetch();
        } else if (res.extraData === "hub-admin") {
          hubRefetch();
        } else {
          showNotification({
            message: "Invalid Role.",
            color: "red",
          });
        }
      } else {
        showNotification({
          message: res.data.message,
          color: "red",
        });
      }
    },
    [mutateAsync, formHandler, refetch, hubRefetch]
  );

  return (
    <form onSubmit={formHandler.onSubmit(handleLogin)}>
      <Box my={15}>
        <TextInput
          withAsterisk
          type={"text"}
          placeholder="Username"
          {...formHandler.getInputProps("username")}
        />
      </Box>
      <Box my={15}>
        <TextInput
          withAsterisk
          type={"password"}
          placeholder="Password"
          {...formHandler.getInputProps("password")}
        />
      </Box>

      <Box mt={35}>
        <SubmitBtn label="Submit" type="secondary" loading={isLoading} />
      </Box>
    </form>
  );
};

export default memo(LoginForm);
