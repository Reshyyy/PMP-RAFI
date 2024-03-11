import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore, MenuIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom'; // Assuming use of React Router

const drawerWidth = 240;

const SidebarMUI2 = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [nestedOpen, setNestedOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleNestedClick = () => {
        setNestedOpen(!nestedOpen);
    };

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            {/* Toolbar for Menu Icon at top */}
            <div style={{ display: 'flex', alignItems: 'center', padding: theme.spacing(1) }}>
                <MenuIcon onClick={open ? handleDrawerClose : handleDrawerOpen}/>
            </div>

            <List>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit'}}>
                    <ListItem button onClick={handleDrawerClose}>
                        <ListItemIcon>
                            <HomeIcon /> 
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                </Link>

                {/* Example of a nested menu item */}
                <ListItem button onClick={handleNestedClick}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                    {nestedOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={nestedOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary="Starred" />
                        </ListItem>
                    </List>
                </Collapse>
            </List>
        </Drawer>
    );
};

export default SidebarMUI2;