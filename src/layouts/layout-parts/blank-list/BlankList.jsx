import React from 'react';
import { Box, Button, Typography, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: 'center',
    padding: 32,
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
  },
  title: {
    marginTop: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 8,
    // color: theme.palette.text.secondary,
  },
  button: {
    marginTop: 24,
    backgroundColor: '#34a853',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#2c8e44',
    },
  },
  link: {
    marginTop: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkIcon: {
    marginRight: 8,
  },
}));

const EmptyPage = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}> 
      <img
        src="https://quickinvest.ai/img/portfolio/img_1.png"
        alt="Empty Page"
        className={classes.image}
      />
      <Typography variant="h5" className={classes.title}>
        Danh mục đầu tư đang trống
      </Typography>
      <Typography variant="body1" className={classes.subtitle}>
        Bắt đầu khám phá các cơ hội đầu tư và kiếm lợi nhuận ngay hôm nay.
      </Typography>
      <Button variant="contained" className={classes.button}>
        Tạo gói đầu tư ngay
      </Button>
      <Link href="#" className={classes.link}>
        <Typography variant="body2">
          <Box component="span" className={classes.linkIcon}>+</Box>
          Sao chép gói đầu tư được chia sẻ
        </Typography>
      </Link>
    </Box>
  );
};

export default EmptyPage;
