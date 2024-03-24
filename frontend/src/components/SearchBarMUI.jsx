import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBarMUI(sr) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://20.188.123.92:82/ProcurementManagement/Filter?Search=${searchTerm}&page=1`);
      const data = await response.json();
      setSearchResults(data);
      sr(searchResults)
    } catch (error) {
      console.error('Error fetching search results:', error);
    } 
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

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
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>

            </InputAdornment>
          ),
        }}
      />
    </>
  );
}