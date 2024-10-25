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
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';


const myInitialList: Task[] = [
  { id: 0, title: 'Botar la basura basura basura basura', completed: false },
  { id: 1, title: 'Task 2', completed: false },
  { id: 2, title: 'Task 3', completed: false },
  { id: 3, title: 'Task 4', completed: false },
  { id: 4, title: 'Task 5', completed: false },
  { id: 5, title: 'Task 6', completed: false },
  { id: 6, title: 'Task 7', completed: false },
  { id: 7, title: 'Task 8', completed: false },
];

const ITEMS_PER_PAGE = 2;

export function TaskList() {
  const [myList, setMyList] = React.useState<Task[]>(myInitialList);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [submitted, setSubmitted] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState('');


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
    const newTask = { id: myList.length, title: newTitle, completed: false };
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

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = myList.slice(indexOfFirstItem, indexOfLastItem);



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
        <IconButton edge="end" aria-label="delete">
          <AddIcon onClick={handleAdd} />
        </IconButton>
      </Box>
      <Box display="flex"  >

        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>

          {currentItems.map((task) => {
            const labelId = `checkbox-list-label-${task}`;
            return (
              <ListItem
                key={task.id}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon onClick={handleDelete(task.id)} />
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
      </Box>

      <Pagination
        count={Math.ceil(myList.length / ITEMS_PER_PAGE)}
        page={currentPage}
        onChange={(_event, page) => handlePageChange(page)}
        showFirstButton
        showLastButton
        sx={{ width: '100%', bgcolor: 'background.paper', display: 'flex', justifyContent: 'center' }}
      />

    </>
  );
}
