import React, { Fragment, useEffect, useState } from "react";
import {
  Typography,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/system";
import exchangeApi from "api/exchange/exchangeApi";
import { isDark } from "utils/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import BunnyStar from "icons/BunnyStar";
import FlickAnimate from "icons/FlickAnimate";
import MoreInfo from "icons/MoreInfo";
import RankingLeaderBoard from "page-sections/leaderboard/RankingLeaderBoard";

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
  const downLg = useMediaQuery(theme => theme.breakpoints.down("lg"));
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

  const renderBackgroundLeaderBoardBot = (rank) => {
    switch (rank) {
      case 1:
        return "linear-gradient(rgba(255, 190, 63, 0.8) -38%, rgba(255, 202, 98, 0) 69.51%)";
      case 2:
        return "linear-gradient(rgba(91, 96, 132, 0.8) 0%, rgba(238, 239, 242, 0) 83.25%)";
      case 3:
        return "linear-gradient(rgba(13, 151, 110, 0.8) 0%, rgba(238, 239, 242, 0) 83.25%)";
      default:
        return "linear-gradient(rgba(160, 174, 192, 0.79) 0%, rgba(238, 239, 242, 0) 83.25%)";
    }
  };

  return (
    <Box sx={{ width: "100%", padding: "10px" }}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography
          variant="h4"
          fontWeight={600}
          gutterBottom
          style={{
            background:
              "linear-gradient(rgb(221 255 0) 0%, rgb(65 255 0) 3.04%, rgb(23 73 48) 100%) text",
            WebkitTextFillColor: "transparent",
          }}
          mt={1}
          mb={1}
        >
          Gói hiệu quả hàng đầu <BunnyStar />
        </Typography>
        <Fragment>
          <Tooltip title="Vuốt sang trái để xem thêm gói">
            <FlickAnimate />
          </Tooltip>
        </Fragment>
      </Box>
      <Swiper
        spaceBetween={20}
        pagination={{ clickable: true }}
        style={{ paddingBottom: "20px", overflowY: "unset" }}
        className="waa"
        breakpoints={{
          // when window width is >= 640px
          300: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <Box
              style={{
                padding: "20px 0",
                height: "100%",
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{
                  width: "100%",
                  background: (theme) =>
                    isDark(theme) ? "rgb(31, 41, 55)" : "white",
                }}
                style={{
                  borderRadius: "8px",
                  padding: "20px 0",
                  textAlign: "center",
                  height: "100%",
                  boxShadow: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
                }}
                position={"relative"}
              >
                <Box
                  position={"absolute"}
                  style={{
                    width: "100%",
                    height: "50%",
                    background: renderBackgroundLeaderBoardBot(item.rank),
                    top: 0,
                    left: 0,
                    borderRadius: 8,
                  }}
                ></Box>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  {item.rank === 1 && (
                    <img
                      style={{
                        position: "relative",
                        top: -40,
                        zIndex: 10,
                        width: 45,
                      }}
                      src="https://quickinvest.ai/img/icons/rank-1.png"
                      alt="Can't open"
                    />
                  )}
                  {item.rank === 2 && (
                    <img
                      style={{
                        position: "relative",
                        top: -40,
                        zIndex: 10,
                        width: 45,
                      }}
                      src="https://quickinvest.ai/img/icons/rank-2.png"
                      alt="Can't open"
                    />
                  )}
                  {item.rank === 3 && (
                    <img
                      style={{
                        position: "relative",
                        top: -40,
                        zIndex: 10,
                        width: 45,
                      }}
                      src="https://quickinvest.ai/img/icons/rank-3.png"
                      alt="Can't open"
                    />
                  )}
                  {item.rank !== 1 && item.rank !== 2 && item.rank !== 3 && (
                    <>
                      <Box
                        style={{ position: "relative", top: -40, zIndex: 10 }}
                      >
                        <Box
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          sx={{ width: 40, height: 50 }}
                        >
                          <Box
                            display="flex"
                            justifyContent={"center"}
                            alignItems={"center"}
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: "50%",
                              background: "rgb(160, 174, 192)",
                            }}
                          >
                            {item.rank}
                          </Box>
                        </Box>
                      </Box>
                    </>
                  )}
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
        variant="h4"
        gutterBottom
        fontWeight={600}
        mt={9}
        mb={9}
        style={{
          background:
            "linear-gradient(rgb(221 255 0) 0%, rgb(65 255 0) 3.04%, rgb(23 73 48) 100%) text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Bảng xếp hạng nhà đầu tư hàng ngày <MoreInfo />
      </Typography>
      <Box className="asjkasjaqw">
        <Box sx={{padding: downLg ? "0" : "0 48px"}} flexDirection={downLg ? "column": "row"} display={"flex"} alignItems={"flex-end"} justifyContent={"space-between"} gap={downLg ? 5 : 11}>
        {downLg && <RankingLeaderBoard heightRanking={268} isTop1={true} name={"JennyTrader3"} imgRank={"https://quickinvest.ai/img/icons/rank-1.png"} avatarUser={"https://api.quickinvest.ai/v1/plans/user/user-photo?id=CfDJ8ENcw2Vgni1Il0gIyDJ_y-b0PnJYPPaUqqsBFse3eRxDBlHs4aPyZJnpv5jf4bCnQv8FkF8_nd1khnwenTA7en-mrtscPr8wqvfyELHYMgt62DMRWsjzg_imFiCnQnc86ThLFLGPY0EvyvtYrqqiehMZmGBur3FMeSplJvhYYzIEc62Hp1zk0WdEWrrgoLlj1hKUBVxF-1ISMHAw5yHk2CXL5KfON_lDK5TNeBrrs3m36Qm-whJfLUxPMbx0MzWDT5z6Qe-5COwse0z6FCOfa5eQdtRA9JAqzgwHyB_bguly"} bgRadient="linear-gradient(95.4deg, rgba(216, 146, 41, 0.89) 6.95%, rgba(165, 138, 0, 0.176) 100%)" border="3.28125px solid rgb(255, 222, 101)" />} 
          <RankingLeaderBoard heightRanking={233} isTop1={false} name={"JennyTrader3"} imgRank={"https://quickinvest.ai/img/icons/rank-2.png"} avatarUser={"https://api.quickinvest.ai/v1/plans/user/user-photo?id=CfDJ8ENcw2Vgni1Il0gIyDJ_y-b0PnJYPPaUqqsBFse3eRxDBlHs4aPyZJnpv5jf4bCnQv8FkF8_nd1khnwenTA7en-mrtscPr8wqvfyELHYMgt62DMRWsjzg_imFiCnQnc86ThLFLGPY0EvyvtYrqqiehMZmGBur3FMeSplJvhYYzIEc62Hp1zk0WdEWrrgoLlj1hKUBVxF-1ISMHAw5yHk2CXL5KfON_lDK5TNeBrrs3m36Qm-whJfLUxPMbx0MzWDT5z6Qe-5COwse0z6FCOfa5eQdtRA9JAqzgwHyB_bguly"} bgRadient="linear-gradient(272.63deg, rgb(194, 194, 194) -33.55%, rgb(79, 86, 112) 96.85%)" border="3.28125px solid rgb(160, 174, 192)" />
          {/*  */}
          {!downLg && <RankingLeaderBoard heightRanking={268} isTop1={true} name={"JennyTrader3"} imgRank={"https://quickinvest.ai/img/icons/rank-1.png"} avatarUser={"https://api.quickinvest.ai/v1/plans/user/user-photo?id=CfDJ8ENcw2Vgni1Il0gIyDJ_y-b0PnJYPPaUqqsBFse3eRxDBlHs4aPyZJnpv5jf4bCnQv8FkF8_nd1khnwenTA7en-mrtscPr8wqvfyELHYMgt62DMRWsjzg_imFiCnQnc86ThLFLGPY0EvyvtYrqqiehMZmGBur3FMeSplJvhYYzIEc62Hp1zk0WdEWrrgoLlj1hKUBVxF-1ISMHAw5yHk2CXL5KfON_lDK5TNeBrrs3m36Qm-whJfLUxPMbx0MzWDT5z6Qe-5COwse0z6FCOfa5eQdtRA9JAqzgwHyB_bguly"} bgRadient="linear-gradient(95.4deg, rgba(216, 146, 41, 0.89) 6.95%, rgba(165, 138, 0, 0.176) 100%)" border="3.28125px solid rgb(255, 222, 101)" />}
          {/*  */}
          <RankingLeaderBoard heightRanking={210} isTop1={false} name={"JennyTrader3"} imgRank={"https://quickinvest.ai/img/icons/rank-3.png"} avatarUser={"https://api.quickinvest.ai/v1/plans/user/user-photo?id=CfDJ8ENcw2Vgni1Il0gIyDJ_y-b0PnJYPPaUqqsBFse3eRxDBlHs4aPyZJnpv5jf4bCnQv8FkF8_nd1khnwenTA7en-mrtscPr8wqvfyELHYMgt62DMRWsjzg_imFiCnQnc86ThLFLGPY0EvyvtYrqqiehMZmGBur3FMeSplJvhYYzIEc62Hp1zk0WdEWrrgoLlj1hKUBVxF-1ISMHAw5yHk2CXL5KfON_lDK5TNeBrrs3m36Qm-whJfLUxPMbx0MzWDT5z6Qe-5COwse0z6FCOfa5eQdtRA9JAqzgwHyB_bguly"} bgRadient="linear-gradient(92.33deg, rgba(7, 200, 140, 0.89) 2.82%, rgba(53, 214, 202, 0.518) 99.42%)" border="3.28125px solid rgb(13, 148, 109)" />
        </Box>
        <List sx={{padding: downLg ? 1 : 0}}>
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
                sx={{
                  background: (theme) =>
                    isDark(theme) ? "#7d818d" : "#dbdde5",
                }}
                style={{
                  padding: 4,
                  borderRadius: 10,
                }}
              >
                {item.percentage}
              </Typography>
            </StyledListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default LeaderBoard;