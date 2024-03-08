import { Box, Divider, Link, Typography } from '@mui/material';
import React, { useState } from 'react';


const Sidebar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = items.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredItems(filtered);
    };

    return (
        <Box
            sx={{
                height: '100vh',
                width: { xs: '100%', md: '100%', lg: '95%' }, // Set full width on mobile and fixed width on medium and above
                backgroundColor: '#2c3e50',
                color: '#fff',
                left: 0,
                overflowY: 'auto',
            }}
        >
            <Box sx={{ padding: '16px' }}>
                <Typography variant="h4" fontWeight="bold" mb={4}>
                    PMP
                </Typography>
                <Divider sx={{ mb: 3, backgroundColor: 'rgba(255, 255, 255, 0.5)' }} />
                <nav>
                    <Link href="#" underline="none" sx={{ display: 'block', py: 2.5, px: 4, borderRadius: 1, transition: 'background-color 200ms', color: 'white', fontSize: '1.2rem', '&:hover': { backgroundColor: '#4b5563' } }}>Home</Link>
                    {/* <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }} /> */}
                    <Link href="#" underline="none" sx={{ display: 'block', py: 2.5, px: 4, borderRadius: 1, transition: 'background-color 200ms', color: 'white', fontSize: '1.2rem', '&:hover': { backgroundColor: '#4b5563' } }}>Application</Link>
                </nav>
            </Box>
        </Box>
    );
};

export default Sidebar;
