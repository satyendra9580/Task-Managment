import { useState, useEffect, useMemo } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Container, Box, Typography, Paper } from '@mui/material'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import Header from './components/Header'
import { fetchTasks, createTask, updateTask, deleteTask } from './services/taskService'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('dark');

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#3f51b5' : '#7986cb',
      },
      secondary: {
        main: '#f50057',
      },
      background: {
        default: mode === 'light' ? '#f5f7fa' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Segoe UI", sans-serif',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
    },
  }), [mode]);

  const toggleThemeMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await fetchTasks();
      setTasks(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks. Please try again later.');
      console.error('Error loading tasks:', err);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (newTask) => {
    try {
      const addedTask = await createTask(newTask);
      setTasks(prevTasks => Array.isArray(prevTasks) ? [addedTask, ...prevTasks] : [addedTask]);
    } catch (err) {
      setError('Failed to add task. Please try again.');
      console.error('Error adding task:', err);
    }
  };

  const handleUpdateTask = async (id, updatedTask) => {
    try {
      const updated = await updateTask(id, updatedTask);
      setTasks(prevTasks => {
        if (!Array.isArray(prevTasks)) return [updated];
        return prevTasks.map(task => task._id === id ? updated : task);
      });
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(prevTasks => {
        if (!Array.isArray(prevTasks)) return [];
        return prevTasks.filter(task => task._id !== id);
      });
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error('Error deleting task:', err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="app-container">
        <Header toggleThemeMode={toggleThemeMode} mode={mode} />
        <Container maxWidth="lg" className="main-container">
          <Box my={4}>
            <Paper elevation={3} className="content-paper">
              <Box p={3}>
                <Typography variant="h4" component="h1" gutterBottom className="page-title">
                  Task Management
                </Typography>
                <TaskForm onAddTask={handleAddTask} />
                {error && (
                  <Typography color="error" variant="body2" className="error-message">
                    {error}
                  </Typography>
                )}
                <TaskList 
                  tasks={tasks} 
                  loading={loading} 
                  onUpdateTask={handleUpdateTask}
                  onDeleteTask={handleDeleteTask}
                />
              </Box>
            </Paper>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
