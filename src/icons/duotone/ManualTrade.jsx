import { SvgIcon } from "@mui/material";
import React from "react";

const ManualTrade = (props) => {
  return (
    <SvgIcon viewBox="0 0 24 21" {...props}>
      <path
        d="m3 17.98 2.55.01c.91 0 1.76-.45 2.26-1.2l6.39-9.58a2.69 2.69 0 0 1 2.26-1.2l4.55.02M19 19.98l2-2M8.89 8.62l-1.08-1.5A2.675 2.675 0 0 0 5.61 6L3 6.01M12.97 15.38l1.22 1.57c.51.66 1.31 1.05 2.15 1.05l4.67-.02M21 6.02l-2-2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default ManualTrade;
