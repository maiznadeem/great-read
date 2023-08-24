document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('bookForm');
    const submitButton = document.getElementById('submitButton');
    const responseMessage = document.getElementById('responseMessage');
    const publishingYearInput = document.getElementById('publishingYear');
    
    const currentYear = new Date().getFullYear();
    publishingYearInput.setAttribute('max', currentYear);
    
    function isEmptyOrWhitespace(value) {
        return /^\s*$/.test(value);
    }
    
    function containsSpecialCharacters(value) {
        return /[\n\t\r]/.test(value);
    }
    
    function showError(errorMessage) {
        responseMessage.innerText = errorMessage;
        responseMessage.style.color = 'red';
    }
    
    function resetResponseMessage() {
        responseMessage.innerText = '';
    }

    function isURL(str) {
        const urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
        return urlPattern.test(str);
    }
    
    const categories = [
        "Autobiography/Biography",
        "Managing Workforce",
        "Success Recipes",
        "Procrastination Killers",
        "Mind Tabs",
        "Finding Yourself",
        "Breaking Your Limits",
        "Decision Making",
        "Innovation and Creativity",
        "Productivity Vitamin",
        "Community Builder",
        "Your Habits",
        "Network Web",
        "Productivity Hill",
        "Mindfulness",
        "Understanding Humans",
        "Time Management",
        "A Company's Insider",
        "Business Numeracy",
        "Business Strategy",
        "Art of Persuasion",
        "Emotions",
        "Leadership",
        "Startups",
        "Technology",
        "Product Development",
        "Finances",
        "Communication",
        "Branding",
        "Teamwork",
        "Problem Solving"
    ];

    const categoryGrid = document.getElementById('categoryCheckboxes');
    
    categories.forEach(category => {
        const categoryItem = document.createElement('div');
        categoryItem.classList.add('category-item');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'categories';
        checkbox.value = category;
    
        const label = document.createElement('label');
        label.textContent = category;
    
        categoryItem.appendChild(checkbox);
        categoryItem.appendChild(label);
    
        categoryItem.addEventListener('click', () => {
            if (checkbox.checked) {
                checkbox.checked = false
                categoryItem.classList.remove('selected');
            } else {
                checkbox.checked = true
                categoryItem.classList.add('selected');
            }
        });
        
        categoryGrid.appendChild(categoryItem);
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
            showError('Select at least one category.');
            return;
        }

        if (isEmptyOrWhitespace(title) || containsSpecialCharacters(title)) {
            showError('Please provide a valid title. (should not contain special characters)');
            return;
        }
        
        if (isEmptyOrWhitespace(author) || containsSpecialCharacters(author)) {
            showError('Please provide a valid author. (should not contain special characters)');
            return;
        }
        
        if (isEmptyOrWhitespace(quote) || containsSpecialCharacters(quote)) {
            showError('Please provide a valid quote (without newline characters).');
            return;
        }

        const publishingYearNumber = parseInt(publishingYear);
        if (isNaN(publishingYearNumber) || publishingYearNumber < 1200 || publishingYearNumber > currentYear) {
            showError('Please provide a valid publishing year between 1200 and ' + currentYear + '.');
            return;
        }

        if (!(isURL(amazon) && isURL(perlego))) {
            showError('Please provide valid Amazon and Perlego links.');
            return;
        }
        
        const isConfirmed = confirm('Are you sure you want to submit the form?');
        if (!isConfirmed) return;

        submitButton.disabled = true;
        submitButton.innerHTML = 'Uploading...';
        submitButton.style.backgroundColor = 'lightgray';
        submitButton.style.cursor = 'default';

        try {
            const formData = new FormData(form);
            const response = await uploadFormData(formData);

            if (response.status === 200) {
                responseMessage.innerText = 'Upload successful!';
                responseMessage.style.color = 'green';
                form.reset();
                const categoryItems = categoryGrid.querySelectorAll('.category-item');
                categoryItems.forEach(item => {
                    item.classList.remove('selected');
                });
            } else {
                showError('Error: ' + response.data);
            }
        } catch (error) {
            showError(error.message);
            console.log(error)
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Upload';
            submitButton.style.backgroundColor = '';
            submitButton.style.cursor = 'pointer';
        }
    });

    async function uploadFormData(formData) {
        try {
            const response = await axios.post('/api/admin/upload', formData);
    
            if (response.status === 200) {
                return response;
            } else {
                const errorMessage = response.data.error || 'An unknown error occurred.';
                throw new Error(errorMessage);
            }
        } catch (error) {
            throw new Error('An error occurred: ' + error.message);
        }
    }
    
});
