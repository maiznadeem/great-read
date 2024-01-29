import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function ExpirationDialog({ expireOpen, handleExpireClose }) {
    return (
        <Dialog open={expireOpen} onClose={handleExpireClose}>
            <DialogTitle>Warning</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    The documents were expired. Please make another purchase. 
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleExpireClose} color="primary" autoFocus>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ExpirationDialog;
