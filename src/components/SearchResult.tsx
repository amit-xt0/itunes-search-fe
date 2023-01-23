import React from "react";
import styled from "@mui/system/styled";
import Grid from "@mui/material/Grid";
import { iTunesResult } from "../types/iTunesResult";

const Item = styled("div")(({ theme }) => ({
  backgroundColor: "#fff",
  border: "1px solid",
  borderColor: "#ced7e0",
  padding: theme.spacing(1),
  marginBottom: 20,
  borderRadius: "4px",
}));

export const SearchResult: React.FC<{ results: iTunesResult[] }> = ({
  results,
}) => {
  if (results.length === 0) {
    return <div>No results found</div>;
  }
  return (
    <Grid container marginTop={5}>
      {results.map((result, index) => (
        <Grid xs={12}>
          <Item>
            <img src={result.artworkUrl100} alt={result.trackName} />
            <p>Track Name: {result.trackName}</p>
            <p>Artist Name: {result.artistName}</p>
            <p>Album Name: {result.collectionName}</p>
          </Item>
        </Grid>
      ))}
    </Grid>
  );
};
