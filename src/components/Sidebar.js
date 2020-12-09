import { Sidebar as GSide, Nav, Box } from "grommet";
import React from "react";
import { Menu, BarChart } from "grommet-icons";

export default function Sidebar({ gridArea }) {
  const ICON_SIZE = "36px";

  return (
    <GSide
      width="100%"
      gridArea={gridArea}
      background="brand-2"
      header={
        <Box onClick={() => (window.location.href = "/")}>
          <Menu size={ICON_SIZE} color="accent-1" />
        </Box>
      }
      align="center"
    >
      <Nav>
        <Box onClick={() => (window.location.href = "/")}>
          <BarChart size={ICON_SIZE} color="brand" />
        </Box>
      </Nav>
    </GSide>
  );
}
