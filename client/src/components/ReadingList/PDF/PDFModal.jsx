import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useReadingList } from '../../../context/ReadingListContext';
import Logo from '../../../assets/logos/Logo.svg';
import amazonIcon from '../../../assets/links/amazon.png';
import perlegoIcon from '../../../assets/links/perlego.png';
import PDFFile from './PDFFile';
import { PDFDownloadLink } from '@react-pdf/renderer';

const PDFModal = ({ isModalOpen, handleCloseModal }) => {

    const { name, period, goal, books } = useReadingList();

    const fileName = `${name}'s Reading List`;

    return (
        <Modal open={isModalOpen} onClose={handleCloseModal}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: 2,
                    width: '95%',
                    maxWidth: 500,
                }}
                className="p-4 sm:p-8"
            >
                <div className='flex flex-col gap-4 sm:gap-8'>
                    <h1 className='text-black manrope-regular text-xl sm:text-2xl w-full text-center'>
                        Your Bookshelf Preview
                    </h1>
                    <div className='border-2 overflow-y-auto max-h-[60vh]'>
                        <div className='flex flex-col gap-4 p-4'>
                            <div className='w-full'>
                                <img src={Logo} alt='Logo' className='h-20' />
                            </div>
                            <p className='text-black'>
                                Hi <strong>{name}</strong>, your reading length is{' '}
                                <strong>{period}</strong> and you have selected{' '}
                                <strong>{goal === 1 ? '1 book' : `${books.length} books`}</strong>.
                            </p>
                            <div className='grid grid-cols-2 gap-4'>
                                {books.map((book, index) => (
                                    <div key={index} className='flex flex-col items-center gap-2'>
                                        <div className='w-32 h-52 sm:w-44 sm:h-72 shadow-lg'>
                                            <img
                                                src={book.image}
                                                alt={`Book ${index + 1}`}
                                                className='w-full h-full object-cover'
                                            />
                                        </div>
                                        <div className="flex space-x-2 items-center">
                                            { book.amazon &&  <img
                                                src={amazonIcon}
                                                alt="Amazon"
                                                className="w-auto h-4 cursor-pointer hover:tooltip"
                                                title="Amazon"
                                                onClick={() => openLinkInNewTab(book.amazon)}
                                            />}
                                            { book.perlego && <img
                                                src={perlegoIcon}
                                                alt="Perlego"
                                                className="w-auto h-4 cursor-pointer hover:tooltip"
                                                title="Perlego"
                                                onClick={() => openLinkInNewTab(book.perlego)}
                                            />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <PDFDownloadLink 
                            document={
                                <PDFFile name={name} period={period} goal={goal} books={books} selected={books.length} />
                            }
                            fileName={fileName}>
                            {({loading}) => (
                                loading ?                               
                                <Button
                                    variant='contained'
                                    color='customOrange'
                                    disableElevation
                                    disabled
                                    sx={{
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        fontWeight: 600,
                                    }}
                                >
                                    Loading...
                                </Button> : 
                                <Button
                                    variant='contained'
                                    color='customOrange'
                                    disableElevation
                                    sx={{
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        fontWeight: 600,
                                    }}
                                >
                                    Download
                                </Button>
                            )}
                        </PDFDownloadLink>
                    </div>
                </div>
            </Box>
        </Modal>
    );
};

export default PDFModal;
