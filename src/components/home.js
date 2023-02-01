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
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = (items.slice(itemOffset, endOffset));
  console.log("ci: ",currentItems);
  const pageCount = (Math.ceil(items.length / itemsPerPage));

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
    const currentItems = (items.slice(itemOffset, endOffset));
    console.log("ci: ",currentItems);
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
    "&:hover": { backgroundColor: "white", color: "red" , border:"2px solid red"},
  });

  const RenderData =  () => {
    const details =   data.map((detail) =>
      currentItems.includes(detail.id) ? (
        <span key={detail.id}>
          <Paper elevation={3} sx={{ mb: "1rem" }}>
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
                {detail.phone}
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
                <ShowButton>Show details</ShowButton>
              </Grid>
            </Grid>
          </Paper>
        </span>
      ) : null
    );
    return <> {details} </>;
  }


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
