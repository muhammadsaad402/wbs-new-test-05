import React, { useEffect } from "react";
import { useState } from "react";
import styles from "../../../styles/OrderCard.module.css";
import Link from "next/link";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import { Api } from "../../config/Config";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrency } from "@/redux/actions/currencyActions";
export default function PendingOrdersCard() {
  const [modalData, setModalData] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpenClose = () => setOpen(!open);
  const [orders, setOrders] = useState(null);
  const router = useRouter();

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const getOrders = () => {
    axios
      .get(
        // Api?.GET_ORDERS
        `${baseURL}/api/user/get-orders`,

        {
          headers: {
            Authorization:
              "Bearer " +
              reactLocalStorage?.getObject("loginAuth")?.authorisation?.token,
          },
        }
      )
      .then((response) => {
        setOrders(response.data.data.pending_orders);
        // console.log(response, "paending");
      })
      // .catch((error) => {
      //   console.error(error);
      // });
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          // alert("token expire");
          // toast.error("Unauthorized");
          reactLocalStorage?.remove("loginAuth");
          router.push("/login");
        } else {
          console.error("Error: ", error);
        }
      });
  };
  useEffect(() => {
    getOrders();
  }, []);
  const dispatch = useDispatch();
  const currencyData = useSelector(
    (state) => state.currencyReducer.currencyData
  );
  useEffect(() => {
    dispatch(fetchCurrency());
  }, [dispatch]);
  const filteredData = currencyData?.data.filter((item) => item.status === 1);
  const symbol = [];
  filteredData?.forEach((item, index) => {
    symbol.push(item.symbol);
  });

  return (
    <div className={styles.parent_row}>
      {orders?.some((cardData) => cardData.status === "pending") && (
        <h1>Pending Orders</h1>
      )}
      <div className={styles.row}>
        {orders?.map((cardData) => (
          <div key={cardData?.id}>
            <div
              onClick={() => {
                // handleOpenClose();
                setModalData(cardData);
                // console.log(cardData?.artist_id);
                // Construct the URL with cardData as a query parameter
                router.push({
                  pathname: "/artist_request_perview",
                  query: { cardData: JSON.stringify(cardData) }, // Convert cardData to a string
                });
              }}
              className={styles.card}
            >
              <div className={styles.card_sec}>
                {/* <h5>{cardData.status}</h5> */}
                <h5>
                  {cardData.status.charAt(0).toUpperCase() +
                    cardData.status.slice(1)}
                </h5>
              </div>
              <div className={styles.card_sec2}>
                <h6
                  className={styles.order_card_h6}
                  // style={{ marginBottom: "5px" }}
                >
                  Talent Name
                </h6>
                <h3>{cardData.artist.nick_name}</h3>
                {/* {console.log(cardData, "fffff")} */}
              </div>
              <div className={styles.card_sec2}>
                <h6
                  className={styles.order_card_h6}

                  // style={{ marginBottom: "5px" }}
                >
                  Occasion
                </h6>
                <h3>{cardData.occasion.name}</h3>
                {/* <h6
                  className={styles.order_card_h6}
                  // style={{ marginBottom: "5px" }}
                >
                  Talent Id
                </h6>
                <h3>{cardData.artist_id}</h3> */}
              </div>
              <div className={styles.card_sec1}>
                <div>
                  <h6>Order No</h6>
                  <h3>{cardData.unique_id}</h3>
                </div>
                <div>
                  <h6>Price</h6>
                  <h3>
                    {/* {cardData.service_earning} */}
                    {symbol ? symbol : ""}
                    {cardData.service_earning
                      ? parseInt(cardData.service_earning) >= 1000
                        ? parseInt(cardData.service_earning).toLocaleString()
                        : cardData.service_earning
                      : "0"}
                  </h3>
                </div>

                <div>
                  <h6>Order Date</h6>
                  <h3>{cardData.delivery_date}</h3>
                </div>
              </div>
            </div>
          </div>
        ))}

        <Modal
          open={open}
          onClose={handleOpenClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={styles.box}>
            <button
              className={styles.unitX}
              variant="contained"
              onClick={handleOpenClose}
            >
              X
            </button>
            <div className={styles.box_sub}>
              <h2>{modalData.status}</h2>
              <div>
                <h4>For</h4>
                <h2>{modalData.from}</h2>
              </div>

              <div>
                <h4>Name</h4>
                <h2>{modalData?.artist?.name}</h2>
              </div>

              <div>
                <h4>Occasion</h4>
                <h2>{modalData?.occasion?.name}</h2>
              </div>

              <div
                className={styles.retake_orders_display_justify}

                // style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>
                  <h4>Tracking Id</h4>

                  <h2>{modalData.id}</h2>
                </div>

                <div>
                  <h4>Order No</h4>

                  <h2>{modalData.unique_id}</h2>
                </div>
                <div>
                  <h4>Price</h4>

                  <h2>
                    {/* {modalData.service_earning} */}
                    {symbol ? symbol : ""}
                    {modalData.service_earning
                      ? parseInt(modalData.service_earning) >= 1000
                        ? parseInt(modalData.service_earning).toLocaleString()
                        : modalData.service_earning
                      : "0"}
                  </h2>
                </div>
                <div>
                  <h4>Date</h4>

                  <h2>{modalData.delivery_date}</h2>
                </div>
              </div>
            </div>
            {/* <h1>{modalData?.unique_id}</h1>
          <h1>{modalData?.status}</h1>
          <h1>{modalData?.name}</h1>
          <h1>{modalData?.to}</h1>
          <h1>{modalData?.service_earning}</h1>
          <h1>{modalData?.delivery_date}</h1> */}
          </Box>
        </Modal>
      </div>
    </div>
  );
}
