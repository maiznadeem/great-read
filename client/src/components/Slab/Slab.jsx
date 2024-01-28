import React, { useState } from "react";
import { Button } from '@mui/material';
import { purchaseBooksAPI } from "../../utils/api";
import { useNotes } from "../../context/NotesContext";

const Slab = () => {
    const { previewOptions, selectedButton, notesBooks, setNotesBooks } = useNotes();
    const [loading, setLoading] = useState(false);

    let total = 10;
    let categories = 1;

    if (selectedButton == 2) {
        categories = 3;
    }
    if (selectedButton == 3) {
        total = 30;
        categories = Infinity;
    }

    const handleBelowClick = () => {
        const targetElement = document.getElementById("notessection");
        const offset = targetElement.offsetTop - 170;
        window.scrollTo({ top: offset, behavior: "smooth" });
    };

    const handlePurchase = () => {
        setLoading(true);
        purchaseBooksAPI(previewOptions, notesBooks)
            .then((data) => {
                setLoading(false);
            })
            .catch((error) => {
                console.error(error.message);
                setLoading(false);
            });
    }

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
                    Hi, you have {total - notesBooks.length}{" "}
                    {total - notesBooks.length == 1 ? "book" : "books"} left to
                    choose from{" "}
                    {categories == Infinity ? "any" : `${categories}`}{" "}
                    {categories == 1 || categories == Infinity
                        ? "category"
                        : "categories"}
                </p>
                <Button className="w-36" variant="contained"
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
                    disabled={notesBooks.length < total || loading}
                    onClick={handlePurchase}
                >
                    Purchase
                </Button>
            </div>
        </div>
    );
};

export default Slab;
