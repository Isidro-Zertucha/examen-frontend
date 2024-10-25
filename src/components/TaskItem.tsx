import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Task } from '../interfaces/task'
import { IconButton, ListItemButton, ListItemIcon } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


interface Props {
    task: Task;
    handleToggle: (value: number) => void;
    handleDelete: (value: number) => void;
};

export const TaskItem: React.FC<Props> = ({ task, handleToggle, handleDelete }) => {
  const labelId = `checkbox-list-label-${task.id}`;
  return (
    <ListItem
      key={task.id}
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(task.id)} >
          <DeleteIcon />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton role={undefined} onClick={() => handleToggle(task.id)} dense>
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
};

