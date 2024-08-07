import { Box, Typography, useMediaQuery } from '@mui/material'
import { constant } from 'constant/constant';
import React from 'react'
import round2number from 'util/round2number';

const RankingLeaderBoard = (props) => {
    const {handleClick }= props
    const {heightRanking, isTop1, name, imgRank, avatarUser, bgRadient, border, profit}= props
    const downLg = useMediaQuery(theme => theme.breakpoints.down("lg"));
  return (
    <Box onClick={handleClick} flex={"1 1 0"} width={"100%"} sx={{cursor: "pointer"}}>
        <Box height={downLg ? 88 : heightRanking} sx={{borderTopLeftRadius: 20, borderTopRightRadius: 20, boxShadow: "rgba(114, 107, 107, 0.1) 8px 4px 50px", borderRadius: 10}}>
            <Box padding={downLg ? 1 : 0} sx={{height: "100%", display: "flex", flexDirection: downLg ? "row" : "column", alignItems: "center", justifyContent: downLg ? "space-between" : "center"}} position={"relative"}>
                <Box display={"flex"} alignItems={"center"}>
                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} position={downLg ? "static" : "absolute"} top={"-15%"} left="50%" sx={{transform: downLg ? "unset" : "translateX(-50%)", borderRadius: "50%", border: border, padding: "1px", background: "rgb(238, 239, 242)", width: downLg? 60 : "70px", height: downLg? 60 : "70px", zIndex: 2}} boxSizing={"content-box"}>
                        <img width={"100%"} style={{borderRadius: "50%", aspectRatio: 1, objectFit: "cover"}} alt="Can't open" src={constant.API_URL + avatarUser} />
                        <img style={{position: "absolute", bottom: downLg ? -5 : "-18px", width: 36}} className="rank-badge" src={imgRank} alt="rank"></img>
                        {isTop1 && <img style={{position: "absolute", top: downLg ? -30 : -40, width: 45}} className="rank-crown" src="/static/icons/image 53.png" alt="crown"></img>}
                    </Box>
                    <Box>
                        {downLg && <Typography ml={1} fontWeight={"600"}>{name}</Typography>}
                    </Box>
                </Box>
                {!downLg && <Typography fontWeight={"600"}>{name}</Typography>}
                <Box mt={downLg ? 0 : 2}>
                    <Typography fontSize={24} color={"rgb(138, 157, 198)"} fontWeight={600}>{round2number(profit)}%</Typography>
                </Box>
                {!downLg &&
                    <Box mt={1} color={"rgb(138, 157, 198)"}>Pnl 24h</Box>
                }
                <Box sx={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: bgRadient, opacity: .6, borderRadius: downLg ? "10px" : '20px 20px 0px 0px'}} className="gradient-bg" bis_skin_checked="1"></Box>
            </Box>
        </Box>
    </Box>
  )
}

export default RankingLeaderBoard
