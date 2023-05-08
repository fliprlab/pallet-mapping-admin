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
import {
  HubAdminResetPassIniValues,
  IHubAdminResetPassIniValues,
} from "../../../initial-values/hub-admin/hub-admin.values";
import { useForm, yupResolver } from "@mantine/form";
import { hubAdminResetPassValidation } from "../../../validations/hub-admin/hub-admin.validation";
import SubmitBtn from "../../../components/button/SubmitBtn";

import { showNotification } from "@mantine/notifications";
import { useUpdateHubPassMutation } from "../../../hooks/hub-admin/mutation/useUpdateHubPass.mutation";

interface IProps {
  paging: TPaging;
  search: string;
}

export interface IUpdateHubPassModalRef {
  toggleModal: () => void;
  updateUserId: (_id: string) => void;
}

const UpdateHubPassModal = (
  props: IProps,
  ref: ForwardedRef<IUpdateHubPassModalRef>
) => {
  const [opened, toggle] = useToggle();
  const { classes } = useStyles();

  const [data, setData] = useState<string>("");

  const { isLoading, mutateAsync } = useUpdateHubPassMutation(
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
    initialValues: HubAdminResetPassIniValues,
    validate: yupResolver(hubAdminResetPassValidation),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  const handleSubmit = async (values: IHubAdminResetPassIniValues) => {
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

export default memo(forwardRef(UpdateHubPassModal));

const useStyles = createStyles({
  input: { backgroundColor: COLORS.inputBg, borderColor: "#EBEBEB" },
});
