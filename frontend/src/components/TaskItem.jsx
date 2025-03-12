import { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  IconButton, 
  Chip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Collapse,
  Divider,
  Tooltip,
  Avatar,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import FlagIcon from '@mui/icons-material/Flag';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import PendingIcon from '@mui/icons-material/Pending';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import DoneIcon from '@mui/icons-material/Done';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { format } from 'date-fns';

const TaskItem = ({ task, onUpdateTask, onDeleteTask }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [editData, setEditData] = useState(task);
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleDeleteClick = () => {
    handleMenuClose();
    setDeleteDialogOpen(true);
  };
  
  const handleDeleteConfirm = () => {
    onDeleteTask(task._id);
    setDeleteDialogOpen(false);
  };
  
  const handleEditClick = () => {
    handleMenuClose();
    setEditDialogOpen(true);
  };

  const handleEditConfirm = () => {
    onUpdateTask(task._id, editData);
    setEditDialogOpen(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleStatusChange = (newStatus) => {
    handleMenuClose();
    onUpdateTask(task._id, { ...task, status: newStatus });
  };
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (error) {
      return '';
    }
  };
  
  // Get status badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <Tooltip title="Pending">
            <Chip 
              size="small" 
              icon={<PendingIcon />} 
              label="Pending" 
              className="status-badge status-pending" 
            />
          </Tooltip>
        );
      case 'in-progress':
        return (
          <Tooltip title="In Progress">
            <Chip 
              size="small" 
              icon={<AutorenewIcon />} 
              label="In Progress" 
              className="status-badge status-in-progress" 
            />
          </Tooltip>
        );
      case 'completed':
        return (
          <Tooltip title="Completed">
            <Chip 
              size="small" 
              icon={<DoneIcon />} 
              label="Completed" 
              className="status-badge status-completed" 
            />
          </Tooltip>
        );
      default:
        return null;
    }
  };
  
  // Get priority badge with icon
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return (
          <Tooltip title="High Priority">
            <Chip 
              size="small" 
              icon={<PriorityHighIcon />} 
              label="High" 
              className="priority-badge priority-high" 
            />
          </Tooltip>
        );
      case 'medium':
        return (
          <Tooltip title="Medium Priority">
            <Chip 
              size="small" 
              icon={<FlagIcon />} 
              label="Medium" 
              className="priority-badge priority-medium" 
            />
          </Tooltip>
        );
      case 'low':
        return (
          <Tooltip title="Low Priority">
            <Chip 
              size="small" 
              icon={<LowPriorityIcon />} 
              label="Low" 
              className="priority-badge priority-low" 
            />
          </Tooltip>
        );
      default:
        return null;
    }
  };
  
  return (
    <Paper className={`task-card priority-${task.priority}`} elevation={2}>
      <Box className="task-header" sx={{ textAlign: 'left' }}>
        <Box>
          <Typography variant="h6" component="h3">
            {task.title}
          </Typography>
          <Box className="badge-container">
            {getStatusBadge(task.status)}
            {getPriorityBadge(task.priority)}
            {task.dueDate && (
              <Tooltip title="Due Date">
                <Box className="due-date">
                  <CalendarTodayIcon fontSize="small" />
                  {formatDate(task.dueDate)}
                </Box>
              </Tooltip>
            )}
          </Box>
        </Box>
        
        <Box className="task-actions">
          <Tooltip title={expanded ? "Collapse" : "Expand"}>
            <IconButton size="small" onClick={toggleExpanded}>
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="More Options">
            <IconButton size="small" onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      <Collapse in={expanded}>
        <Box className="task-description">
          {task.description ? (
            <Typography variant="body2" component="p" sx={{ whiteSpace: 'pre-line' }}>
              {task.description}
            </Typography>
          ) : (
            <Typography variant="body2" component="p" fontStyle="italic">
              No description provided
            </Typography>
          )}
          
          <Box className="task-meta">
            <Typography variant="caption">
              Created: {formatDate(task.createdAt)}
            </Typography>
            {task.updatedAt && task.updatedAt !== task.createdAt && (
              <Typography variant="caption">
                Updated: {formatDate(task.updatedAt)}
              </Typography>
            )}
          </Box>
        </Box>
      </Collapse>
      
      {/* Task Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          elevation: 3,
          sx: {
            borderRadius: '12px',
            minWidth: '200px',
            overflow: 'hidden'
          }
        }}
      >
        <MenuItem onClick={handleEditClick}>
          <ListItemIcon>
            <Avatar sx={{ width: 24, height: 24, bgcolor: '#ff9800' }}>
              <EditIcon fontSize="small" sx={{ color: 'white' }} />
            </Avatar>
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange('pending')} disabled={task.status === 'pending'}>
          <ListItemIcon>
            <Avatar sx={{ width: 24, height: 24, bgcolor: '#2196f3' }}>
              <PendingIcon fontSize="small" sx={{ color: 'white' }} />
            </Avatar>
          </ListItemIcon>
          <ListItemText>Mark as Pending</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange('in-progress')} disabled={task.status === 'in-progress'}>
          <ListItemIcon>
            <Avatar sx={{ width: 24, height: 24, bgcolor: '#9c27b0' }}>
              <AutorenewIcon fontSize="small" sx={{ color: 'white' }} />
            </Avatar>
          </ListItemIcon>
          <ListItemText>Mark as In Progress</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange('completed')} disabled={task.status === 'completed'}>
          <ListItemIcon>
            <Avatar sx={{ width: 24, height: 24, bgcolor: '#4caf50' }}>
              <DoneIcon fontSize="small" sx={{ color: 'white' }} />
            </Avatar>
          </ListItemIcon>
          <ListItemText>Mark as Completed</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDeleteClick}>
          <ListItemIcon>
            <Avatar sx={{ width: 24, height: 24, bgcolor: '#f44336' }}>
              <DeleteIcon fontSize="small" sx={{ color: 'white' }} />
            </Avatar>
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
      
      {/* Edit Task Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: '16px',
            padding: '16px'
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Edit Task</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Task Title"
                name="title"
                value={editData.title}
                onChange={handleEditChange}
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
                value={editData.description}
                onChange={handleEditChange}
                multiline
                rows={3}
                variant="outlined"
                placeholder="Enter task description"
                InputProps={{
                  sx: { borderRadius: '12px' }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Priority</InputLabel>
                <Select
                  name="priority"
                  value={editData.priority}
                  onChange={handleEditChange}
                  label="Priority"
                  sx={{ borderRadius: '12px' }}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={editData.status}
                  onChange={handleEditChange}
                  label="Status"
                  sx={{ borderRadius: '12px' }}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="in-progress">In Progress</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Due Date"
                name="dueDate"
                type="date"
                value={editData.dueDate}
                onChange={handleEditChange}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                InputProps={{
                  sx: { borderRadius: '12px' }
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ padding: '16px 24px' }}>
          <Button 
            onClick={() => setEditDialogOpen(false)} 
            variant="outlined"
            sx={{ borderRadius: '8px' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleEditConfirm} 
            color="primary" 
            variant="contained"
            sx={{ borderRadius: '8px' }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: '16px',
            padding: '8px'
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Delete Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{task.title}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: '16px 24px' }}>
          <Button 
            onClick={() => setDeleteDialogOpen(false)} 
            variant="outlined"
            sx={{ borderRadius: '8px' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error" 
            variant="contained"
            sx={{ borderRadius: '8px' }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default TaskItem; 