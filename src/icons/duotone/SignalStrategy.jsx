import { SvgIcon } from "@mui/material";
import React from "react";

const SignalStrategy = (props) => {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M14.5 21q-1.25 0-2.125-.875T11.5 18t.875-2.125T14.5 15t2.125.875T17.5 18t-.875 2.125T14.5 21m2-7q-2.3 0-3.9-1.6T11 8.5t1.6-3.9T16.5 3t3.9 1.6T22 8.5t-1.6 3.9t-3.9 1.6M7 18q-1.65 0-2.825-1.175T3 14t1.175-2.825T7 10t2.825 1.175T11 14t-1.175 2.825T7 18"
      />
    </SvgIcon>
  );
};

export default SignalStrategy;
