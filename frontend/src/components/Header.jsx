import { AppBar, Toolbar, Typography, Box, IconButton, Tooltip } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const Header = ({ toggleThemeMode, mode }) => {
  return (
    <AppBar 
      position="static" 
      color="primary" 
      elevation={0}
      sx={{
        background: mode === 'light' 
          ? 'linear-gradient(90deg, #3f51b5 0%, #5c6bc0 100%)' 
          : 'linear-gradient(90deg, #303f9f 0%, #3f51b5 100%)',
        borderBottom: mode === 'light' 
          ? '1px solid rgba(0, 0, 0, 0.08)' 
          : '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      <Toolbar sx={{ padding: { xs: '0.5rem 1rem', md: '0.5rem 2rem' } }}>
        <Box display="flex" alignItems="center" flexGrow={1}>
          <TaskAltIcon sx={{ mr: 2, fontSize: 32, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} />
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 700, 
              letterSpacing: '-0.5px',
              fontSize: '1.5rem',
              textShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            TaskMaster
          </Typography>
        </Box>
        <Tooltip title={`Switch to ${mode === 'light' ? 'Dark' : 'Light'} Mode`}>
          <IconButton 
            color="inherit" 
            onClick={toggleThemeMode}
            sx={{ 
              width: '42px',
              height: '42px',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(5px)',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.2)',
                transform: 'scale(1.1)'
              },
              transition: 'all 0.2s ease'
            }}
          >
            {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 