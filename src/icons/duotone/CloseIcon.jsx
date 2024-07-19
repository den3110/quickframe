import { SvgIcon } from "@mui/material";
const CloseIcon = (props) => {
  return (
    <SvgIcon width={48} height={48} viewBox="0 0 48 48" {...props}>
      <circle cx={24} cy={24} r={24} fill="#0CAF60" />
      <path
        d="M29.8334 18.1667L18.1667 29.8334M18.1667 18.1667L29.8334 29.8334"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};
export default CloseIcon;
