import React from 'react';
import { Modal } from '@mui/material';
import Shelf from './Shelf';

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
