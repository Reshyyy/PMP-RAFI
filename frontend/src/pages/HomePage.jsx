import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Typography, Grid, Stack } from '@mui/material';
import SearchBarMUI from '../components/SearchBarMUI';
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
              <SearchBarMUI />
            </Stack>
          </Stack>

          <Stack mt={1}>
            <FullFeaturedCrudGrid />
          </Stack>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default HomePage;
