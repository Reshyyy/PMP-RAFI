import * as React from 'react';
import { AppBar, Box, Button, Grid, Stack, Tab, Tabs, Toolbar, Typography, useTheme, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import rafiLogo from './../assets/rafiLogo.png'
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import SignOutButton from './SignOutButton';

function NavbarMUI() {
    const isAuthenticated = useIsAuthenticated(); // Get the authentication status
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{ backgroundColor: '#fff' }}>
            <Toolbar>
                <Grid container spacing={1}>
                    <Grid item xs={10} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center' }}>
                        <img src={rafiLogo} style={{ width: '100px', height: '50px' }} />
                        <Box>
                            <Typography variant={isSmallScreen ? 'subtitle2' : 'subtitle1'} style={{ color: '#000', fontWeight: 'bold' }}>
                                PROCUREMENT MANAGEMENT PLAN
                            </Typography>
                            <Typography component="div" variant='body2'>
                                <Box sx={{ fontWeight: 'bold', color: '#000', fontSize: 16 }}>
                                    RAFI - RAMON ABOITIZ FOUNDATION INC.
                                </Box>
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', alignItems: 'center' }}>
                        {isAuthenticated ? <SignOutButton /> : null}
                    </Grid>
                </Grid>
            </Toolbar>
        </Box>
    );
}
export default NavbarMUI;
