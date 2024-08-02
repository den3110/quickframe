import { Chip, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const Status = (props) => {
  const { status } = props?.item;
  const { t } = useTranslation();
  const renderColor = (color) => {
    switch (color) {
      case "Succeed":
        return "success";
      case "REJECTED":
        return "error";
      case "PENDING":
        return "warning";
      default:
        break;
    }
  };

  return (
    <>
      {/* <Typography fontSize={14}>{row?.status}</Typography> */}
      <Chip label={t(status)} color={renderColor(status)} sx={{ height: 24 }} />
    </>
  );
};

export default Status;
