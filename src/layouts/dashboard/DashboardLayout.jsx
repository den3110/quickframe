import { useMediaQuery } from "@mui/material";
// CUSTOM COMPONENTS
import MobileSidebar from "./MobileSidebar";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import LayoutBodyWrapper from "../layout-parts/LayoutBodyWrapper";
// DASHBOARD LAYOUT BASED CONTEXT PROVIDER
import LayoutProvider from "./context/layoutContext";
import BottomMenu from "./BottomMenu";
const DashboardLayout = ({
  children
}) => {
  const downLg = useMediaQuery(theme => theme.breakpoints.down("lg"));
  return <LayoutProvider>
      {/* CONDITIONALLY RENDER THE SIDEBAR */}
      {downLg ? <MobileSidebar /> : <DashboardSidebar />}
      
      <LayoutBodyWrapper>
        {/* DASHBOARD HEADER SECTION */}
        <DashboardHeader />

        {/* MAIN CONTENT RENDER SECTION */}
        {children}
      </LayoutBodyWrapper>
      {downLg && <BottomMenu />}
    </LayoutProvider>;
};
export default DashboardLayout;