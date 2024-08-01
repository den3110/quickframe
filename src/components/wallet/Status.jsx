import { Icon, Typography } from "@mui/material";

const Status = ({ row }) => {
    const current = { status: 'eva:done-all-fill', color: 'success.main' };
    if (row.status === 'Processing' || row.status === 'Pending') {
      current.status = 'fluent-emoji:hourglass-done';
    }
  
    return <Typography fontSize={14}>{row?.status}</Typography>;
  };

  export default Status