import { useState } from 'react';
import { 
  Box, 
  Typography, 
  CircularProgress, 
  Divider,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import FilterListIcon from '@mui/icons-material/FilterList';
import TaskItem from './TaskItem';

const TaskList = ({ tasks = [], loading, onUpdateTask, onDeleteTask }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');

  // Ensure tasks is an array
  const tasksArray = Array.isArray(tasks) ? tasks : [];

  // Filter tasks based on search term, status, and priority
  const filteredTasks = tasksArray.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'priority') {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    } else if (sortBy === 'status') {
      const statusOrder = { 'pending': 0, 'in-progress': 1, 'completed': 2 };
      return statusOrder[a.status] - statusOrder[b.status];
    } else if (sortBy === 'dueDate' && a.dueDate && b.dueDate) {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else {
      // Default sort by createdAt (newest first)
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    }
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" py={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h6" gutterBottom>
          Your Tasks {filteredTasks.length > 0 && `(${filteredTasks.length})`}
        </Typography>
        
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={2} mb={2}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          
          <Box display="flex" gap={2} width={{ xs: '100%', md: 'auto' }}>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
              <InputLabel>
                <Box display="flex" alignItems="center">
                  <FilterListIcon fontSize="small" sx={{ mr: 0.5 }} />
                  Status
                </Box>
              </InputLabel>
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                label="Status"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="in-progress">In Progress</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
              <InputLabel>
                <Box display="flex" alignItems="center">
                  <FilterListIcon fontSize="small" sx={{ mr: 0.5 }} />
                  Priority
                </Box>
              </InputLabel>
              <Select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                label="Priority"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
              <InputLabel>
                <Box display="flex" alignItems="center">
                  <SortIcon fontSize="small" sx={{ mr: 0.5 }} />
                  Sort By
                </Box>
              </InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                label="Sort By"
              >
                <MenuItem value="createdAt">Newest</MenuItem>
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="priority">Priority</MenuItem>
                <MenuItem value="status">Status</MenuItem>
                <MenuItem value="dueDate">Due Date</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        
        <Divider />
      </Box>
      
      {filteredTasks.length === 0 ? (
        <Box 
          py={4} 
          display="flex" 
          flexDirection="column" 
          alignItems="center" 
          justifyContent="center"
          sx={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
            borderRadius: 2,
            p: 3
          }}
        >
          <Typography variant="body1" color="text.secondary" align="center">
            No tasks found. {searchTerm || filterStatus !== 'all' || filterPriority !== 'all' ? 
              'Try changing your filters.' : 
              'Add a new task to get started!'}
          </Typography>
        </Box>
      ) : (
        <Box>
          {sortedTasks.map(task => (
            <TaskItem 
              key={task._id} 
              task={task} 
              onUpdateTask={onUpdateTask}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default TaskList; 