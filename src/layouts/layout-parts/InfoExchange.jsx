import { Badge, Box, Button, Chip, Typography } from "@mui/material";
// CUSTOM COMPONENTS
import { Paragraph } from "components/typography";
import { FlexRowAlign } from "components/flexbox";
import { AvatarLoading } from "components/avatar-loading";
import { useContext } from "react";
import AuthContext from "contexts/AuthContext";
import { ConnectExchangeContext } from "hoc/CheckConnectExchange";
import { constant } from "constant/constant";
import { useNavigate } from "react-router-dom";
const InfoExchange = () => {
  const {user }= useContext(AuthContext)
  const { linked }= useContext(ConnectExchangeContext)
  const navigate= useNavigate()

  return <FlexRowAlign flexDirection="column" py={5}>
      
      <Button onClick={()=> {
        navigate("/dashboard/profile?tab=2")
      }} style={{backgroundColor: "rgb(50, 59, 73)"}} fullWidth>
        <Box sx={{width: "100%"}}>
          <Typography align="left" color={"rgb(238, 239, 242)"} fontSize={12} fontWeight={600} mb={1}>Linked Exchange</Typography>
          <img src={constant.API_URL + "/assets/exchange/" + linked?.exchange?.clientId + ".svg"} alt="Can't open" />
        </Box>
      </Button>
    </FlexRowAlign>;
};
export default InfoExchange;