import { Grid, Box, useMediaQuery } from "@mui/material";
// CUSTOM COMPONENTS
import { FlexRowAlign } from "components/flexbox";
import bg from "../../assets/bg.jpg"

const Layout = ({
  children,
  login
}) => {
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  return <Grid container height="100%">
      <Grid item md={6} xs={12} sx={{height: downLg ? "50%" : "aaa"}}>
        <FlexRowAlign className="akslkwqas" bgcolor="primary.main" sx={{backgroundImage: ` url(${bg})`, backgroundSize: "cover", backgroundRepeat: "no-repeat"}} height="100%">
          <Box className="aaaaklala" color="white" p={6} maxWidth={700}>
            {/* {login ? <H3 fontWeight={600}>Hi, Welcome Back!</H3> : <Fragment>
                <Box width={80} alt="quickframe" component="img" src="/static/logo/logo-white-svg.svg" />

                <H3 mt={3} fontWeight={600} maxWidth={450}>
                  Technology is best when it brings people together.
                </H3>

                <Divider sx={{
              borderColor: "primary.400",
              borderWidth: 1,
              my: 3
            }} />
              </Fragment>}

            <Box my={4}>
              <H6 fontSize={20}>You are in a good company</H6>
              <Paragraph>
                A product is something a brand is something that is bought by the customer.
              </Paragraph>
            </Box> */}

            {/* <img src="/static/footer-brands.svg" alt="footer" /> */}
          </Box>
        </FlexRowAlign>
      </Grid>

      <Grid item md={6} xs={12}>
        <FlexRowAlign bgcolor="background.paper" height="100%">
          {children}
        </FlexRowAlign>
      </Grid>
    </Grid>;
};
export default Layout;