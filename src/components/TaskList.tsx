import * as React from 'react';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { Task } from '../interfaces/task';
import TaskService from '../services/taskService';
import { useEffect } from 'react';
import { Box, Divider,Typography } from '@mui/material';
import { AddTaskForm, Footer, TaskItem } from '.';


export const TaskList: React.FC = () => {
  const [myList, setMyList] = React.useState<Task[]>(() => {
    const storedList = localStorage.getItem('myList');
    return storedList ? JSON.parse(storedList) : [];
  });
  const [currentPage, setCurrentPage] = React.useState(1);
  const [submitted, setSubmitted] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState('');
  const [itemsPerPage, setItemsPerPage] = React.useState(2);
  const [currentItems, setCurrentItems] = React.useState<Task[]>([]);

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
    if (myList.length === 0) {
      fetchTasks();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('myList', JSON.stringify(myList));
  }, [myList]);

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = myList.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentItems(currentItems);
  }, [myList, currentPage, itemsPerPage]);

  const handleItemsPerPageChange = (value: number) => {
    setCurrentPage(1);
    setItemsPerPage(value);
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
    const newTask = { id: myList.length + 1, title: newTitle, completed: false };
    setMyList([...myList, newTask]);
    handleClose();
  };

  const handleToggle = (value: number) => {
    const updatedMyList = myList.map((task) =>
      task.id === value ? { ...task, completed: !task.completed } : task
    );
    setMyList(updatedMyList);    
  };

  const handleDelete = (value: number) => {
    const updatedMyList = myList.filter((task) => task.id !== value);
    setMyList(updatedMyList);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <AddTaskForm open={open} handleClose={handleClose} newTitle={newTitle} setNewTitle={setNewTitle} submitted={submitted} handleAddTask={handleAddTask} />


      <Box display="flex" justifyContent={'space-between'} sx={{ paddingX: 2 }}>
        <Typography variant="h6">Pending Tasks</Typography>
        <IconButton edge="end" aria-label="delete" onClick={handleAdd} >
          <AddIcon />
        </IconButton>
      </Box>

      <Divider />

      <List sx={{ width: { xs: '100%', md: 800 }, bgcolor: 'background.paper' }}>
        {currentItems.map((task) => {
          return <TaskItem key={task.id} task={task} handleToggle={handleToggle} handleDelete={handleDelete}></TaskItem>
        })}
      </List>

      <Footer itemsPerPage={itemsPerPage} handleItemsPerPageChange={handleItemsPerPageChange} myList={myList} currentPage={currentPage} handlePageChange={handlePageChange}></Footer>
    </>
  );
}
