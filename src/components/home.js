import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import "../App.css";

const PaginatedItems = ({ itemsPerPage }) => {

  // GET request

  const [data, setData] = useState([]);

  const sendGetRequest = async () => {
    try {
      await axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((response) => setData(response.data))
        .catch((err) => console.log("error in try sGR : ", err));
    } catch (err) {
      console.log("error in sendGetRequest", err);
    }
  };
  useEffect(() => {
    sendGetRequest();
  }, []);


  const ShowButton = styled(Button)({
    backgroundColor: "red",
    color: "white",
    borderRadius: "1.5rem",
    p: "10px",
    "&:hover": {
      backgroundColor: "white",
      color: "red",
      border: "2px solid red",
    },
  });

  // implemented pagination functionality

  const items = Array.from({ length: data.length }, (_, index) => index + 1);

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const [page, setPage] = useState(1);

    // Invoke when user click to request another page.
    const handleChange = (event, page) => {
      const index = page-1;
      const newOffset = (index * itemsPerPage) % items.length;
      setItemOffset(newOffset);
      const currentItems = items.slice(itemOffset, endOffset);
      setPage(page);
    }


  // show details functionality start

  const [likeStates, setLikeStates] = useState(Array(10).fill(false));

  const handleLikeClick = (id) => {
    setLikeStates(prevLikeStates => {
      const newLikeStates = [...prevLikeStates];
      newLikeStates[id] = !newLikeStates[id];
      console.log(newLikeStates);
      return newLikeStates;
    });
  }

  const RenderData = () => {
    const details = data.map((detail,index) =>
      currentItems.includes(detail.id) ? (
        <span key={detail.id}>
          <Paper elevation={2} sx={{ mb: "1rem", pb: "4px" }}>
            <Grid
              container
              style={{
                height: "10rem",
                width: "96%",
                display: "flex",
                alignItems: "center",
                borderRadius: "1rem",
                padding: "5px",
              }}
            >
              <Grid item xs={2.4}>
                {detail.company.name}
              </Grid>
              <Grid item xs={2.4}>
                <b>
                  <p>CONTACT</p>
                </b>
                {detail.name}
              </Grid>
              <Grid item xs={2.4}>
                <b>
                  <p>CITY</p>
                </b>
                {detail.address.city}
              </Grid>
              <Grid item xs={2.4}>
                <b>
                  <p>STATE</p>
                </b>
                Mumbai-{detail.id}
              </Grid>
              <Grid item xs={2.4}>
                <ShowButton
                className={likeStates[index] ? 'clicked' : 'not-clicked'}
                onClick={() => {
                handleLikeClick(index);
                }}>
                {likeStates[index] ? 'HIDE DETAILS' : 'SHOW DETAILS'}
                </ShowButton>
              </Grid>
            </Grid>
            <Paper
              elevation={3}
              style={{
                marginBottom: "1rem",
                width: "94%",
                position: "relative",
                left: "3%",
                display: likeStates[index] ? "block" : "none",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <b>
                    <p>Description</p>
                  </b>
                  <span>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Similique perspiciatis accusantium ex, debitis enim porro
                    reiciendis impedit voluptas consequuntur dignissimos!
                  </span>
                </Grid>
                <Grid item xs={4}>
                  <b>
                    <p>Contact Person</p>
                  </b>
                  <p>{detail.name}</p>
                  <b>
                    <p>Designation</p>
                  </b>
                  <p>__________</p>
                  <b>
                    <p>Email</p>
                  </b>
                  <p>{detail.email}</p>
                  <b>
                    <p>Phones</p>
                  </b>
                  <p>{detail.phone}</p>
                </Grid>
                <Grid item xs={6}>
                  <b>
                    <p>Address</p>
                  </b>
                  <p>
                    {detail.address.street}, {detail.address.suite},{" "}
                    {detail.address.city}, {detail.address.zipcode}
                  </p>
                  <b>
                    <p>City</p>
                  </b>
                  <p>{detail.address.city}</p>
                  <b>
                    <p>State</p>
                  </b>
                  <p>__________</p>
                  <b>
                    <p>Country</p>
                  </b>
                  <p>__________</p>
                </Grid>
              </Grid>
            </Paper>
          </Paper>
        </span>
      ) : null
    );
    return <> {details} </>;
  }; 

  return (
    <>
      <RenderData />

      <Stack spacing={2}>
        <Pagination className='pagination'  count={pageCount} color="error" page={page} onChange={handleChange} />
      </Stack>
    </>
  );
};

export default PaginatedItems;
