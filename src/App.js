import React, { useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";

import { theme } from "./styling/theme";

import { Grommet, Grid } from "grommet";

const App = () => {
  // useEffect(() => {
  //   sessionStorage.clear();
  // });

  return (
    <Grommet className="App" full theme={theme}>
      <Grid
        fill
        rows={["60px", "auto"]}
        columns={["70px", "auto"]}
        areas={[
          { name: "header", start: [1, 0], end: [1, 0] },
          { name: "nav", start: [0, 0], end: [0, 1] },
          { name: "main", start: [1, 1], end: [1, 1] },
        ]}
      >
        <Header gridArea="header" />
        <Sidebar gridArea="nav" />
        <Dashboard gridArea="main" />
      </Grid>
    </Grommet>
  );
};
export default App;
