const { Typography } = require("@mui/material");

const TxId = ({ row }) => {
    try {
      const openInNewTab = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
      };
  
      if (row.type === 'InternalWithdraw') {
        const obj = JSON.parse(row.txid);
  
        return <Typography sx={{ color: 'warning.main' }}> {obj.ReceiverNickName} </Typography>;
      }
  
      if (row.txid === '') return <></>;
      const data = JSON.parse(row.txid);
  
      if (!data.TransactionId) return <></>;
      return (
        <Typography
          sx={{ color: 'primary.main', cursor: 'pointer' }}
          onClick={() =>
            data.TransactionId.indexOf('0x') > -1 && openInNewTab(`https://bscscan.com/tx/${data.TransactionId}`)
          }
        >
          {data.TransactionId.indexOf('0x') > -1 ? `${data.TransactionId.substring(0, 8)}...` : data.TransactionId}
        </Typography>
      );
    } catch (e) {
      return <></>;
    }
  };

  export default TxId