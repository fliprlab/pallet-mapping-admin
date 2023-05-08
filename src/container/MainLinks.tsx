import React from "react";
import { UnstyledButton, Group, Text, Box } from "@mantine/core";
import { naves } from "./navs";
import { useMatch, useNavigate } from "react-router-dom";
import { COLORS } from "../colors";
import { ICONS } from "../icons";

interface MainLinkProps {
  icon: string;
  activeIcon: string;
  label: string;
  to: string;
  hidden: boolean;
  disabled?: boolean;
}

const MainLink = ({
  icon,
  label,
  to,
  hidden,
  activeIcon,
  disabled = false,
}: MainLinkProps) => {
  const navigate = useNavigate();
  const match = useMatch(to);
  return (
    <UnstyledButton
      disabled={disabled}
      onClick={() => navigate(to)}
      sx={(theme) => ({
        display: "block",
        width: "100%",
        paddingTop: 8,
        marginBottom: 30,
        borderRadius: theme.radius.sm,
        fontWeight: "bold",
        position: "relative",
        minWidth: "max-content",
      })}
    >
      <Group>
        <img
          src={Boolean(match) ? activeIcon : icon}
          style={{ width: 20 }}
          alt="section icon"
        />

        <Text
          size={16}
          weight="500"
          color={Boolean(match) ? COLORS.secondary : COLORS.white}
          sx={{ opacity: hidden ? 0 : 1, transition: "all 300ms" }}
        >
          {label}
        </Text>
      </Group>

      {Boolean(match) && (
        <Box
          sx={{
            position: "absolute",
            top: "calc(50% - 6.5px)",
            left: "-1.5em",
          }}
        >
          <img src={ICONS.polygon} alt="arrow" width={8} />
        </Box>
      )}
    </UnstyledButton>
  );
};

export const MainLinks = (props: { hidden: boolean }) => {
  const links = naves.map((link) => (
    <MainLink {...link} key={link.label} hidden={props.hidden} />
  ));
  return <div>{links}</div>;
};
