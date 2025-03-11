import { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Grid, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Paper,
  Typography,
  Zoom,
  Chip,
  Tooltip,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import FlagIcon from '@mui/icons-material/Flag';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import PendingIcon from '@mui/icons-material/Pending';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import DoneIcon from '@mui/icons-material/Done';

const initialFormState = {
  title: '',
  description: '',
  priority: 'medium',
  status: 'pending',
  dueDate: ''
};

const TaskForm = ({ onAddTask }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(formData);
    setFormData(initialFormState);
    setExpanded(false);
  };

  const toggleForm = () => {
    setExpanded(!expanded);
    if (!expanded) {
      setFormData(initialFormState);
    }
  };

  // Get priority icon
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <PriorityHighIcon />;
      case 'medium':
        return <FlagIcon />;
      case 'low':
        return <LowPriorityIcon />;
      default:
        return <FlagIcon />;
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <PendingIcon />;
      case 'in-progress':
        return <AutorenewIcon />;
      case 'completed':
        return <DoneIcon />;
      default:
        return <PendingIcon />;
    }
  };

  return (
    <Paper 
      elevation={expanded ? 3 : 2} 
      sx={{ 
        mb: 4, 
        p: expanded ? 3 : 0, 
        borderRadius: '16px',
        transition: 'all 0.3s ease',
        backgroundColor: 'var(--card-background)',
        overflow: 'hidden',
        transform: expanded ? 'scale(1.01)' : 'scale(1)',
        boxShadow: expanded 
          ? '0 12px 28px rgba(0, 0, 0, 0.12)' 
          : '0 4px 20px rgba(0, 0, 0, 0.05)'
      }}
    >
      {!expanded ? (
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={toggleForm}
          fullWidth
          sx={{ 
            py: 2, 
            borderRadius: '16px',
            fontSize: '1rem',
            fontWeight: 600,
            boxShadow: '0 4px 12px rgba(63, 81, 181, 0.2)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 16px rgba(63, 81, 181, 0.3)',
            },
            transition: 'all 0.3s ease'
          }}
        >
          Add New Task
        </Button>
      ) : (
        <Zoom in={expanded}>
          <Box component="form" onSubmit={handleSubmit}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h5" color="primary" fontWeight={700} sx={{ letterSpacing: '-0.5px' }}>
                Create New Task
              </Typography>
              <Tooltip title="Cancel">
                <IconButton 
                  onClick={toggleForm}
                  color="inherit"
                  sx={{ 
                    backgroundColor: 'var(--action-button-bg)',
                    '&:hover': {
                      backgroundColor: 'var(--action-button-hover)',
                    }
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </Box>
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Task Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  placeholder="Enter task title"
                  InputProps={{
                    sx: { borderRadius: '12px' }
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  variant="outlined"
                  placeholder="Enter task description"
                  InputProps={{
                    sx: { borderRadius: '12px' }
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Priority</InputLabel>
                  <Select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    label="Priority"
                    IconComponent={() => getPriorityIcon(formData.priority)}
                    sx={{ borderRadius: '12px' }}
                    MenuProps={{
                      PaperProps: {
                        sx: { borderRadius: '12px' }
                      }
                    }}
                  >
                    <MenuItem value="low">
                      <Box display="flex" alignItems="center" gap={1}>
                        <LowPriorityIcon color="success" />
                        <span>Low</span>
                      </Box>
                    </MenuItem>
                    <MenuItem value="medium">
                      <Box display="flex" alignItems="center" gap={1}>
                        <FlagIcon color="warning" />
                        <span>Medium</span>
                      </Box>
                    </MenuItem>
                    <MenuItem value="high">
                      <Box display="flex" alignItems="center" gap={1}>
                        <PriorityHighIcon color="error" />
                        <span>High</span>
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    label="Status"
                    IconComponent={() => getStatusIcon(formData.status)}
                    sx={{ borderRadius: '12px' }}
                    MenuProps={{
                      PaperProps: {
                        sx: { borderRadius: '12px' }
                      }
                    }}
                  >
                    <MenuItem value="pending">
                      <Box display="flex" alignItems="center" gap={1}>
                        <PendingIcon sx={{ color: '#2196f3' }} />
                        <span>Pending</span>
                      </Box>
                    </MenuItem>
                    <MenuItem value="in-progress">
                      <Box display="flex" alignItems="center" gap={1}>
                        <AutorenewIcon sx={{ color: '#9c27b0' }} />
                        <span>In Progress</span>
                      </Box>
                    </MenuItem>
                    <MenuItem value="completed">
                      <Box display="flex" alignItems="center" gap={1}>
                        <DoneIcon sx={{ color: '#4caf50' }} />
                        <span>Completed</span>
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Due Date"
                  name="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  InputProps={{
                    sx: { borderRadius: '12px' }
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  startIcon={<AddIcon />}
                  sx={{ 
                    mt: 1, 
                    py: 1.5,
                    borderRadius: '12px',
                    fontWeight: 600,
                    boxShadow: '0 4px 12px rgba(63, 81, 181, 0.2)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 16px rgba(63, 81, 181, 0.3)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Add Task
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Zoom>
      )}
    </Paper>
  );
};

export default TaskForm; 