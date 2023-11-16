import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button } from '@mui/material';

const DownloadNotesModal = ({ open, handleClose, pages }) => {
    const price = pages === 100 ? 59 : pages === 500 ? 179 : 279;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        paymentMethod: 'creditCard',
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setErrors({
            ...errors,
            [e.target.name]: '',
        });
    };

    const validateForm = () => {
        let valid = true;
        let newErrors = {};
    
        if (formData.name.trim() === '') {
            newErrors = {
                ...newErrors,
                name: 'Name is required',
            };
            valid = false;
        } else if (formData.name.length < 3 || !/^[a-zA-Z ]+$/.test(formData.name)) {
            newErrors = {
                ...newErrors,
                name: 'Name should be at least 3 characters with no special characters',
            };
            valid = false;
        }
    
        if (formData.email.trim() === '') {
            newErrors = {
                ...newErrors,
                email: 'Email is required',
            };
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors = {
                ...newErrors,
                email: 'Invalid email format',
            };
            valid = false;
        }
    
        setErrors(newErrors);
    
        return valid;
    };
    

    const handleConfirm = () => {
        if (validateForm()) {
            handleClose();
        }
    };

    const handleModalClose = () => {
        setFormData({
            name: '',
            email: '',
            paymentMethod: 'creditCard',
        });
        setErrors({
            name: '',
            email: '',
        });
        handleClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleModalClose}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div className="relative bg-footer p-8 m-4 w-full sm:max-w-[600px] rounded-xl">
                <IconButton
                    onClick={handleModalClose}
                    sx={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        color: 'text.primary',
                    }}
                >
                    <ClearIcon />
                </IconButton>
                <h2 className="text-2xl text-center manrope-semibold text-black my-8">
                    Download {pages !== 1000 ? `${pages} pages` : 'all notes'}, for only £{price}
                </h2>
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={formData.name}
                    name="name"
                    onChange={handleInputChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    sx={{
                        marginBottom: 2,
                    }}
                    InputProps={{
                        sx: {
                            backgroundColor: 'white',
                            borderRadius: 2,
                        }
                    }}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={formData.email}
                    name="email"
                    onChange={handleInputChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    sx={{
                        marginBottom: 2,
                    }}
                    InputProps={{
                        sx: {
                            backgroundColor: 'white',
                            borderRadius: 2,
                        }
                    }}
                />
                <h3 className="text-xl manrope-regular text-black my-4">
                    Payment method
                </h3>
                <RadioGroup
                    value={formData.paymentMethod}
                    onChange={(e) =>
                        setFormData({ ...formData, paymentMethod: e.target.value })
                    }
                >
                    <FormControlLabel
                        value="creditCard"
                        control={<Radio />}
                        label="Credit Card"
                        sx={{ color: 'black' }}
                    />
                    <FormControlLabel
                        value="paypal"
                        control={<Radio />}
                        label="PayPal"
                        sx={{ color: 'black' }}
                    />
                </RadioGroup>
                <div className='w-full flex justify-center my-4'>
                    <Button 
                        variant="contained"
                        className='w-36'
                        sx={{ borderRadius: 2 }}
                        onClick={handleConfirm}
                    >
                        Confirm
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default DownloadNotesModal;
