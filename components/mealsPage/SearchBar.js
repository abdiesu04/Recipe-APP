import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  IconButton,
  InputBase,
  styled, // Import styled from @mui/system
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchContainer = styled("div")({
  position: "relative",
  borderRadius: "4px",
  backgroundColor: "#f2f2f2",
  "&:hover": {
    backgroundColor: "#e0e0e0",
  },
  marginLeft: 0,
  width: "100%",
  maxWidth: "500px", // Adjust max width as needed
  display: "flex",
  alignItems: "center",
});

const SearchInput = styled(InputBase)({
  padding: "10px",
  paddingLeft: "30px",
  width: "100%",
});

function SearchBar({ searchText, setSearchText }) {
  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6">
              <a href="/" style={{ color: "#fff", textDecoration: "none" }}>
                Home
              </a>
            </Typography>
            <Typography variant="h6" sx={{ marginLeft: "20px" }}>
              <a
                href="/savedMeals"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Saved Meals
              </a>
            </Typography>
          </div>
          <Typography variant="h6">
            <a
              href="/"
              style={{ color: "#fff", textDecoration: "none" }}
              onClick={() => localStorage.removeItem("accessToken")}
            >
              Logout
            </a>
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Grid
          container
          justifyContent="flex-end" // Align items to the right
          style={{ marginTop: "20px" }}
        >
          <Grid item xs={12} md={6}>
            <SearchContainer>
              <SearchIcon style={{ marginLeft: "10px", marginRight: "10px" }} />
              <SearchInput
                placeholder="Search meals..."
                inputProps={{ "aria-label": "search" }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </SearchContainer>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default SearchBar;
