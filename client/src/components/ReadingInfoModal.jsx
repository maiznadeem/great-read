import React from 'react';
import { Modal, Box } from '@mui/material';
import Shelf from './Shelf';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '1000px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const ReadingInfoModal = ({ open, handleClose }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 2,
            }}
        >
            <Shelf />
        </Modal>
    );
};

export default ReadingInfoModal;
