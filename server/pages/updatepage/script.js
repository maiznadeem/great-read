document.addEventListener("DOMContentLoaded", function () {
    // Elements
    const updateBookForm = document.getElementById("updateBookForm");
    const updateButton = document.getElementById("updateButton");
    const deleteButton = document.getElementById("deleteButton");
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const searchResults = document.getElementById("searchResults");
    const publishingYearInput = document.getElementById('publishingYear');
    const addButton = document.getElementById("addButton");
    const logoutButton = document.getElementById("logoutButton");

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

    updateButton.addEventListener("click", function (e) {
        e.preventDefault();
        // Implement update book functionality here
        // You can use the values from updateBookForm to send an update request to your API
        // Example: axios.put("/api/updatebook", { /* book data */ })
    });

    deleteButton.addEventListener("click", function (e) {
        e.preventDefault();
        // Implement delete book functionality here
        // You can use the values from updateBookForm to send a delete request to your API
        // Example: axios.delete("/api/deletebook", { /* book data */ })
    });

    searchButton.addEventListener("click", function (e) {
        e.preventDefault();
        const searchTerm = searchInput.value;
        // Implement search functionality here
        // You can use axios to send a request to your API to search for books based on searchTerm
        // Example: axios.get(`/api/search?term=${searchTerm}`)
        // Update searchResults with the retrieved data
        // Example: searchResults.innerHTML = /* display search results */
    });

    addButton.addEventListener("click", function () {
        // Redirect to the /admin page when Add Book button is clicked
        window.location.href = "/admin";
    });

    logoutButton.addEventListener("click", function () {
        // Implement logout functionality here
        // You can clear user tokens or session and redirect to the login page
    });
});
