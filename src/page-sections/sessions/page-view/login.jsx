import { useState, useEffect, useContext } from "react";
import {
  Grid,
  TextField,
  Box,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import * as Yup from "yup";
import { useFormik } from "formik";
import Layout from "../Layout";
import { Link } from "components/link";
import { H5, H6, Paragraph } from "components/typography";
import { FlexBetween, FlexBox, FlexRowAlign } from "components/flexbox";
import { authApi } from "api";
import { useNavigate } from "react-router-dom";
import AuthContext from "contexts/AuthContext";
import userApi from "api/user/userApi";
import { constant } from "constant/constant";
import { useTranslation } from "react-i18next";
import LanguagePopover from "layouts/layout-parts/popovers/LanguagePopover";
import { SettingsContext } from "contexts/settingsContext";
// import MenuLeft from "icons/MenuLeft";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ThemeIcon from "icons/ThemeIcon";
const LoginPageView = () => {
  const { setAccessToken, setSelectedLinkAccount, setUser } =
    useContext(AuthContext);
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [siteId, setSiteId] = useState("");
  const { settings, saveSettings } = useContext(SettingsContext);
  const [language, setLanguage] = useState(
    localStorage.getItem("lang") || "vi"
  );
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const response = await fetch("/config.json");
        const config = await response.json();
        setSiteId(config.siteId);
      } catch (error) {
        console.error("Failed to load config", error);
      }
    };
    loadConfig();
  }, []);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const handleChangeTheme = (value) => {
    saveSettings({
      ...settings,
      theme: value,
    });
  };

  const initialValues = {
    email: "",
    password: "",
    remember: true,
    language: language,
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email or Username is required"),
    password: Yup.string()
      .min(6, "Password should be of minimum 6 characters length")
      .required("Password is required"),
    language: Yup.string().required("Language is required"),
  });

  const { errors, values, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        try {
          setIsLoading(true);
          setErrorMessage("");
          const response = await authApi.login({
            email: values.email,
            password: values.password,
            siteId: siteId,
          });
          if (response?.data?.ok === true) {
            localStorage.setItem("accessToken", response.data?.d.access_token);
            localStorage.setItem(
              "refreshToken",
              response.data?.d.refresh_token
            );
            localStorage.setItem("lang", values.language);
            setAccessToken(response?.data?.d?.access_token);
            const response1 = await userApi.getUserLinkAccountList();
            const response2 = userApi.getUserProfile();

            if (response1?.data?.ok === true) {
              if (response1?.data?.d?.length <= 0) {
                navigate("/connect");
              } else if (
                response1?.data?.d?.find((item) => item?.isLogin === true)
              ) {
                setSelectedLinkAccount(
                  response1?.data?.d?.find((item) => item?.isLogin === true)
                    ?._id
                );
                localStorage.setItem(
                  "linkAccount",
                  response1?.data?.d?.find((item) => item?.isLogin === true)
                    ?._id
                );
                if (response2?.data?.ok === true) {
                  setUser({
                    ...response.data?.d,
                    avatar:
                      constant.URL_AVATAR_URER + response?.data?.d?.photo_token,
                  });
                }
                navigate("/dashboard");
              } else {
                navigate("/connect");
              }
            }
          } else {
            setErrorMessage(response?.data?.m);
          }
        } catch (error) {
          if (error.response?.status === 402) {
            navigate("/connect");
          }
          if (error.response?.status !== 402) {
            setErrorMessage(
              "Failed to login. Please check your email or username, password, and site ID."
            );
          }
        } finally {
          setIsLoading(false);
        }
      },
    });

  return (
    <Layout login>
      <div className="language-select-container">
        <IconButton
          onClick={() => {
            handleChangeTheme(settings.theme === "light" ? "dark" : "light");
          }}
        >
          {settings.theme === "light" ? <DarkModeIcon /> : <ThemeIcon />}
        </IconButton>
        <LanguagePopover isFromLogin={true} />
      </div>
      <Box maxWidth={550} p={4}>
        <H5 fontSize={{ sm: 30, xs: 25 }}>{t("Sign In")}</H5>

        <Paragraph mt={1} mb={6} color="text.secondary">
          {t("New user")}?{" "}
          <Box fontWeight={500} component={Link} href="/register">
            {t("Create an Account")}
          </Box>
        </Paragraph>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <H6 fontSize={16} mb={1.5}>
                {t("Login with your email or username")}
              </H6>

              <TextField
                fullWidth
                placeholder="Enter your email or username"
                name="email"
                onBlur={handleBlur}
                value={values.email}
                onChange={handleChange}
                helperText={touched.email && errors.email}
                error={Boolean(touched.email && errors.email)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                onBlur={handleBlur}
                value={values.password}
                onChange={handleChange}
                helperText={touched.password && errors.password}
                error={Boolean(touched.password && errors.password)}
                InputProps={{
                  endAdornment: (
                    <FlexRowAlign
                      onClick={() => setShowPassword(!showPassword)}
                      sx={{ cursor: "pointer" }}
                    >
                      {showPassword ? (
                        <VisibilityOff fontSize="small" />
                      ) : (
                        <Visibility fontSize="small" />
                      )}
                    </FlexRowAlign>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <FlexBetween my={1}>
                <FlexBox alignItems="center" gap={1}>
                  <Checkbox
                    sx={{ p: 0 }}
                    name="remember"
                    value={values.remember}
                    onChange={handleChange}
                    checked={values.remember}
                  />
                  <Paragraph fontWeight={500}>{t("Remember me")}</Paragraph>
                </FlexBox>

                <Box
                  href="/forget-password"
                  fontSize={13}
                  component={Link}
                  sx={{ color: "error.500", fontWeight: 500 }}
                >
                  {t("Forget Password")}?
                </Box>
              </FlexBetween>
            </Grid>

            {errorMessage && (
              <Grid item xs={12}>
                <Paragraph color="error.main">{errorMessage}</Paragraph>
              </Grid>
            )}

            <Grid item xs={12}>
              <LoadingButton
                loading={isLoading}
                type="submit"
                variant="contained"
                fullWidth
              >
                {t("Sign In")}
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Layout>
  );
};

export default LoginPageView;
