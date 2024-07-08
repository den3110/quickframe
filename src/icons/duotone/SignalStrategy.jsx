import { SvgIcon } from "@mui/material";
import React from "react";

const SignalStrategy = (props) => {
  return (
    <SvgIcon viewBox="0 0 24 21" {...props}>
      <path
        d="M5.9 17h12.19c1.9 0 2.9-1 2.9-2.9V2h-18v12.1C3 16 4 17 5.9 17ZM2 2h20M8 22l4-2v-3M16 22l-4-2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m7.5 11 3.15-2.63c.25-.21.58-.15.75.13l1.2 2c.17.28.5.33.75.13L16.5 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default SignalStrategy;
