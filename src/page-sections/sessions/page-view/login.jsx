import { useState } from "react";
import { Grid, TextField, Box, Checkbox } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import * as Yup from "yup";
import { useFormik } from "formik";
import Layout from "../Layout";
import { Link } from "components/link";
import { H5, H6, Paragraph } from "components/typography";
import { FlexBetween, FlexBox, FlexRowAlign } from "components/flexbox";
import { authApi } from "api";

const LoginPageView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const initialValues = {
    email: "example@gmail.com",
    password: "Your password",
    siteId: "examplewebsite.com",
    remember: true,
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password should be of minimum 6 characters length")
      .required("Password is required"),
    siteId: Yup.string().required("Site ID is required"),
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
            siteId: values.siteId,
          });
          if (response?.data?.ok === true) {
            localStorage.setItem("accessToken", response.data?.d.access_token);
            localStorage.setItem("refreshToken", response.data?.d.refresh_token);
            window.location.href = window.location.origin;
          } else {
            setErrorMessage(response?.data?.m);
          }
        } catch (error) {
          console.log(error);
          setErrorMessage(
            "Failed to login. Please check your email, password, and site ID."
          );
        } finally {
          setIsLoading(false);
        }
      },
    });

  return (
    <Layout login>
      <Box maxWidth={550} p={4}>
        <H5
          fontSize={{
            sm: 30,
            xs: 25,
          }}
        >
          Sign In
        </H5>

        <Paragraph mt={1} mb={6} color="text.secondary">
          New user?{" "}
          <Box fontWeight={500} component={Link} href="/register">
            Create an Account
          </Box>
        </Paragraph>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <H6 fontSize={16} mb={1.5}>
                Login with your email
              </H6>

              <TextField
                fullWidth
                placeholder="Enter your work email"
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
                      sx={{
                        cursor: "pointer",
                      }}
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
              <Grid xs={12} paddingTop={2}>
                <TextField
                  fullWidth
                  placeholder="Enter your site ID"
                  name="siteId"
                  onBlur={handleBlur}
                  value={values.siteId}
                  onChange={handleChange}
                  helperText={touched.siteId && errors.siteId}
                  error={Boolean(touched.siteId && errors.siteId)}
                />
              </Grid>
              <FlexBetween my={1}>
                <FlexBox alignItems="center" gap={1}>
                  <Checkbox
                    sx={{
                      p: 0,
                    }}
                    name="remember"
                    value={values.remember}
                    onChange={handleChange}
                    checked={values.remember}
                  />
                  <Paragraph fontWeight={500}>Remember me</Paragraph>
                </FlexBox>

                <Box
                  href="#"
                  fontSize={13}
                  component={Link}
                  sx={{
                    color: "error.500",
                    fontWeight: 500,
                  }}
                >
                  Forget Password?
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
                Sign In
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Layout>
  );
};

export default LoginPageView;
