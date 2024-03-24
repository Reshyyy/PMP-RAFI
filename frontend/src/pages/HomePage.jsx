import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Grid, Stack } from '@mui/material';
import AddButton from '../components/AddButton';
import FullFeaturedCrudGrid from '../components/FullFeatureCrudGrid';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useMsal } from "@azure/msal-react";

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { instance } = useMsal();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    console.log(searchTerm)
    try {
      const response = await fetch(`/pmp.api/ProcurementManagement/Planning/Filter?Search=${searchTerm}&Department=${asd.DefaultDepartment}&page=1`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };



  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2}>
        {/* Grid Sidebar */}
        <Grid item xs='1' md={3} lg={2.5}>
          <Sidebar />
        </Grid>

        {/* Grid Content */}
        <Grid item xs={11} md={9} lg={9.5} mt={4} padding={3}>
          <Stack direction='row' justifyContent='space-between' alignItems='end'>
            <Stack direction='row'>
              {/* ACTION BUTTONS */}
              <AddButton />
            </Stack>
            {/* Searchbar Component */}
            <Stack>

            </Stack>
          </Stack>

          <Stack mt={1}>
            <FullFeaturedCrudGrid searchTerm={searchTerm} searchResults={searchResults} />
          </Stack>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default HomePage;
