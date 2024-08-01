const { Typography } = require("@mui/material");

const Memo = ({ row }) => {
    try {
      return <Typography>{row.memo}</Typography>;
    } catch (e) {
      return <></>;
    }
  };

  export default Memo