import React from "react";
import { makeStyles } from "@mui/styles";
import { SvgIcon } from "@mui/material";

// Define your styles
const useStyles = makeStyles({
  flickAnimate: {
    animation: "$flicker 1.3s ease-out 0s infinite normal backwards running",
  },
  // Define keyframes for animation
  "@keyframes flicker": {
    "0%": { transform: "rotateZ(0deg)" },
    "50%": { transform: "rotateZ(50deg)" },
    "100%": { transform: "rotateZ(5deg)" },
  },
});

const FlickAnimate = (props) => {
  const classes = useStyles();

  return (
    <SvgIcon
      {...props}
      className={classes.flickAnimate}
      height={24}
      viewBox="0 0 24 24"
      color="primary"
      // fill="none"
    >
      <g clipPath="url(#clip0_7196_65941)">
        <path
          d="M19.6193 10.8683L13.4693 11.6183L11.913 6.60001C11.7908 6.22538 11.5261 5.91389 11.1761 5.73286C10.8261 5.55182 10.4189 5.51579 10.0425 5.63254C9.66618 5.74929 9.35088 6.00944 9.16478 6.35678C8.97869 6.70412 8.93674 7.11074 9.04801 7.48875L11.9378 16.8L11.2215 17.025L10.5548 14.8763L9.83776 15.1013C9.45836 15.2192 9.14128 15.4829 8.95609 15.8345C8.77091 16.186 8.73276 16.5966 8.85001 16.9763L9.49351 19.05C9.79645 20.0259 10.4225 20.8697 11.2688 21.4425L13.938 23.25L23.25 20.3603L22.1168 12.7695C22.0302 12.1897 21.7208 11.6666 21.2543 11.3115C20.7878 10.9564 20.2012 10.7973 19.6193 10.8683Z"
          // fill="#0CAF60"
        />
        <path
          d="M0.25647 6.44251L3.00822 0.131256L4.60422 2.76376C6.72103 1.93091 8.97521 1.50226 11.25 1.50001C14.5642 1.49731 17.8146 2.41153 20.6415 4.14151C20.7255 4.19292 20.7985 4.26038 20.8565 4.34002C20.9144 4.41967 20.9561 4.50996 20.9792 4.60572C21.0022 4.70148 21.0062 4.80084 20.9908 4.89813C20.9755 4.99543 20.9411 5.08874 20.8897 5.17276C20.8383 5.25677 20.7708 5.32983 20.6912 5.38778C20.6116 5.44572 20.5213 5.48741 20.4255 5.51046C20.2321 5.55702 20.0281 5.52484 19.8585 5.42101C17.2673 3.83521 14.2879 2.9973 11.25 3.00001C9.25016 3.00299 7.26716 3.36524 5.39547 4.06951L7.12497 6.92326L0.25647 6.44251Z"
          // fill="#0CAF60"
        />
      </g>
      <defs>
        <clipPath id="clip0_7196_65941">
          <rect width={24} height={24} fill="white" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

export default FlickAnimate;
