import { Grid, Stack, Box } from "@mui/material";
// CUSTOM COMPONENTS
import Summery from "./Summery";

const Overview = () => {
  return <Box mt={3}>
      <Grid container spacing={3}>
        <Grid item lg={12} md={12} xs={12}>
          <Stack spacing={3}>
            <Summery />
          </Stack>
        </Grid>
      </Grid>
    </Box>;
};
export default Overview;