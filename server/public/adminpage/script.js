document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('bookForm');
    const submitButton = document.getElementById('submitButton');
    const responseMessage = document.getElementById('responseMessage');
    
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
        
        categoryGrid.appendChild(categoryItem);
    });

    submitButton.addEventListener('click', async () => {
        try {
            const categories = form.querySelectorAll('input[name="categories"]:checked');
            if (categories.length === 0) {
                responseMessage.innerText = 'Select at least one category.';
                responseMessage.style.color = 'red';
                return;
            }

            const requiredFields = ['title', 'author', 'publishingYear', 'amazon', 'perlego', 'quote', 'image'];
            for (const field of requiredFields) {
                const inputField = form.querySelector(`#${field}`);
                if (!inputField.value.trim()) {
                    responseMessage.innerText = `Please provide a value for ${field}.`;
                    responseMessage.style.color = 'red';
                    return;
                }
            }

            const formData = new FormData(form);
            const response = await fetch('/api/admin/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                responseMessage.innerText = 'Upload successful!';
                responseMessage.style.color = 'green';
                form.reset();
            } else {
                const errorText = await response.text();
                responseMessage.innerText = `Error: ${errorText}`;
                responseMessage.style.color = 'red';
            }
        } catch (error) {
            console.error('Error:', error);
            responseMessage.innerText = 'An error occurred. Please try again later.';
            responseMessage.style.color = 'red';
        }
    });
});
