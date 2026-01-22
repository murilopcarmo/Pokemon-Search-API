import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Icon from '@mui/material/Icon';
import { IconButton } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';

function PokeMenuIcon() {
  return (
    <Icon sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 4C15.58 4 18.63 6.39 19.61 9.67H15.91C15.48 8.15 14.08 7.04 12.41 7.04C10.74 7.04 9.34 8.15 8.91 9.67H5.21C6.19 6.39 9.24 4 12 4ZM12 20C8.42 20 5.37 17.61 4.39 14.33H8.09C8.52 15.85 9.92 16.96 11.59 16.96C13.26 16.96 14.66 15.85 15.09 14.33H18.79C17.81 17.61 14.76 20 12 20ZM12 14.33C10.71 14.33 9.67 13.29 9.67 12C9.67 10.71 10.71 9.67 12 9.67C13.29 9.67 14.33 10.71 14.33 12C14.33 13.29 13.29 14.33 12 14.33Z" 
          fill="white"
        />
      </svg>
    </Icon>
  );
}


export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>

      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => navigate({ to: "/about" })}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton size="small" onClick={toggleDrawer(true)}><PokeMenuIcon /></IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}