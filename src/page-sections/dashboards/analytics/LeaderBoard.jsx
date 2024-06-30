import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/system";
import exchangeApi from "api/exchange/exchangeApi";

const StyledCard = styled(Card)(({ theme }) => ({
  textAlign: "center",
  margin: theme.spacing(2),
  padding: theme.spacing(2),
}));

const HeaderCard = styled(Card)(({ theme }) => ({
  textAlign: "center",
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: "#f5f5f5",
  color: theme.palette.text.secondary,
}));

const RankingBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(2),
  backgroundColor: "#fff",
  borderRadius: theme.shape.borderRadius,
}));

const AvatarWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: theme.spacing(1),
}));

const data = [
  {
    id: 1,
    name: "Nhật Minh Trader",
    value: "$49,076.00",
    percentage: "+934.78%",
    rank: 1,
  },
  {
    id: 2,
    name: "Roy Trần Invest CPT",
    value: "$48,584.50",
    percentage: "+971.69%",
    rank: 2,
  },
  {
    id: 3,
    name: "Duyên Trader",
    value: "$45,246.55",
    percentage: "+822.66%",
    rank: 3,
  },
  {
    id: 4,
    name: "HL07_GNR5k",
    value: "$10,842.50",
    percentage: "+216.85%",
    rank: 4,
  },
  {
    id: 5,
    name: "CTP Mastric Vip",
    value: "$7,495.95",
    percentage: "+166.57%",
    rank: 5,
  },
];

const StyledListItem = styled(ListItem)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(1),
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.background.paper,
  },
}));

const LeaderBoard = () => {
  const [dataUser, setDataUser] = useState([]);
  const [dataBot, setDataBot] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const result = await exchangeApi.userExchangeLinkAccountLeaderboard();
        console.log(result);
      } catch (error) {}
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const result = await exchangeApi.userBotLeaderboard();
        console.log(result);
      } catch (error) {}
    })();
  }, []);
  return (
    <Container>
      <Typography
        variant="h5"
        fontWeight={600}
        gutterBottom
        style={{
          background:
            "linear-gradient(rgb(219, 245, 53) 0%, rgb(127, 211, 98) 51.04%, rgb(23, 115, 70) 100%) text",
          "-webkit-text-fill-color": "transparent",
        }}
      >
        Gói hiệu quả hàng đầu
      </Typography>
      <Container style={{ background: "white" }}>
        <List>
          {data.map((item, index) => (
            <StyledListItem key={index} style={{ cursor: "pointer" }}>
              <Box display="flex" alignItems="center">
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{ marginRight: 2 }}
                >
                  #{item.rank}
                </Typography>
                {item.rank === 1 && (
                  <img
                    src="https://quickinvest.ai/img/icons/rank-1.png"
                    style={{ width: 28, marginRight: 10 }}
                    alt="Can't open"
                  />
                )}
                {item.rank === 2 && (
                  <img
                    src="https://quickinvest.ai/img/icons/rank-2.png"
                    style={{ width: 28, marginRight: 10 }}
                    alt="Can't open"
                  />
                )}
                {item.rank === 3 && (
                  <img
                    src="https://quickinvest.ai/img/icons/rank-3.png"
                    style={{ width: 28, marginRight: 10 }}
                    alt="Can't open"
                  />
                )}
                <ListItemAvatar>
                  <Avatar alt={item.name} src={item.avatar} />
                </ListItemAvatar>
                <ListItemText primary={item.name} />
              </Box>
              <Box display="flex" alignItems={"center"} gap={1}>
                <Typography
                  variant="body1"
                  color="textPrimary"
                  style={{
                    background: "rgb(238, 239, 242)",
                    padding: 4,
                    borderRadius: 10,
                  }}
                >
                  {item.percentage}
                </Typography>
                <Typography
                  variant="body1"
                  color="textPrimary"
                  style={{
                    background: "rgb(238, 239, 242)",
                    padding: 4,
                    borderRadius: 10,
                  }}
                >
                  {item.value}
                </Typography>
              </Box>
            </StyledListItem>
          ))}
        </List>
      </Container>
      <Typography
        variant="h5"
        gutterBottom
        fontWeight={600}
        style={{
          background:
            "linear-gradient(rgb(219, 245, 53) 0%, rgb(127, 211, 98) 51.04%, rgb(23, 115, 70) 100%) text",
          "-webkit-text-fill-color": "transparent",
        }}
      >
        Bảng xếp hạng nhà đầu tư hàng ngày
      </Typography>
      <Container style={{ background: "white" }}>
        <List>
          {data.map((item, index) => (
            <StyledListItem key={index} style={{ cursor: "pointer" }}>
              <Box display="flex" alignItems="center">
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{ marginRight: 2 }}
                >
                  #{item.rank}
                </Typography>
                {item.rank === 1 && (
                  <img
                    src="https://quickinvest.ai/img/icons/rank-1.png"
                    style={{ width: 28, marginRight: 10 }}
                    alt="Can't open"
                  />
                )}
                {item.rank === 2 && (
                  <img
                    src="https://quickinvest.ai/img/icons/rank-2.png"
                    style={{ width: 28, marginRight: 10 }}
                    alt="Can't open"
                  />
                )}
                {item.rank === 3 && (
                  <img
                    src="https://quickinvest.ai/img/icons/rank-3.png"
                    style={{ width: 28, marginRight: 10 }}
                    alt="Can't open"
                  />
                )}
                <ListItemAvatar>
                  <Avatar alt={item.name} src={item.avatar} />
                </ListItemAvatar>
                <ListItemText primary={item.name} />
              </Box>
              <Typography
                variant="body1"
                color="textPrimary"
                style={{
                  background: "rgb(238, 239, 242)",
                  padding: 4,
                  borderRadius: 10,
                }}
              >
                {item.percentage}
              </Typography>
            </StyledListItem>
          ))}
        </List>
      </Container>
    </Container>
  );
};

export default LeaderBoard;
