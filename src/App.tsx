import React from "react";
import SearchPage from "./components/SearchPage";
import { Container, CssBaseline } from "@mui/material";

function App() {
  return (
    <>
      <CssBaseline />
      <Container sx={{ mt: 5 }}>
        <SearchPage />
      </Container>
    </>
  );
}

export default App;
