/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import Card from "@mui/material/Card";
import StarIcon from "@mui/icons-material/Star";
import Image from "next/image";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/material/Box";
import styles from "../../styles/Home.module.css";
import Rating from "@mui/material/Rating";
import { Placeholder } from "semantic-ui-react";

export default function ViewedTalentsCard({ imgUrl, data, symbol }) {
  const value = 5;
  // Check if avg_ratting is not empty and contains at least one element
  const avgRating =
    data?.avg_ratting?.length > 0
      ? data?.avg_ratting[0]?.avg_rating.toFixed(1)
      : "3.5";

  return (
    <div className={styles.card}>
      <img src={imgUrl || Placeholder} />
      <div className={styles.card_content}>
        <h2>{data?.name}</h2>

        {/* <p>{data.price}</p> */}
        <p>{data?.category?.name}</p>
      </div>
      <div className={styles.flex}>
        <span>
          <StarIcon className={styles.rating_icon} />

          {avgRating}
        </span>
        <span className={styles.price}>
          {symbol ? symbol : ""}

          {/* {data?.service_charges[0]?.price} */}

          {data?.service_charges[0]?.price
            ? parseInt(data?.service_charges[0]?.price) >= 1000
              ? parseInt(data?.service_charges[0]?.price).toLocaleString()
              : data?.service_charges[0]?.price
            : "0"}
        </span>
      </div>
    </div>
  );
}
