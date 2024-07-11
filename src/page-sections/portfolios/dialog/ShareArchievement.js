import {
  Dialog,
} from "@mui/material";
import React, { forwardRef, useEffect, useRef, useState } from "react";

const ShareArchievement = forwardRef(
  ({ open, handleClose, selectedPlan }, canvasRef) => {
    const [count, setCount] = useState(1);

    useEffect(() => {
      if (open && canvasRef.current ) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background
        const img = new Image();
        img.src = "https://quickinvest.ai/img/share_plan/01.png";
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            // Draw text
            ctx.fillStyle = "#41ae60"; // Green color for the percentage text
            ctx.font = "bold 64px Manrope";
            ctx.fillText("+0%", 40, 140);
    
            ctx.fillStyle = "#ffffff"; // White color for other texts
            ctx.font = "20px Manrope";
            ctx.fillText("aa Copy | Bot AI | Custom Autowin", 40, 70);
            ctx.fillStyle = "#9fabbc"; // White color for other texts
            ctx.font = "18px Manrope";
            ctx.fillText("Trong 4 phút", 40, 160);
            ctx.fillText(`Mã gói: ${selectedPlan.code}`, 20, 110);
            ctx.fillText("Quét để sao chép gói", 20, 140);
    
            // Draw the download button
            ctx.fillStyle = "#ffffff"; // Button text color
            ctx.fillRect(320, 20, 60, 30); // Button background
            ctx.fillStyle = "#000000"; // Button background color
            ctx.fillText("Tải về", 330, 40);
    
            // Draw the footer
            ctx.fillStyle = "#00FF00"; // Green color for footer text
            ctx.font = "15px Arial";
            ctx.fillText("BotTrading", 20, 180);
            ctx.fillText("11/07/2024, 01:10:10", 20, 200);
      }
    }, [open, selectedPlan, canvasRef, count]);

    useEffect(() => {
      if (count >= 1) {
        setTimeout(() => {
          setCount(0);
        }, 1);
      }
      return ()=> {
        setCount(1)
      }
    }, [count]);

    return (
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <canvas
          crossOrigin="anonymous"
          ref={canvasRef}
          width={730}
          height={507}
        ></canvas>
      </Dialog>
    );
  }
);

export default ShareArchievement;
