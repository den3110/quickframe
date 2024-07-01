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
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import exchangeApi from "api/exchange/exchangeApi";
import { isDark } from "utils/constants";
import { Swiper, SwiperSlide } from "swiper/react";

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
      } catch (error) {}
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const result = await exchangeApi.userBotLeaderboard();
      } catch (error) {}
    })();
  }, []);
  return (
    <Container>
      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        pagination={{ clickable: true }}
        style={{ paddingBottom: "20px", overflowY: "unset" }}
        className="waa"
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <Box
              style={{
                padding: "20px",
                height: "100%",
              }}
            >
            {theme=> console.log(theme)}
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ width: "100%" }}
                style={{
                  borderRadius: "8px",
                  padding: "20px",
                  textAlign: "center",
                  height: "100%",
                  background: theme=> isDark(theme) ? "white" : "rgb(31, 41, 55)",
                  boxShadow: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
                }}
                position={"relative"}
              >
                <Box position={"absolute"} style={{width: "100%", height: "50%", background: "linear-gradient(rgba(255, 190, 63, 0.8) -38%, rgba(255, 202, 98, 0) 69.51%)", top: 0, left: 0, borderRadius: 8}}></Box>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  
                >
                  <img
                    style={{ position: "relative", top: -40, zIndex: 10 }}
                    src="https://quickinvest.ai/img/icons/rank-1.png"
                  />
                </Box>
                <Typography variant="subtitle1" color="textSecondary">
                  #{item.rank}
                </Typography>
                <Typography variant="h6" color="textPrimary">
                  {item.name}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  PnL 24h {item.pnl}
                </Typography>
                <Typography
                  variant="h5"
                  color="textPrimary"
                  style={{ margin: "10px 0" }}
                >
                  {item.amount}
                </Typography>
                <Button variant="outlined">Gói riêng tư</Button>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
      <Typography
        variant="h5"
        fontWeight={600}
        gutterBottom
        style={{
          background:
            "linear-gradient(rgb(221 255 0) 0%, rgb(65 255 0) 3.04%, rgb(23 73 48) 100%) text",
          "-webkit-text-fill-color": "transparent",
        }}
      >
        Gói hiệu quả hàng đầu
      </Typography>
      <Container>
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
                    background: !isDark ? "#d7d7d9" : "#7d818d",
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
                    background: !isDark ? "#d7d7d9" : "#7d818d",
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
            "linear-gradient(rgb(221 255 0) 0%, rgb(65 255 0) 3.04%, rgb(23 73 48) 100%) text",
          "-webkit-text-fill-color": "transparent",
        }}
      >
        Bảng xếp hạng nhà đầu tư hàng ngày
      </Typography>
      <Container>
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
                  background: !isDark ? "#d7d7d9" : "#7d818d",
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
