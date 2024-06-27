import { useState } from "react";
import { Button, Grid, TextField, Box, Alert, Divider } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import * as Yup from "yup";
import { useFormik } from "formik";
import Layout from "../Layout";
import { Link } from "components/link";
import { H5, H6, Paragraph } from "components/typography";
import { authApi } from "api";
import { useNavigate } from "react-router-dom";

const RegisterPageView = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const initialValues = {
    email: "",
    password: "",
    siteId: "",
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
          const response = await authApi.register({
            email: values.email,
            password: values.password,
            siteId: values.siteId,
          });
          if (response?.data?.ok === true) {
            navigate("/login");
          } else {
            setErrorMessage(response?.data?.m);
          }
        } catch (error) {
          setErrorMessage(
            error.response?.data?.message ||
              "Failed to register. Please try again."
          );
        } finally {
          setIsLoading(false);
        }
      },
    });

  return (
    <Layout>
      <Box maxWidth={550} p={4}>
        <H5 fontSize={{ sm: 30, xs: 25 }}>Sign up for 14 days free trial</H5>

        <Paragraph mt={1} mb={6} color="text.secondary">
          No risk, no obligations, no credit-card required.
        </Paragraph>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <H6 fontSize={16} mb={1}>
                Register with your email id
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
                placeholder="Enter your password"
                name="password"
                type="password"
                onBlur={handleBlur}
                value={values.password}
                onChange={handleChange}
                helperText={touched.password && errors.password}
                error={Boolean(touched.password && errors.password)}
              />
            </Grid>

            <Grid item xs={12}>
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

            <Grid item xs={12}>
              {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
              <LoadingButton
                loading={isLoading}
                type="submit"
                variant="contained"
                fullWidth
              >
                Sign up via Email
              </LoadingButton>

              <Paragraph mt={1} color="text.secondary">
                By signing up, you agree{" "}
                <Box fontWeight={500} component={Link} href="#">
                  Terms of Service
                </Box>{" "}
                & your consent to receiving email communications from Sales
                handy.
              </Paragraph>
            </Grid>
          </Grid>
        </form>

        <Divider
          sx={{
            my: 4,
            borderColor: "grey.200",
            borderWidth: 1,
          }}
        >
          <Paragraph color="text.secondary" px={1}>
            Already have an account?
          </Paragraph>
        </Divider>

        <Button
          fullWidth
          variant="text"
          onClick={() => navigate("/login")}
          sx={{
            backgroundColor: "primary.50",
          }}
        >
          Log In
        </Button>
      </Box>
    </Layout>
  );
};

export default RegisterPageView;
