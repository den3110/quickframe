import { useContext } from "react";
import { Box, Button } from "@mui/material";
// CUSTOM LAYOUT COMPONENT
import Layout from "page-sections/sessions/Layout";
// CUSTOM COMPONENTS
import { Link } from "components/link";
import { H5, Paragraph } from "components/typography";
// AUTH0 CONTEXT FILE
import { AuthContext } from "contexts/auth0Context";
import { useTranslation } from "react-i18next";
const LoginView = () => {
  const {t }= useTranslation()
  const { isAuthenticated, isInitialized, user, loginWithPopup, logout } =
    useContext(AuthContext);
  const handleSingIn = () => {
    loginWithPopup();
  };
  const handleSingOut = () => {
    logout();
  };
  console.log({
    isAuthenticated,
    isInitialized,
    user,
  });
  return (
    <Layout login>
      <Box maxWidth={550} p={4} width="100%">
        {isAuthenticated ? (
          <H5
            fontSize={{
              sm: 30,
              xs: 25,
            }}
          >
            Welcome Back
          </H5>
        ) : (
          <H5
            fontSize={{
              sm: 30,
              xs: 25,
            }}
          >
            {t("Sign In")}
          </H5>
        )}

        {isAuthenticated ? (
          <Paragraph mt={1} mb={6} color="text.secondary">
            Hello! {user?.email}
          </Paragraph>
        ) : (
          <Paragraph mt={1} mb={6} color="text.secondary">
            {t("New user")}?{" "}
            <Box fontWeight={500} component={Link} href="/register">
            {t("Create an Account")}
            </Box>
          </Paragraph>
        )}

        {isAuthenticated ? (
          <Button fullWidth size="large" color="error" onClick={handleSingOut}>
            {t("logout")}
          </Button>
        ) : (
          <Button fullWidth size="large" onClick={handleSingIn}>
          {t("login")}
          </Button>
        )}
      </Box>
    </Layout>
  );
};
export default LoginView;
