import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Task } from '../interfaces/task'


interface Props {
    todo: Task;
    onToggle: (id: number) => void;
   // onDelete: (id: number) => void;
  }

export  const TaskItem: React.FC<Props> = ({ todo, }) => {
    const handleToggle = () => {
      onToggle(todo.id);
    };

  return (
    <ListItem>
      <Checkbox
        checked={todo.completed}
        onChange={handleToggle}
        color="primary"
      />
      <ListItemText primary={todo.title} secondary={todo.title} />
    </ListItem>
  );
};

