import { Box, Button, Stack, TextField } from "@mui/material";
import NavigateBefore from "@mui/icons-material/NavigateBefore";
// CUSTOM DEFINED HOOK
import useNavigate from "hooks/useNavigate";
// CUSTOM COMPONENTS
import { H5, Paragraph } from "components/typography";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import { useState } from "react";
import { authApi } from "api";
import DialogOtpForgotPassword from "components/dialog/DialogOtpForgotPassword";

const ForgetPasswordPageView = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        email,
        siteId: "luxcoin.app",
      };
      const response = await authApi.requestOtpCode(data);
      console.log(response);
      if (response?.data?.ok === false) {
        setErrorMessage(response?.data?.message);
      } else if (response?.data?.ok === true) {
        setOpenPopup(true);
      }
    } catch (error) {
      setErrorMessage(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FlexRowAlign height="100%" bgcolor="background.paper">
      <Box textAlign="center" maxWidth={550} width="100%" padding={4}>
        <img src="/static/forget-passwod.svg" alt="Logo" />

        <H5 mt={2}>Forgot your password?</H5>

        <Paragraph color="text.secondary" mt={1} px={4}>
          Please enter the email address associated with your account and We
          will email you a link to reset your password.
        </Paragraph>

        <form>
          <Stack gap={3} mt={5}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errorMessage}
              helperText={errorMessage}
            />
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={email?.length <= 0 || loading}
              fullWidth
            >
              {loading ? "Sending..." : "Send Link"}
            </Button>
            <Button
              disableRipple
              variant="text"
              color="secondary"
              onClick={() => navigate("/login")}
            >
              <NavigateBefore fontSize="small" /> Back to Sign In
            </Button>
          </Stack>
        </form>
      </Box>
      <DialogOtpForgotPassword open={openPopup} setOpen={setOpenPopup} email={email} />
    </FlexRowAlign>
  );
};

export default ForgetPasswordPageView;
