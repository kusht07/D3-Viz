import React from "react";
import { Header as GHeader, Heading, Box } from "grommet";

export default function Header({ gridArea }) {
  return (
    <GHeader
      height="100%"
      gridArea={gridArea}
      background="brand"
      elevation="small"
    >
      <Box pad="medium">
        <Heading level={3} color="light-2">
          D3 Viz
        </Heading>
      </Box>
    </GHeader>
  );
}
