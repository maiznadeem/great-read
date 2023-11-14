import React, { useRef } from 'react';
import { Modal } from '@mui/material';
import Shelf from './Shelf';

const ReadingInfoModal = ({ open, handleClose }) => {

    const shelfRef = useRef();
    
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
            <Shelf ref={shelfRef} />
        </Modal>
    );
};

export default ReadingInfoModal;
