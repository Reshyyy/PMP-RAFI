import { Box, Divider, Link, Typography } from '@mui/material';
import React from 'react';

const Sidebar = () => {
    return (
        <Box
            sx={{
                height: '100vh',
                width: { xs: '100%', md: '256px' }, // Set full width on mobile and fixed width on medium and above
                backgroundColor: '#2c3e50',
                color: '#fff',
                left: 0,
                overflowY: 'auto',
            }}
        >
            <Box sx={{ padding: '16px' }}>
                <Typography variant="h4" fontWeight="bold" mb={4}>
                    Sidebar
                </Typography>
                <nav>
                    <Link href="#" underline="none" sx={{ display: 'block', py: 2.5, px: 4, borderRadius: 1, transition: 'background-color 200ms', color: 'white', fontSize: '1.2rem', '&:hover': { backgroundColor: '#4b5563' } }}>Home</Link>
                    <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }} />
                    <Link href="#" underline="none" sx={{ display: 'block', py: 2.5, px: 4, borderRadius: 1, transition: 'background-color 200ms', color: 'white', fontSize: '1.2rem', '&:hover': { backgroundColor: '#4b5563' } }}>About</Link>
                    <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }} />
                    <Link href="#" underline="none" sx={{ display: 'block', py: 2.5, px: 4, borderRadius: 1, transition: 'background-color 200ms', color: 'white', fontSize: '1.2rem', '&:hover': { backgroundColor: '#4b5563' } }}>Services</Link>
                    <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }} />
                    <Link href="#" underline="none" sx={{ display: 'block', py: 2.5, px: 4, borderRadius: 1, transition: 'background-color 200ms', color: 'white', fontSize: '1.2rem', '&:hover': { backgroundColor: '#4b5563' } }}>Contact</Link>
                </nav>
            </Box>
        </Box>
    );
};

export default Sidebar;
