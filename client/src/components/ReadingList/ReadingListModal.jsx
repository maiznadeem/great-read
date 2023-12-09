import React, { useRef } from 'react';
import { Modal } from '@mui/material';
import Shelf from './Shelf';

const ReadingListModal = ({ open, handleClose }) => {
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
            <div
                style={{
                    maxHeight: '90vh',
                    overflowY: 'auto',
                }}
                className='rounded-xl'
            >
                <Shelf ref={shelfRef} />
            </div>
        </Modal>
    );
};

export default ReadingListModal;
