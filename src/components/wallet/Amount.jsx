const { Typography } = require("@mui/material");

const Amount = ({ row }) => {
    try {
      const current = { color: 'success.main' };
      if (row.type.indexOf('Withdraw') > -1 || row.type.indexOf('BUY') > -1) {
        current.color = 'error.main';
      }
  
      return (
        <Typography sx={{ color: current.color }}>
          {row.type.indexOf('Withdraw') > -1 || row.type.indexOf('BUY') > -1
            ? `-${parseFloat(row.amount.toFixed(6))}`
            : `+${parseFloat(row.amount.toFixed(6))}`}
        </Typography>
      );
    } catch (e) {
      return <></>;
    }
  };

  export default Amount