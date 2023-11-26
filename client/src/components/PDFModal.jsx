import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const PDFModal = ({ isModalOpen, handleCloseModal }) => {
    return (
        <Modal
            open={isModalOpen}
            onClose={handleCloseModal}
        >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Modal Title
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Your modal content goes here.
                </Typography>
                <Button onClick={handleCloseModal}>Close</Button>
            </Box>
        </Modal>    
    );
}

export default PDFModal