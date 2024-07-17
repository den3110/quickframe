import { Fragment, useRef, useState } from "react";
import { Box, IconButton, MenuItem, Popover, styled, Typography, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";

// ==============================================================

// ==============================================================
// LANGUAGE OPTIONS


// STYLED COMPONENTS
const IconWrapper = styled(Box)({
  width: 24,
  height: 24,
  padding: "2px",
  display: "flex",
  "& img": {
    width: "100%",
    borderRadius: "50%",
    objectFit: "cover"
  }
});
const LanguagePopover = () => {
  const {t }= useTranslation()
  const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const {
    i18n
  } = useTranslation();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChangeLanguage = language => {
    i18n.changeLanguage(language);
    setOpen(false);
  };
  const languageOptions = {
    en: {
      icon: "/static/flags/usa-round.png",
      label: t("English")
    },
    vi: {
      icon: "/static/flags/vn-round.png",
      label: t("Vietnamese")
    }
  };
  const selectedLanguage = languageOptions[i18n.language];
  return <Fragment>
      <IconButton onClick={handleOpen} ref={anchorRef}>
        <IconWrapper>
          <img alt={selectedLanguage.label} src={selectedLanguage.icon} />
          {downLg && <Typography fontSize={13} ml={1} whiteSpace={"nowrap"}>{selectedLanguage.label}</Typography>}
        </IconWrapper>
      </IconButton>

      <Popover keepMounted open={open} onClose={handleClose} anchorEl={anchorRef.current} anchorOrigin={{
      horizontal: "center",
      vertical: "bottom"
    }} PaperProps={{
      sx: {
        width: 110,
        py: 1
      }
    }}>
        {Object.keys(languageOptions).map(language => <MenuItem key={languageOptions[language].label} onClick={() => handleChangeLanguage(language)}>
            {languageOptions[language].label}
          </MenuItem>)}
      </Popover>
    </Fragment>;
};
export default LanguagePopover;