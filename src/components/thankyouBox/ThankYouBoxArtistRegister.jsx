import Head from "next/head";
import styles from "../../../styles/ArtistSignup.module.css";

import React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { width } from "@mui/system";
function ThankYouBoxArtistRegister(isPayment) {
  const rootRef = React.useRef(null);
  return (
    <Box
      className={styles.PaymentSuccessfulBox_width35}
      // style={{
      //   width: "35%",
      //   justifyContent: "center",
      //   margin: "auto",
      //   display: "flex",
      //   alignItems: "center",
      // }}
      sx={{
        height: 400,
        flexGrow: 1,
        minWidth: 500,
        transform: "translateZ(0)",
        backgroundColor: "#1B1B1B",
        borderRadius: 2,
        // The position fixed scoping doesn't work in IE11.
        // Disable this demo to preserve the others.
        "@media all and (-ms-high-contrast: none)": {
          display: "none",
        },
      }}
      ref={rootRef}
    >
      <Box
        sx={{
          height: 320,
          position: "relative",
          width: 550,
          border: "2px solid #CEA234",
          borderRadius: 2,
          boxShadow: (theme) => theme.shadows[5],
          p: 4,
        }}
        className={styles.PaymentSuccessfulBox_Box_height}
        // style={{
        //   justifyContent: "center",
        //   display: "flex",
        //   alignItems: "center",
        //   textAlign: "center",
        //   flexDirection: "column",
        // }}
      >
        <h1
          className={styles.PaymentSuccessfulBox_Box_heading_h1}
          // style={{
          //   fontSize: 35,
          //   color: "white",
          // }}
        >
          Thank You For Your Contribution
        </h1>
        <p
          className={styles.ThankYouBox_Box_paragraph}
          // style={{
          //   fontSize: 20,
          //   color: "white",
          // }}
        >
          {isPayment?.isPayment
            ? "We'll notify you when your video uploaded"
            : " We'll notify you when your request get approves"}
        </p>
      </Box>
    </Box>
  );
}
export default ThankYouBoxArtistRegister;
