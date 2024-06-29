import { Badge, Box, Button, Chip, Typography } from "@mui/material";
// CUSTOM COMPONENTS
import { Paragraph } from "components/typography";
import { FlexRowAlign } from "components/flexbox";
import { AvatarLoading } from "components/avatar-loading";
import { useContext } from "react";
import AuthContext from "contexts/AuthContext";
import { ConnectExchangeContext } from "hoc/CheckConnectExchange";
import { constant } from "constant/constant";
const InfoExchange = () => {
  const {user }= useContext(AuthContext)
  const { linked }= useContext(ConnectExchangeContext)
  return <FlexRowAlign flexDirection="column" py={5}>
      <Badge badgeContent="Free" color="primary">
        <AvatarLoading alt="user" percentage={60} src="/static/user/user-11.png" sx={{
        width: 50,
        height: 50
      }} />
      </Badge>

      <Box textAlign="center" pt={1.5} pb={3}>
        <Chip variant="outlined" label="60% Complete" size="small" />
        <Paragraph fontSize={16} fontWeight={600} mt={2}>
          Aaron Cooper
        </Paragraph>
        <Paragraph fontSize={13} fontWeight={500} color="text.secondary" mt={0.5}>
          aaron@example.com
        </Paragraph>
      </Box>

      <Button style={{backgroundColor: "rgb(50, 59, 73)"}} fullWidth>
        <Box sx={{width: "100%"}}>
          <Typography align="left" color={"rgb(238, 239, 242)"} fontSize={12} fontWeight={600} mb={1}>Linked Exchange</Typography>
          <img src={constant.API_URL + "/assets/exchange/" + linked?.exchange?.clientId + ".svg"} alt="Can't open" />
        </Box>
      </Button>
    </FlexRowAlign>;
};
export default InfoExchange;