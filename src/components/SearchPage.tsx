import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { SearchResult } from "./SearchResult";
import { useITunesSearch } from "../hooks/useITunesSearch";

function SearchPage() {
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [entity] = useState("");

  const { results, hasMore, resetSearchTerm } = useITunesSearch(
    entity,
    searchTerm,
    page
  );

  function fetchNextPage() {
    setPage((page) => page + 1);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (searchTerm === searchInput) {
      return;
    }
    setSearchTerm(searchInput);
    setPage(0);
    resetSearchTerm(searchInput);
  }

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Search"
          onChange={(e) => setSearchInput(e.target.value)}
          required
        />
        <Button sx={{ ml: 4 }} variant="contained" type="submit">
          Search
        </Button>
      </form>
      <InfiniteScroll
        dataLength={results.length}
        next={fetchNextPage}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <SearchResult results={results} />
      </InfiniteScroll>
    </Box>
  );
}

export default SearchPage;
