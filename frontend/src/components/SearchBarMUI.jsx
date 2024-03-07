import { Box, Container, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FullFeaturedCrudGrid from "./FullFeatureCrudGrid";

export default function SearchBarMUI() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    const results = data.filter(item => {
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    })
    setFilteredResults(results);
  }

  return (
    <>
      <TextField
        id="search"
        type="search"
        label="Search"
        value={searchTerm}
        onChange={handleChange}
        sx={{ width: 300, bgcolor: 'white', borderRadius: 1 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearchClick}>
                <SearchIcon />
              </IconButton>

            </InputAdornment>
          ),
        }}
      />
    </>
  );
}