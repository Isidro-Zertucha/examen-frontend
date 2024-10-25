import React from 'react';
import { Box, MenuItem, Pagination, Select } from '@mui/material';
import { Task } from '../interfaces/task';


interface Props {
    itemsPerPage: number;
    handleItemsPerPageChange: (value: number) => void;
    myList: Task[];
    currentPage: number;
    handlePageChange: (page: number) => void;
};

export const Footer: React.FC<Props> = ({ itemsPerPage, handleItemsPerPageChange, myList, currentPage, handlePageChange }) => {

    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }} >
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
    );
};

