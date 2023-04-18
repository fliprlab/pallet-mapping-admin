import { Box, Modal, Text, TextInput, createStyles } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import React, {
  ForwardedRef,
  forwardRef,
  memo,
  useImperativeHandle,
} from "react";
import { COLORS } from "../../../colors";
import { useForm, yupResolver } from "@mantine/form";
import SubmitBtn from "../../../components/button/SubmitBtn";
import { apiUrls } from "../../../hooks/api-urls";
import { showNotification } from "@mantine/notifications";
import { useAddUserMutation } from "../../../hooks/users/mutation/useAddUser.mutation";
import {
  IUserFormValues,
  UserInitialValues,
} from "../../../initial-values/user/user.values";
import { userValidation } from "../../../validations/user/user.validation";
import DynamicSelect from "../../../components/select/DynamicSelect";

interface IProps {
  paging: TPaging;
  search: string;
}

export interface IUserModalRef {
  toggleModal: () => void;
}

const UserModal = (props: IProps, ref: ForwardedRef<IUserModalRef>) => {
  const [opened, toggle] = useToggle();
  const { classes } = useStyles();

  const { isLoading, mutateAsync } = useAddUserMutation(
    props.search,
    props.paging
  );

  useImperativeHandle(
    ref,
    () => {
      return { toggleModal: toggle };
    },
    [toggle]
  );

  const formHandler = useForm({
    initialValues: UserInitialValues,
    validate: yupResolver(userValidation),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  const handleSubmit = async (values: IUserFormValues) => {
    const res = await mutateAsync({
      ...values,
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
            Add User
          </Text>
          <Text color={COLORS.lightGrey} size={12}>
            add up users information and details from here
          </Text>
        </Box>
        <Box>
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
              <DynamicSelect
                name="origin"
                formHandler={formHandler}
                label="Select Origin"
                url={apiUrls.GET_LOCATIONS}
                selectLabel="location"
                selectValue="_id"
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
        </Box>
      </Box>
    </Modal>
  );
};

export default memo(forwardRef(UserModal));

const useStyles = createStyles({
  input: { backgroundColor: COLORS.inputBg, borderColor: "#EBEBEB" },
});
