import React from "react";
import { Box, Button, Typography, Link } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "center",
    padding: 32,
  },
  image: {
    maxWidth: "100%",
    height: "auto",
  },
  title: {
    marginTop: 16,
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: 8,
    // color: theme.palette.text.secondary,
  },
  button: {
    marginTop: 24,
    backgroundColor: "#34a853",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#2c8e44",
    },
  },
  link: {
    marginTop: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  linkIcon: {
    marginRight: 8,
  },
}));

const EmptyPage = ({ title, subTitle, titleButton, actionClick, disableButton }) => {
  const classes = useStyles();
  const {t} =useTranslation()

  return (
    <Box className={classes.container}>
      <img
        src="/static/icons/img_1.png"
        alt="Empty Page"
        className={classes.image}
      />
      <Typography mt={2} variant="h5" className={classes.title}>
        {title}
      </Typography>
      <Typography mt={2} mb={2} variant="body1" className={classes.subtitle}>
        {subTitle}
      </Typography>
      {!disableButton && (
        <>
          <Button
            variant="contained"
            onClick={actionClick}
            className={classes.button}
          >
            {titleButton}
          </Button>
          <Link href="#" className={classes.link}>
            <Typography variant="body2" mt={2}>
              <Box component="span" className={classes.linkIcon}>
                +
              </Box>
              {t("Copy a share plan")}
            </Typography>
          </Link>
        </>
      )}
    </Box>
  );
};

export default EmptyPage;
