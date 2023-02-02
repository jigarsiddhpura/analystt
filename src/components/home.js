import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import "../App.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { borderRadius } from "@mui/system";

const PaginatedItems = ({ itemsPerPage }) => {
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

  const items = Array.from({ length: data.length }, (_, index) => index + 1);

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  // console.log("ci: ", currentItems);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
    const currentItems = items.slice(itemOffset, endOffset);
    // console.log("ci: ", currentItems);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

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

  const [showDetails, setShowDetails] = useState(false);
  const [selected, setSelected] = useState([]);
  const handleDetails = (id) => {
    setShowDetails(!showDetails);
    if(showDetails){
      setSelected([...new Set(selected.concat([id]))]);
    }
    else{
      setSelected(selected.filter(e => e !== id));
    }
    console.log(selected);
  }

  const RenderData = () => {
    const details = data.map((detail) =>
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
                {
                selected.includes(detail.id) ? (
                  <ShowButton
                  id={detail.id}
                  onClick={(e) => handleDetails(e.currentTarget.id)}>Hide details</ShowButton>
                ) : (
                  <ShowButton
                  id={detail.id}
                  onClick={(e) => handleDetails(e.currentTarget.id)}>Show details</ShowButton>
                )}
              </Grid>
            </Grid>
            <Paper
              elevation={3}
              style={{
                marginBottom: "1rem",
                width: "94%",
                position: "relative",
                left: "3%",
                display: showDetails ? "block" : "none",
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
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
          renderOnZeroPageCount={null}
        />
      </Stack>
    </>
  );
};

export default PaginatedItems;
