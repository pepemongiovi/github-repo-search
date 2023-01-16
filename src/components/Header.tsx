import { ListAltOutlined, SearchRounded } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import Image from 'next/image';

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Image
            src="/logo.png"
            layout="fixed"
            width={50}
            height={50}
            color="white"
            alt="Github logo"
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
            Github Repository List
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
