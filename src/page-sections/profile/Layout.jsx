import { Fragment, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, Tab, Card, Stack, styled, IconButton } from "@mui/material";
import CameraAlt from "@mui/icons-material/CameraAlt";
import TabList from "@mui/lab/TabList";
import axios from "axios";
// CUSTOM COMPONENTS
import { AvatarBadge } from "components/avatar-badge";
import { H6, Paragraph } from "components/typography";
import { FlexBetween, FlexBox } from "components/flexbox";
// ICON COMPONENTS
import DateRange from "icons/DateRange";
import Bratislava from "icons/Bratislava";
import MapMarkerIcon from "icons/MapMarkerIcon";
// CUSTOM UTILS METHOD
import { format } from "util/currency";
import { AvatarLoading } from "components/avatar-loading";
import AuthContext from "contexts/AuthContext";
import userApi from "api/user/userApi";
import { showToast } from "components/toast/toast";
import { constant } from "constant/constant";

// STYLED COMPONENTS
const ContentWrapper = styled(Box)({
  zIndex: 1,
  padding: 24,
  marginTop: 55,
  position: "relative",
});
const CoverPicWrapper = styled(Box)({
  top: 0,
  left: 0,
  height: 125,
  width: "100%",
  overflow: "hidden",
  position: "absolute",
});
const StyledFlexBetween = styled(FlexBetween)({
  margin: "auto",
  flexWrap: "wrap",
});
const StyledTabList = styled(TabList)(({ theme }) => ({
  borderBottom: 0,
  paddingLeft: 16,
  paddingRight: 16,
  [theme.breakpoints.up("sm")]: {
    "& .MuiTabs-flexContainer": {
      justifyContent: "center",
    },
  },
}));

const Layout = ({ children, handleTabList }) => {
  const { user, setUser } = useContext(AuthContext);
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);

      try {
        const response = await userApi.usersUploadAvatar(formData, {
          headers: {"Content-Type": "multipart/form-data"},
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        });

        if (response.data.ok === true) {
          showToast("Cập nhật ảnh đại diện thành công", "success");
          setAvatarUrl(constant.URL_AVATAR_URER + response.data.d);
          setUser(prev=> ({...prev, avatar: constant.URL_AVATAR_URER + response.data.d}))
          setUploadProgress(0);
        } else if (response.data.d === false) {
          showToast(response.data.m, "error");
        }
      } catch (error) {
        showToast(error.response.data.m, "error");
      }
    }
  };

  useEffect(()=>{
    console.log(user)
  }, [user])

  return (
    <Fragment>
      <Card
        sx={{
          position: "relative",
        }}
      >
        <CoverPicWrapper>
          <img
            width="100%"
            height="100%"
            alt="Team Member"
            src="/static/cover/user-cover-pic.png"
            style={{
              objectFit: "cover",
            }}
          />
        </CoverPicWrapper>

        <ContentWrapper>
          <FlexBox justifyContent="center">
            <AvatarBadge
              badgeContent={
                <label htmlFor="icon-button-file">
                  <input
                    type="file"
                    accept="image/*"
                    id="icon-button-file"
                    style={{
                      display: "none",
                    }}
                    onChange={handleFileChange}
                  />

                  <IconButton aria-label="upload picture" component="span">
                    <CameraAlt
                      sx={{
                        fontSize: 16,
                        color: "background.paper",
                      }}
                    />
                  </IconButton>
                </label>
              }
            >
              <AvatarLoading
                alt="user"
                borderSize={2}
                percentage={uploadProgress}
                src={avatarUrl}
                sx={{
                  width: 100,
                  height: 100,
                }}
              />
            </AvatarBadge>
          </FlexBox>

          <Box mt={2}>
            <H6 fontSize={18} textAlign="center">
              {user?.email}
            </H6>

            {/* <StyledFlexBetween paddingTop={1} maxWidth={340}>
              <ListItem title="Developer" Icon={Bratislava} />
              <ListItem title="New York" Icon={MapMarkerIcon} />
              <ListItem title="Joined March 17" Icon={DateRange} />
            </StyledFlexBetween> */}
          </Box>
        </ContentWrapper>

        <StyledTabList variant="scrollable" onChange={handleTabList}>
          <Tab disableRipple label="Overview" value="1" />
          <Tab disableRipple label="Exchange connect" value="2" />
          {/* <Tab disableRipple label="Campaigns" value="3" />
          <Tab disableRipple label="Documents" value="4" />
          <Tab disableRipple label="Connections" value="5" />
          <Tab disableRipple label="Activity" value="6" /> */}
        </StyledTabList>
      </Card>

      {children || <Outlet />}
    </Fragment>
  );
};
export default Layout;

function ListItem({ title, Icon }) {
  return (
    <FlexBox gap={1} alignItems="center">
      <Icon
        sx={{
          fontSize: 14,
          color: "text.secondary",
        }}
      />
      <Paragraph color="text.secondary">{title}</Paragraph>
    </FlexBox>
  );
}
function BoxItem({ title, amount, color }) {
  return (
    <Stack
      spacing={0.5}
      alignItems="center"
      sx={{
        borderRadius: "8px",
        border: "1px solid",
        padding: "1rem .5rem",
        borderColor: "divider",
        width: {
          sm: 120,
          xs: "100%",
        },
        marginBottom: {
          sm: 0,
          xs: 1,
        },
      }}
    >
      <H6 fontSize={16} color={color}>
        {amount}
      </H6>

      <Paragraph color="text.secondary">{title}</Paragraph>
    </Stack>
  );
}
