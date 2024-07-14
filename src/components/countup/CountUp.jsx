import { Typography } from "@mui/material";
import React from "react";
import CountUp from "react-countup";

const CountUpComponent = ({ number }) => {
  return (
    <CountUp end={number} decimal={"2"}>
      {({ countUpRef }) => <Typography ref={countUpRef} />}
    </CountUp>
  );
};

export default CountUpComponent;
