document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('bookForm');
    const submitButton = document.getElementById('submitButton');
    const responseMessage = document.getElementById('responseMessage');
    const publishingYearInput = document.getElementById('publishingYear');
    const logoutButton = document.getElementById('logoutButton');
    const updateOrDeleteButton = document.getElementById('updateOrDeleteButton');
    const manageCategories = document.getElementById('addOrDeleteQuotes');
    
    const currentYear = new Date().getFullYear();
    publishingYearInput.setAttribute('max', currentYear);
    
    function isEmptyOrWhitespace(value) {
        return /^\s*$/.test(value);
    }
    
    function containsSpecialCharacters(value) {
        return /[\n\t\r]/.test(value);
    }
    
    function resetResponseMessage() {
        responseMessage.innerText = '';
    }

    function isURL(str) {
        const urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
        return urlPattern.test(str);
    }

    const categoryGrid = document.getElementById('categoryCheckboxes');
    
    fetch('/get/categories')
    .then((response) => response.json())
    .then((categories) => {
        categories.forEach((category) => {
            const categoryItem = document.createElement('div');
            categoryItem.classList.add('category-item');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'categories';
            checkbox.value = category.name;

            const label = document.createElement('label');
            label.textContent = category.name;

            categoryItem.appendChild(checkbox);
            categoryItem.appendChild(label);

            categoryItem.addEventListener('click', () => {
                if (checkbox.checked) {
                    checkbox.checked = false;
                    categoryItem.classList.remove('selected');
                } else {
                    checkbox.checked = true;
                    categoryItem.classList.add('selected');
                }
            });

            categoryGrid.appendChild(categoryItem);
        });
    })
    .catch((error) => {
        console.error('Error fetching categories:', error);
    });

    function handleError(message) {
        responseMessage.innerText = message;
        responseMessage.style.color = 'red';
    }

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

    updateOrDeleteButton.addEventListener('click', function () {
        window.location.href = '/admin/update'
    })

    manageCategories.addEventListener('click', function () {
        window.location.href = '/admin/categories'
    })

    const imageInput = form.querySelector('#image');
    const allowedExtensions = ['jpg', 'jpeg'];

    imageInput.addEventListener('change', function () {
        const filePath = this.value;
        const fileExtension = filePath.split('.').pop().toLowerCase();

        if (!allowedExtensions.includes(fileExtension)) {
            handleError('Please upload only JPG/JPEG files.');
            this.value = '';
        }
    });
    
    submitButton.addEventListener('click', async (e) => {
        e.preventDefault();
    
        resetResponseMessage();
    
        const title = form.querySelector('#title').value.trim();
        const author = form.querySelector('#author').value.trim();
        const publishingYear = form.querySelector('#publishingYear').value.trim();
        const amazon = form.querySelector('#amazon').value.trim();
        const perlego = form.querySelector('#perlego').value.trim();
        const quote = form.querySelector('#quote').value.trim();
    
        const selectedCategories = form.querySelectorAll('input[name="categories"]:checked');
        if (selectedCategories.length === 0) {
            handleError('Select atleast one category.');
            return;
        }
    
        if (isEmptyOrWhitespace(title) || containsSpecialCharacters(title)) {
            handleError('Please provide a valid title. (should not contain special characters)');
            return;
        }
    
        if (isEmptyOrWhitespace(author) || containsSpecialCharacters(author)) {
            handleError('Please provide a valid author. (should not contain special characters)');
            return;
        }
    
        if (isEmptyOrWhitespace(quote) || containsSpecialCharacters(quote)) {
            handleError('Please provide a valid quote (without newline characters).');
            return;
        }
    
        const publishingYearNumber = parseInt(publishingYear);
        if (isNaN(publishingYearNumber) || publishingYearNumber < 1200 || publishingYearNumber > currentYear) {
            handleError('Please provide a valid publishing year between 1200 and ' + currentYear + '.');
            return;
        }
    
        if (!(isURL(amazon) || isURL(perlego))) {
            handleError('Please provide valid Amazon / Perlego link.');
            return;
        }
    
        const formData = new FormData(form);
    
        try {
            const response = await axios.post('/admin/uploadbook', formData);
    
            if (response.status === 200) {
                responseMessage.innerText = 'Upload successful!';
                responseMessage.style.color = 'green';
                form.reset();
                const categoryItems = categoryGrid.querySelectorAll('.category-item');
                categoryItems.forEach(item => {
                    item.classList.remove('selected');
                });
            }
        } catch (error) {
            if (error.response && error.response.data.error) {
                const isConfirmed = confirm("A book with the same title already exists. Do you wish to continue?");
                if (!isConfirmed) return;
                
                try {
                    const confirmUploadResponse = await axios.post('/admin/uploadbook/confirm', formData);
                    
                    if (confirmUploadResponse.status === 200) {
                        responseMessage.innerText = 'Upload successful!';
                        responseMessage.style.color = 'green';
                        form.reset();
                        const categoryItems = categoryGrid.querySelectorAll('.category-item');
                        categoryItems.forEach(item => {
                            item.classList.remove('selected');
                        });
                    }
                } catch (confirmError) {
                    handleError('An error occurred while confirming the upload: ' + confirmError.message);
                }
            } else if (error.response) {
                const htmlResponse = error.response.data;
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlResponse, 'text/html');
                const errorMessage = doc.querySelector('pre').textContent;
                const firstLine = errorMessage.split('\n')[0];
                handleError(firstLine);
            } else {
                handleError('An error occurred: ' + error.message);
            }
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Upload';
            submitButton.style.backgroundColor = '';
            submitButton.style.cursor = 'pointer';
        }
    });
       
    
});
