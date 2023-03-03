import React from "react";

import { ThemeIcon, UnstyledButton, Group, Text } from "@mantine/core";
import { naves } from "./navs";
import { useMatch, useNavigate } from "react-router-dom";

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  to: string;
}

const MainLink = ({ icon, color, label, to }: MainLinkProps) => {
  const navigate = useNavigate();
  const match = useMatch(to);
  return (
    <UnstyledButton
      onClick={() => navigate(to)}
      sx={(theme) => ({
        background: Boolean(match) ? "#1AC2D9" : theme.white,
        display: "block",
        width: "100%",
        padding: 8,
        marginBottom: 5,
        borderRadius: theme.radius.sm,
        color: Boolean(match) ? theme.white : theme.black,
        fontWeight: "bold",
      })}
    >
      <Group>
        <ThemeIcon size={"md"} color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
};

export const MainLinks = () => {
  const links = naves.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
};
