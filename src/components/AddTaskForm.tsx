import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@mui/material';


interface Props {
    open: boolean;
    handleClose: () => void;
    newTitle: string;
    setNewTitle: (value: string) => void;
    submitted: boolean;
    handleAddTask: () => void;
};

export const AddTaskForm: React.FC<Props> = ({ open, handleClose, newTitle, setNewTitle, submitted, handleAddTask }) => {

  return (
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
  );
};

