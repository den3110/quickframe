import { Box, Container } from "@mui/material";
// CUSTOM COMPONENTS
import { H1, Paragraph } from "components/typography";
// CUSTOM DEFINED HOOK
// import useNavigate from "hooks/useNavigate";
import { useTranslation } from "react-i18next";
const MaintenancePageView = () => {
  // const navigate = useNavigate();
  const { t }= useTranslation()

  return <Container>
      <Box textAlign="center" py={6}>
        <H1 fontSize={{
        sm: 52,
        xs: 42
      }}>{t("Maintenance underway")}</H1>
        <Paragraph mt={0.5} fontSize={18} color="text.secondary">
          Wacbot {t("is undergoing maintenance for future growth.")}
        </Paragraph>
        <Paragraph mt={0.5} fontSize={18} color="text.secondary">
          {t("Please come back later")}
        </Paragraph>
        <Box py={8} maxWidth={600} margin="auto">
          <img src="/static/pages/maintenance.svg" alt="maintenance" width="100%" />
        </Box>

        {/* <Button onClick={() => navigate("/")}>{t("home")}</Button> */}
      </Box>
    </Container>;
};
export default MaintenancePageView;