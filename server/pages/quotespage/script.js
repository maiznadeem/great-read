document.addEventListener('DOMContentLoaded', function () {

    const addQuoteForm = document.getElementById("addQuoteForm");
    const addQuoteButton = document.getElementById("addQuoteButton");
    const deleteQuoteButton = document.getElementById("deleteQuoteButton");
    const searchButton = document.getElementById("searchButton");
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");
    const logoutButton = document.getElementById("logoutButton");
    const addBook = document.getElementById("addBook");
    const responseMessage = document.getElementById("responseMessage");

    function resetResponseMessage() {
        responseMessage.innerText = '';
        responseMessage.classList.remove('error', 'success');
    }

    const imageInput = document.getElementById("image");

    function clearInputFields() {
        document.getElementById("author").value = "";
        document.getElementById("quote").value = "";
        imageInput.value = "";
        document.getElementById("quoteId").value = "";
        searchInput.value = "";
    }

    addQuoteButton.addEventListener('click', function (e) {
        e.preventDefault();

        const author = document.getElementById("author").value.trim();
        const quote = document.getElementById("quote").value.trim();
        const imageFile = imageInput.files[0];

        resetResponseMessage();

        const authorPattern = /^[a-zA-Z\s']+$/;
        if (!author.match(authorPattern)) {
            responseMessage.innerText = "Author should only contain letters and spaces.";
            responseMessage.classList.add('error');
            return;
        }

        if (quote === "") {
            responseMessage.innerText = "Quote cannot be empty.";
            responseMessage.classList.add('error');
            return;
        }

        if (!imageFile) {
            responseMessage.innerText = "Please select an image.";
            responseMessage.classList.add('error');
            return;
        }

        addQuoteButton.disabled = true;
        addQuoteButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';

        const confirmation = confirm("Are you sure you want to add this quote?");
        if (confirmation) {
            const formData = new FormData();
            formData.append('author', author);
            formData.append('quote', quote);
            formData.append('image', imageFile);

            fetch('/admin/uploadquote', {
                method: 'POST',
                body: formData
            })
                .then((response) => {
                    if (response.status === 200) {
                        responseMessage.innerText = "Quote added successfully!";
                        responseMessage.classList.add('success');
                        clearInputFields();
                    } else {
                        responseMessage.innerText = "Error: " + response.statusText;
                        responseMessage.classList.add('error');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    responseMessage.innerText = "An error occurred while adding the quote.";
                    responseMessage.classList.add('error');
                })
                .finally(() => {
                    addQuoteButton.disabled = false;
                    addQuoteButton.innerHTML = 'Add Quote';
                });
        } else {
            addQuoteButton.disabled = false;
            addQuoteButton.innerHTML = 'Add Quote';
        }
    });

    deleteQuoteButton.addEventListener('click', function (e) {
        e.preventDefault();
        resetResponseMessage();

        const quoteId = document.getElementById("quoteId").value;

        if (!quoteId || quoteId.trim() === "") {
            responseMessage.innerText = "Error: Enter Valid Quote ID";
            responseMessage.classList.add('error');
            return;
        }

        const confirmation = confirm("Are you sure you want to delete this quote?");
        if (confirmation) {

            deleteQuoteButton.disabled = true;
            deleteQuoteButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Deleting...';

            fetch(`/admin/deletequote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ quoteId: quoteId })
            })
                .then((response) => {
                    if (response.status === 200) {
                        responseMessage.innerText = "Quote deleted successfully!";
                        responseMessage.classList.add('success');
                        clearInputFields();
                    } else {
                        responseMessage.innerText = "Error: " + response.statusText;
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
                .finally(() => {
                    deleteQuoteButton.disabled = false;
                    deleteQuoteButton.innerHTML = 'Delete Quote';
                });
        }
    });

    searchButton.addEventListener('click', function (e) {
        e.preventDefault();

        searchButton.disabled = true;
        searchButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';

        const searchTerm = searchInput.value;
        fetch(`/admin/searchquote?term=${searchTerm}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('Error fetching quotes');
                }
            })
            .then((data) => {
                searchResults.innerHTML = '';
                if (data && data.length > 0) {
                    data.forEach((quote) => {
                        const quoteItem = document.createElement('div');
                        quoteItem.classList.add('quote-item');
                        quoteItem.innerHTML = `<p><strong>ID: ${quote._id}</strong><br><strong>${quote.author}:</strong> ${quote.quote}</p>`;
                        searchResults.appendChild(quoteItem);
                    });
                } else {
                    searchResults.innerText = 'No quotes found.';
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            })
            .finally(() => {
                searchButton.disabled = false;
                searchButton.innerHTML = 'Search Quotes';
            });
    });

    logoutButton.addEventListener('click', function () {
        fetch('/logout', {
            method: 'POST',
        })
            .then((response) => {
                if (response.status === 200) {
                    window.location.href = '/authpage';
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });

    addBook.addEventListener('click', function () {
        window.history.back();
    })

});
