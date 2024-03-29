import * as React from 'react';
import { AppBar, Box, Button, Grid, Stack, Tab, Tabs, Toolbar, Typography, useTheme, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import rafiLogo from './../assets/rafiLogo.png'
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import SignOutButton from './SignOutButton';
import './fonts.css';
import WelcomeName from './WelcomeName';
import Profile from '../pages/Profile';
import { useEffect } from 'react';
import axios from 'axios';

function NavbarMUI() {
    const isAuthenticated = useIsAuthenticated();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    

    return (
        <Box sx={{ backgroundColor: '#fff' }}>
            <Toolbar>
                <Grid container spacing={1}>
                    <Grid item xs={10} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start', alignItems: 'center' }}>
                        <img src={rafiLogo} style={{ width: '115px', height: '60px' }} />
                        <Box>
                            <Typography variant={isSmallScreen ? 'subtitle2' : 'subtitle1'} style={{ color: '#000', fontWeight: 'bold' }}>
                                PROCUREMENT MANAGEMENT PLAN
                            </Typography>
                            <Typography component="div" variant='body2'>
                                <Box sx={{ fontFamily: 'HelveticaNeueBold', fontWeight: 'bold', color: '#000', fontSize: '15px' }}>
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
