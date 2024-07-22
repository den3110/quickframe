import { Box, Button, Dialog, useMediaQuery } from "@mui/material";
import React, { forwardRef, useEffect, useState } from "react";
import share_plan_01 from "../../../assets/share_plan_01.png";
import share_plan_02 from "../../../assets/share_plan_02.png";
import a01_mobile from "../../../assets/a01_mobile.png";
import a02_mobile from "../../../assets/a02_mobile.png";
import logo_dark from "../../../assets/logo_dark.png";
// import logo2 from "../../../assets/logo2.png";
import moment from "moment";
// import numberToWords from "util/numToWord";
import DownloadIcon from "icons/DownloadIcon";
// import round2number from "util/round2number";
import formatCurrency from "util/formatCurrency";

const ShareArchievement = forwardRef(({ open, handleClose, selectedPlan }, canvasRef) => {
    const downLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));
    const [count, setCount] = useState(1);
    const handleDownload = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `${selectedPlan?.name}.png`;
        link.click();
      }
    };
    useEffect(() => {
      if (open && !downLg && canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const img = new Image();
        const img2 = new Image();
        const img4 = new Image();

        // img.crossOrigin= "anonymous"
        // img2.crossOrigin= "anonymous"
        // img4.crossOrigin= "anonymous"

        img.src = share_plan_01;
        img2.src = share_plan_02;
        img4.src = logo_dark;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height - 80);
        if (selectedPlan?.total_profit >= 0) {
          ctx.fillStyle = "#41ae60";
        } else {
          ctx.fillStyle = "#ef4770";
        }
        ctx.font = "bold 64px Manrope";
        ctx.fillText(
          formatCurrency(selectedPlan?.total_profit)?.replace("$", "") + "%",
          40,
          140
        );

        ctx.fillStyle = "#ffffff";
        ctx.font = "20px Manrope";
        ctx.fillText(`${selectedPlan?.name} | Bot AI | Custom Autowin`, 40, 70);
        ctx.fillStyle = "#9fabbc";
        ctx.font = "18px Manrope";
        ctx.fillText(
          `Trong ${moment(selectedPlan?.updatedAt).diff(
            moment(selectedPlan?.lastStartTime),
            "hours"
          )} giờ`,
          40,
          170
        );
        ctx.drawImage(
          img2,
          canvas.width - img2.width,
          canvas.height - img2.height - 100
        );
        ctx.fillStyle = "#121927";
        ctx.fillRect(0, canvas.height - 100 - 1, canvas.width, 100);
        ctx.drawImage(
          img4,
          canvas.width - img4.width / 2 - 20,
          canvas.height + img4.height / 2 - 100 - 10,
          img4.width / 2,
          img4.height / 2
        );
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 20px Manrope";
        ctx.fillText("BotTrading", 40, canvas.height + img4.height / 2 - 100);
        ctx.fillStyle = "#9fabbc";
        ctx.font = "bold 14px Manrope";
        ctx.fillText(
          moment(new Date()).format("DD/MM/YYYY HH:mm:ss"),
          40,
          canvas.height + img4.height / 2 - 100 + 20
        );
        // ctx.fillText("Tải về", 330, 40);
        // ctx.fillStyle = "#fff";
        // ctx.font = "15px Arial";
        // ctx.fillText("BotTrading", 20, 180);
        // ctx.fillText("11/07/2024, 01:10:10", 20, 200);
      }
      if (open && downLg && canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const img = new Image();
        const img2 = new Image();
        const img4 = new Image();

        // img.crossOrigin= "anonymous"
        // img2.crossOrigin= "anonymous"
        // img4.crossOrigin= "anonymous"

        img.src = a01_mobile;
        img2.src = a02_mobile;
        img4.src = logo_dark;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height - 40);
        if (selectedPlan?.total_profit >= 0) {
          ctx.fillStyle = "#41ae60";
        } else {
          ctx.fillStyle = "#ef4770";
        }
        ctx.font = "bold 40px Manrope";
        ctx.fillText(
          formatCurrency(selectedPlan?.total_profit)?.replace("$", "") + "%",
          20,
          90
        );

        ctx.fillStyle = "#ffffff";
        ctx.font = "14px Manrope";
        ctx.fillText(`${selectedPlan?.name} | Bot AI | Custom Autowin`, 20, 40);
        ctx.fillStyle = "#9fabbc";
        ctx.font = "12px Manrope";
        ctx.fillText(
          `Trong ${moment(selectedPlan?.updatedAt).diff(
            moment(selectedPlan?.lastStartTime),
            "hours"
          )} giờ`,
          20,
          110
        );
        ctx.drawImage(
          img2,
          canvas.width - img2.width,
          canvas.height - img2.height - 60
        );
        ctx.fillStyle = "#121927";
        ctx.fillRect(0, canvas.height - 40 - 1, canvas.width, 40);
        ctx.drawImage(
          img4,
          canvas.width - img4.width / 2.5 - 20,
          canvas.height + img4.height / 2.5 - 55 - 10,
          img4.width / 2.5,
          img4.height / 2.5
        );
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 12px Manrope";
        ctx.fillText("BotTrading", 20, canvas.height + img4.height / 2 - 60);
        ctx.fillStyle = "#9fabbc";
        ctx.font = "bold 10px Manrope";
        ctx.fillText(
          moment(new Date()).format("DD/MM/YYYY HH:mm:ss"),
          20,
          canvas.height + img4.height / 2 - 60 + 15
        );
        // ctx.fillText("Tải về", 330, 40);
        // ctx.fillStyle = "#fff";
        // ctx.font = "15px Arial";
        // ctx.fillText("BotTrading", 20, 180);
        // ctx.fillText("11/07/2024, 01:10:10", 20, 200);
      }
    }, [open, selectedPlan, canvasRef, count, downLg]);

    useEffect(() => {
      if (count >= 1) {
        setTimeout(() => {
          setCount(0);
        }, 1);
      }
      return () => {
        setCount(1);
      };
    }, [count]);

    return (
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <Box
          style={{
            position: "relative",
            height: downLg ? 390 : 507,
            overflow: "hidden",
          }}
        >
          <canvas
            style={{ background: "#121927" }}
            crossOrigin="anonymous"
            ref={canvasRef}
            width={downLg ? 320 : 730}
            height={downLg ? 390 : 507}
          ></canvas>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleDownload}
              startIcon={<DownloadIcon />}
              size={downLg ? "small" : "large"}
            >
              Tải về
            </Button>
          </div>
        </Box>
      </Dialog>
    );
  }
);

export default ShareArchievement;
