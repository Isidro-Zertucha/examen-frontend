import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Task } from '../interfaces/task';
import Pagination from '@mui/material/Pagination';
import TaskService from '../services/taskService';
import { useEffect } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, MenuItem, Select, TextField, Typography } from '@mui/material';


/*const myInitialList: Task[] = [
  { id: 0, title: 'Botar la basura', completed: false },
  { id: 1, title: 'Task 2', completed: false },
  { id: 2, title: 'Task 3', completed: false },
  { id: 3, title: 'Task 4', completed: false },
  { id: 4, title: 'Task 5', completed: false },
  { id: 5, title: 'Task 6', completed: false },
  { id: 6, title: 'Task 7', completed: false },
  { id: 7, title: 'Task 8', completed: false },
];*/


export function TaskList() {
  const [myList, setMyList] = React.useState<Task[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [submitted, setSubmitted] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState('');
  const [itemsPerPage, setItemsPerPage] = React.useState(2);

  //let indexOfLastItem = currentPage * itemsPerPage;
  //let indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const [currentItems, setCurrentItems] = React.useState<Task[]>([]);
  //let currentItems = myList.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const taskService = new TaskService();
    const fetchTasks = async () => {
      try {
        const tasks = await taskService.getTasks();
        setMyList(tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = myList.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentItems(currentItems);
  }, [myList, currentPage, itemsPerPage]);

  const handleItemsPerPageChange = (value: number) => {
    setCurrentPage(1);
    setItemsPerPage(value);
  //   indexOfLastItem = currentPage * itemsPerPage;
  // indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // setCurrentItems( myList.slice(indexOfFirstItem, indexOfLastItem));
  };

  const handleAdd = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewTitle('');
    setSubmitted(false);
  };

  const handleAddTask = () => {
    setSubmitted(true);
    if (newTitle === '') {
      return;
    }
    const newTask = { id: myList.length+1, title: newTitle, completed: false };
    setMyList([...myList, newTask]);
    handleClose();
  };

  const handleToggle = (value: number) => () => {
    const updatedMyList = myList.map((task) =>
      task.id === value ? { ...task, completed: !task.completed } : task
    );
    setMyList(updatedMyList);
  };

  const handleDelete = (value: number) => () => {
    const updatedMyList = myList.filter((task) => task.id !== value);
    setMyList(updatedMyList);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the title of the new task:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="text"
            error={submitted && newTitle === ''}
            helperText={submitted && newTitle === '' ? 'Title is required' : ''}
            fullWidth
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddTask} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Box display="flex" justifyContent={'space-between'} sx={{ paddingX: 2 }}>
        <Typography variant="h6">Pending Tasks</Typography>
        <IconButton edge="end" aria-label="delete" onClick={handleAdd} >
          <AddIcon />
        </IconButton>
      </Box>

      <Divider />

      <List sx={{ width: { xs: '100%', md: 800 }, bgcolor: 'background.paper' }}>

        {currentItems.map((task) => {
          const labelId = `checkbox-list-label-${task}`;
          return (
            <ListItem
              key={task.id}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={handleDelete(task.id)} >
                  <DeleteIcon />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton role={undefined} onClick={handleToggle(task.id)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={task.completed}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={task.title} sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ width: '100%', bgcolor: 'background.paper', display: 'flex', justifyContent: 'center' }} >
      <Select
        value={itemsPerPage}
        onChange={(event) => handleItemsPerPageChange(event.target.value as number)}
        sx={{
          width: 64,
          height: 32,
          borderRadius: 10, // Change this value to adjust the border radius
          '& .MuiSelect-select': {
            borderRadius: 10, // Also apply the border radius to the select element
          },
        }}
        >
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
      </Select>
      <Pagination
        count={Math.ceil(myList.length / itemsPerPage)}
        page={currentPage}
        onChange={(_event, page) => handlePageChange(page)}
        showFirstButton
        showLastButton
        
        />
        </Box>

    </>
  );
}
