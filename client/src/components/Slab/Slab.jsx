import React, { useState } from "react";
import { Button } from '@mui/material';
import { purchaseBooksAPI } from "../../utils/api";
import { useNotes } from "../../context/NotesContext";
import pdf from "../../assets/links/PDF.png";
import word from "../../assets/links/Word.png";
import ConfirmationDialog from "./ConfirmationDialog";
import ExpirationDialog from "./ExpirationDialog"

const Slab = () => {
    const { previewOptions, selectedButton, notesBooks, setNotesBooks, urls, setUrls } = useNotes();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [expireOpen, setExpireOpen] = useState(false);

    let total = 10;
    let categories = 1;

    if (selectedButton == 2) {
        categories = 3;
    }
    if (selectedButton == 3) {
        total = 30;
        categories = Infinity;
    }

    const handleClose = () => {
        setOpen(false);
    };
    const handleExpireClose = () => {
        setExpireOpen(false);
    };

    const handleClear = () => {
        setOpen(false);
        setUrls({
            address: [],
            timeCreated: null,
        });
        setNotesBooks([]);
    };

    const handleBelowClick = () => {
        const targetElement = document.getElementById("notessection");
        const offset = targetElement.offsetTop - 170;
        window.scrollTo({ top: offset, behavior: "smooth" });
    };

    const handlePurchase = () => {
        if (urls.address.length != 0) {
            setOpen(true);
            return;
        }
        setLoading(true);
        purchaseBooksAPI(previewOptions, notesBooks)
            .then((response) => {
                const urls = response?.urls;
                setUrls({
                    address: urls,
                    timeCreated: Date.now(),
                });
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error handling file download:', error);
                setLoading(false);
            });
    }

    const handleDownload = (num) => {
        const expirationInterval = 50 * 10 * 1000;
        const isExpired = Date.now() - urls.timeCreated > expirationInterval;

        if (urls.address.length > 0 && !isExpired) {
            const downloadUrl = urls.address;
            const link = document.createElement('a');
            link.href = downloadUrl[num];
            link.target = '_blank';
            link.download = `Notes${num == 0 ? ".docx" : ".pdf"}`;
            link.click();
        }
        else {
            setUrls({
                address: [],
                timeCreated: null,
            });
            setNotesBooks([]);
            setExpireOpen(true);
        }
    };

    return (
        <div className="text-black my-20 flex flex-col sm:flex-row justify-center items-center gap-10">
            <div className="w-96 bg-footer rounded-2xl shadow-xl flex justify-center items-center">
                {notesBooks.length ? (
                    <div className="grid grid-cols-2 gap-4 overflow-y-auto h-[500px] px-4 my-8 scrollbar-thin scrollbar-webkit">
                        {notesBooks.map((book) => (
                            <div key={book._id} className="w-32 h-48 rounded-lg overflow-hidden shadow-lg">
                                <img
                                    src={book.image}
                                    alt="Book"
                                    className="w-full h-full object-cover cursor-pointer"
                                    onClick={() => {
                                        setNotesBooks(prevBooks => prevBooks.filter(filterbook => filterbook._id !== book._id));
                                    }}                                    
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="h-[500px] flex justify-center items-center">
                        <p>
                            Select books from <button className="manrope-semibold" onClick={handleBelowClick}>below</button>
                        </p>
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-2 justify-center items-center sm:items-start">
                <p>
                    {
                        urls.address.length > 0 ? "Please download the notes in your desired format by clicking the button below."
                        :
                        `
                        Hi, you have ${total - notesBooks.length}${" "}
                        ${total - notesBooks.length == 1 ? "book" : "books"} left to
                        choose from${" "}
                        ${categories == Infinity ? "any" : `${categories}`}${" "}
                        ${categories == 1 || categories == Infinity
                            ? "category"
                            : "categories"}
                        `
                    }
                    
                </p>
                
                { urls.address.length > 0 && 
                
                    <div className="flex gap-2">
                        <Button className="w-48" variant="contained"
                            sx={{
                                color: "#000000",
                                backgroundColor: "#F2EADF",
                                "&:hover": {
                                    backgroundColor: "#F2EADF",
                                },
                                "&:disabled": {
                                    backgroundColor: "#CCCCCC",
                                },
                            }}
                            disableElevation
                            onClick={() => handleDownload(0)}
                        >
                            <img src={word} alt="icon" className="w-6 h-6 mr-2" />
                            Download Word
                        </Button>
                        <Button className="w-48" variant="contained"
                            sx={{
                                color: "#000000",
                                backgroundColor: "#F2EADF",
                                "&:hover": {
                                    backgroundColor: "#F2EADF",
                                },
                                "&:disabled": {
                                    backgroundColor: "#CCCCCC",
                                },
                            }}
                            disableElevation
                            onClick={() => handleDownload(1)}
                        >
                            <img src={pdf} alt="icon" className="w-6 h-6 mr-2" />
                            Download PDF
                        </Button>
                    </div>
                 
                }

                <Button className="w-48" variant="contained"
                    sx={{
                        backgroundColor: "#FFA500",
                        "&:hover": {
                            backgroundColor: "#FFA500",
                        },
                        "&:disabled": {
                            backgroundColor: "#CCCCCC",
                        },
                    }}
                    disableElevation
                    disabled={(notesBooks.length < total && urls.address.length == 0) || loading}
                    onClick={handlePurchase}
                >
                    {urls.address.length > 0 ? "Purchase more" : "Purchase"} 
                </Button>
                {
                    urls.address.length > 0 && 
                    <p>Warning: Select purchase more if you have downloaded previous documents.</p>
                }
            </div>
            <ConfirmationDialog
                open={open}
                handleClose={handleClose}
                handleClear={handleClear}
            />
            <ExpirationDialog
                expireOpen={expireOpen}
                handleExpireClose={handleExpireClose}
            />
        </div>
    );
};

export default Slab;
