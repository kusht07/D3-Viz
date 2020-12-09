import React, { useState, useEffect } from "react";
import { Box, Heading, TextInput, Text } from "grommet";
import SortedBarChart from "./SortedBarChart";

export default function Dashboard({ gridArea }) {
  const len = 26;
  const min = -10;
  const max = 90;
  let newArray = [];
  for (let i = 0, t = len; i < t; i++) {
    newArray.push(Number(Math.floor(Math.random() * (max - -min + 1)) + -min));
  }
  const [input, setInput] = useState(5);
  const [randomArray, setRandomArray] = useState(newArray.join());

  useEffect(() => {
    updateStorage();
  });

  const updateStorage = () => {
    for (let i = 0, t = len; i < t; i++) {
      newArray.push(
        Number(Math.floor(Math.random() * (max - -min + 1)) + -min)
      );
    }
    if (input && !sessionStorage.getItem(input))
      sessionStorage.setItem(input, newArray);

    if (input && sessionStorage.getItem(input))
      setRandomArray(sessionStorage.getItem(input));
  };

  const updateInput = (event) => {
    const value = event.target.value;
    console.log(Number(value));
    if (Number(value) <= 10 && Number(value) >= 1) setInput(value.trim());
    if (value.length < 1) setInput(value.trim());
  };

  return (
    <Box pad="medium" gap="medium" overflow="hidden" gridArea={gridArea}>
      <Box
        width="100%"
        height="100%"
        pad="medium"
        overflow="auto"
        elevation="medium"
      >
        <Box pad={{ bottom: "medium" }} gap="small" direction="row">
          <Heading level={3} size="small" margin="small" color="brand">
            Input :
          </Heading>
          <Box>
            <TextInput value={input} onChange={updateInput} />
            <Box>
              <Text> Enter Value between 1-10</Text>
            </Box>
          </Box>
        </Box>
        <StyledBox>
          <SortedBarChart yData={randomArray} min={min} max={max} len={len} />
        </StyledBox>
      </Box>
    </Box>
  );
}

const StyledBox = ({ children }) => (
  <Box
    pad="small"
    margin={{ top: "medium", left: "small", right: "medium" }}
    gap="small"
    flex="grow"
  >
    {children}
  </Box>
);
