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

        addQuoteButton.innerText = "Adding...";
        addQuoteButton.disabled = true;
        addQuoteButton.style.backgroundColor = 'lightgray';
        addQuoteButton.style.cursor = 'default';

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
            addQuoteButton.innerText = "Add Quote";
            addQuoteButton.disabled = false;
            addQuoteButton.style.backgroundColor = '';
            addQuoteButton.style.cursor = 'pointer';
        });
    });

    deleteQuoteButton.addEventListener('click', function (e) {
        e.preventDefault();
        const quoteId = document.getElementById("quoteId").value;
        fetch(`/admin/deletequote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quoteId: quoteId })
        })
        .then((response) => {
            if (response.status === 200) {
                resetResponseMessage();
                responseMessage.innerText = "Quote deleted successfully!";
            } else {
                resetResponseMessage();
                responseMessage.innerText = "Error: " + response.statusText;
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
    

    searchButton.addEventListener('click', function (e) {
        e.preventDefault();
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