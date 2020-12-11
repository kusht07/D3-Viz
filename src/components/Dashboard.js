import React, { useState, useEffect } from "react";
import { Box, Heading, TextInput, Text } from "grommet";
import SortedBarChart from "./SortedBarChart";

export default function Dashboard({ gridArea }) {
  const len = 26;
  const min = 10;
  const max = 90;
  const [input, setInput] = useState(5);
  const [randomArray, setRandomArray] = useState("");

  useEffect(() => {
    updateStorage(input);
  }, [input]);

  const updateStorage = (input) => {
    let newArray = [];
    for (let i = 0; i < len; i++) {
      let num = Number(Math.floor(Math.random() * (max + min + 1)) - min);
      newArray.push(num);
    }
    if (input) {
      if (!sessionStorage.getItem(input))
        sessionStorage.setItem(input, newArray);
      else setRandomArray(sessionStorage.getItem(input));
    }
  };

  const updateInput = (event) => {
    const value = event.target.value;
    if ((Number(value) <= 10 && Number(value) >= 1) || value.length < 1) {
      setInput(value.trim());
    }
  };

  return (
    <Box pad="medium" gap="medium" gridArea={gridArea}>
      <Box
        width="100%"
        height="100%"
        pad="medium"
        overflow="auto"
        elevation="medium"
      >
        <Box pad={{ bottom: "medium" }} gap="medium" direction="row">
          <Heading level={3} size="small" margin="small" color="brand">
            Input:
          </Heading>
          <Box gap="xsmall">
            <TextInput value={input} onChange={updateInput} />
            <Box>
              <Text size="small"> Enter Value between 1-10</Text>
            </Box>
          </Box>
        </Box>
        <StyledBox>
          {randomArray && (
            <SortedBarChart yData={randomArray} min={min} max={max} />
          )}
        </StyledBox>
      </Box>
    </Box>
  );
}

const StyledBox = ({ children }) => (
  <Box
    pad="small"
    margin={{ top: "medium", left: "small", right: "medium" }}
    flex="grow"
  >
    {children}
  </Box>
);
