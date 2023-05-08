import { Box, Modal, Text, TextInput, createStyles } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import React, {
  ForwardedRef,
  forwardRef,
  memo,
  useImperativeHandle,
  useState,
} from "react";
import { COLORS } from "../../../colors";
import { useForm, yupResolver } from "@mantine/form";

import SubmitBtn from "../../../components/button/SubmitBtn";

import { showNotification } from "@mantine/notifications";

import {
  IUserResetPassIniValues,
  UserResetPassIniValues,
} from "../../../initial-values/user/user.values";
import { userResetPassValidation } from "../../../validations/user/user.validation";
import { useUpdateUserPassMutation } from "../../../hooks/users/mutation/useUpdateUserPass.mutation";

interface IProps {
  paging: TPaging;
  search: string;
}

export interface IUpdateUserPassModalRef {
  toggleModal: () => void;
  updateUserId: (_id: string) => void;
}

const UpdateUserPassModal = (
  props: IProps,
  ref: ForwardedRef<IUpdateUserPassModalRef>
) => {
  const [opened, toggle] = useToggle();
  const { classes } = useStyles();

  const [data, setData] = useState<string>("");

  const { isLoading, mutateAsync } = useUpdateUserPassMutation(
    props.search,
    props.paging
  );

  useImperativeHandle(
    ref,
    () => {
      return { toggleModal: toggle, updateUserId: (_id) => setData(_id) };
    },
    [toggle]
  );

  const formHandler = useForm({
    initialValues: UserResetPassIniValues,
    validate: yupResolver(userResetPassValidation),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  const handleSubmit = async (values: IUserResetPassIniValues) => {
    const res = await mutateAsync({
      _id: data,
      password: values.password,
    });
    if (res.status === "success") {
      showNotification({ message: res.message, color: "green" });
      formHandler.reset();
      toggle();
    } else {
      showNotification({ message: res.data.message, color: "red" });
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={toggle}
      withCloseButton={false}
      centered
      size={612}
    >
      <Box p={50}>
        <Box mb={30}>
          <Text color={COLORS.black} size={18}>
            Update Password
          </Text>
          <Text color={COLORS.lightGrey} size={12}>
            update hub admin new password
          </Text>
        </Box>
        <Box>
          <form onSubmit={formHandler.onSubmit(handleSubmit)}>
            <Box my={15}>
              <TextInput
                classNames={{ input: classes.input }}
                withAsterisk
                type={"password"}
                placeholder="New Password"
                {...formHandler.getInputProps("password")}
              />
            </Box>
            <Box my={15}>
              <TextInput
                classNames={{ input: classes.input }}
                withAsterisk
                type={"password"}
                placeholder="Confirm Password"
                {...formHandler.getInputProps("confirm_password")}
              />
            </Box>

            <Box mt={40}>
              <SubmitBtn loading={isLoading} label="Submit" />
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  );
};

export default memo(forwardRef(UpdateUserPassModal));

const useStyles = createStyles({
  input: { backgroundColor: COLORS.inputBg, borderColor: "#EBEBEB" },
});
