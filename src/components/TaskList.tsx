import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Task } from '../interfaces/task';
import Pagination from '@mui/material/Pagination';
import { Box } from '@mui/material';


const myInitialList: Task[] = [
  { id: 0, title: 'Botar la basura', completed: false },
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
      <List sx={{ width: 600, bgcolor: 'background.paper' }}>
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
                <ListItemText id={labelId} primary={task.title} sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}/>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Pagination
        count={Math.ceil(myList.length / ITEMS_PER_PAGE)}
        page={currentPage}
        onChange={(event, page) => handlePageChange(page)}
        showFirstButton
        showLastButton
        sx={{ width: '100%', bgcolor: 'background.paper', display: 'flex', justifyContent: 'center', }}
      />

    </>
  );
}
