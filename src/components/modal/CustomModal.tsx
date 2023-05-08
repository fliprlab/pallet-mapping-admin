import { Box, Modal, Text } from "@mantine/core";
import React, {
  memo,
  useState,
  ReactNode,
  useImperativeHandle,
  ForwardedRef,
  forwardRef,
  useCallback,
} from "react";
import { COLORS } from "../../colors";

interface IProps {
  children: ReactNode;
  title: string;
  subTitle?: string;
  size?: number;
  onClose?: () => void;
}

export interface ICustomModalRef {
  toggleModal: () => void;
}

const CustomModal = (props: IProps, ref: ForwardedRef<ICustomModalRef>) => {
  const { children, title, subTitle, size = 612, onClose } = props;
  const [show, setShow] = useState(false);

  const toggleModal = useCallback(() => setShow((value) => !value), []);
  useImperativeHandle(
    ref,
    () => {
      return { toggleModal };
    },
    [toggleModal]
  );

  return (
    <Modal
      opened={show}
      onClose={() => {
        onClose && onClose();
        toggleModal();
      }}
      withCloseButton={false}
      centered
      size={size}
    >
      <Box p={50}>
        <Box mb={30}>
          <Text color={COLORS.black} size={18}>
            {title}
          </Text>
          {subTitle && (
            <Text color={COLORS.lightGrey} size={12}>
              {subTitle}
            </Text>
          )}
        </Box>
        {children}
      </Box>
    </Modal>
  );
};

export default memo(forwardRef(CustomModal));
