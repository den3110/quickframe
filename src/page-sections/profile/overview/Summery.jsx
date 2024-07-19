import React, { useContext, useState } from "react";
import {
  Card,
  Button,
} from "@mui/material";
import { MoreButton } from "components/more-button";
import { H6, Paragraph } from "components/typography";
import FlexBetween from "components/flexbox/FlexBetween";
import DialogOtpForgotPassword from "components/dialog/DialogOtpForgotPassword";
import AuthContext from "contexts/AuthContext";

const ChangePassword = () => {
  const {user }= useContext(AuthContext)
  const [openOtpDialog, setOpenOtpDialog] = useState(false);
  const handleOpenOtpDialog = () => setOpenOtpDialog(true);


  return (
    <Card sx={{ padding: 3 }}>
      <FlexBetween>
        <H6 fontSize={16}>Change Password</H6>
      </FlexBetween>

      <Paragraph color="text.secondary" mt={2} fontWeight={400} mb={2}>
        Click the button below to initiate the password change process. You will need to verify your email and set a new password.
      </Paragraph>

      <Button variant="contained" color="primary" onClick={handleOpenOtpDialog}>
        Change Password
      </Button>
      <DialogOtpForgotPassword open={openOtpDialog} setOpen={setOpenOtpDialog} email={user?.email} />
    </Card>
  );
};

export default ChangePassword;
