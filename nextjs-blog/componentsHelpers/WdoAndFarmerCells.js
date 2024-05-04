import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

export const WdoAndFarmerCell = ({ value, row, onCellValueChange, field }) => {
    const [open, setOpen] = useState(false);
    const [tempComment, setTempComment] = useState(value);

    const handleOpen = () => {
        setOpen(true);
        setTempComment(value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        setOpen(false);
        onCellValueChange({
            id: row.id,
            field: field,
            value: tempComment,
        });
    };

    const handleCommentChange = (event) => {
        setTempComment(event.target.value);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleOpen} aria-label="more">
                <MoreVertIcon />
            </IconButton>
            <span>{value}</span>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
                <DialogTitle>Comment</DialogTitle>
                <DialogContent>
                    <input 
                        type="text" 
                        value={tempComment} 
                        onChange={handleCommentChange} 
                        autoFocus 
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};