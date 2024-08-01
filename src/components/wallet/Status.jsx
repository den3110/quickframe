import { Chip, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const Status = ({ row }) => {
    const {t }= useTranslation()
    const current = { status: 'eva:done-all-fill', color: 'success.main' };
    if (row.status === 'Processing' || row.status === 'Pending') {
      current.status = 'fluent-emoji:hourglass-done';
    }

    const renderColor= (color)=> {
        switch (color) {
            case "Succeed":
                return "success"
            case "REJECTED":
                return "error"
        case "PENDING":
                return "warning"
            default:
                break;
        }
      }
  
    return <>
        {/* <Typography fontSize={14}>{row?.status}</Typography> */}
        <Chip label={t(row.status)} color={renderColor(row.status)} sx={{height: 24}} />
    </>;
  };

  export default Status