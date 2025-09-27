// js/script.js

document.addEventListener('DOMContentLoaded', () => {
    
    // ===============================================
    // 1. Welcome Speech on Home Page
    // ===============================================
    function setWelcomeMessage() {
        // Prompt for the user's name
        let userName = prompt("Marsha");
        
        // Use a default name if the user cancels or enters nothing
        if (!userName || userName.trim() === "") {
            userName = "Marsha"; 
        }

        // Update the H1 element
        const welcomeElement = document.getElementById('welcome-message');
        if (welcomeElement) {
            welcomeElement.textContent = `Hi ${userName}, Welcome To RevoU`;
        }
    }

    setWelcomeMessage();

    // ===============================================
    // 2. Message Us Form Validation & Submission
    // ===============================================

    const form = document.getElementById('message-us-form');
    const displayBox = document.getElementById('form-display-box');
    const currentTimeSpan = document.getElementById('current-time');

    // Function to update the current time display
    function updateCurrentTime() {
        const now = new Date();
        const options = { 
            weekday: 'short', 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit', 
            timeZoneName: 'short' 
        };
        currentTimeSpan.textContent = now.toLocaleString('en-US', options);
    }
    
    // Initial call and set interval to update the time every second (optional, for real-time feel)
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000); 

    // Validation helper function
    function validateField(inputElement, errorMessageId, validationFn) {
        const errorElement = document.getElementById(errorMessageId);
        const isValid = validationFn(inputElement.value);

        if (isValid) {
            errorElement.classList.add('hidden');
            inputElement.classList.remove('border-red-500');
        } else {
            errorElement.classList.remove('hidden');
            inputElement.classList.add('border-red-500');
        }
        return isValid;
    }

    // Validation functions
    const isRequired = value => value.trim() !== '';
    const isValidEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const isNumeric = value => !value || /^\d+$/.test(value); // Allows empty for optional phone

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Stop the default form submission

        let allValid = true;

        // Validate Name (Required)
        const nameInput = document.getElementById('name');
        if (!validateField(nameInput, 'name-error', isRequired)) {
            allValid = false;
        }

        // Validate Email (Required & Format)
        const emailInput = document.getElementById('email');
        if (!validateField(emailInput, 'email-error', value => isRequired(value) && isValidEmail(value))) {
            allValid = false;
        }

        // Validate Phone (Optional but must be numeric if present)
        const phoneInput = document.getElementById('phone');
        if (!validateField(phoneInput, 'phone-error', isNumeric)) {
            allValid = false;
        }
        
        // Validate Message (Required)
        const messageInput = document.getElementById('message');
        if (!validateField(messageInput, 'message-error', isRequired)) {
            allValid = false;
        }

        if (allValid) {
            // Get all form data
            const formData = new FormData(form);
            const data = {};
            for (const [key, value] of formData.entries()) {
                data[key] = value;
            }

            // Display the submitted data
            displayBox.innerHTML = `
                <p><strong class="font-semibold">Nama:</strong> ${data['name']}</p>
                <p><strong class="font-semibold">Email:</strong> ${data['email']}</p>
                <p><strong class="font-semibold">Phone:</strong> ${data['phone'] || 'N/A'}</p>
                <p><strong class="font-semibold">Tanggal Lahir:</strong> ${data['tanggal-lahir']}</p>
                <p><strong class="font-semibold">Jenis Kelamin:</strong> ${data['jenis-kelamin']}</p>
                <p><strong class="font-semibold">Pesan:</strong> ${data['message']}</p>
            `;

            alert("Form submitted successfully! Check the display box.");
            // In a real application, you would send this data to a server here.
        } else {
            alert("Please fix the validation errors before submitting.");
        }
    });

    // Optional: Add real-time validation on input blur
    document.getElementById('name').addEventListener('blur', (e) => validateField(e.target, 'name-error', isRequired));
    document.getElementById('email').addEventListener('blur', (e) => validateField(e.target, 'email-error', value => isRequired(value) && isValidEmail(value)));
    document.getElementById('phone').addEventListener('blur', (e) => validateField(e.target, 'phone-error', isNumeric));
    document.getElementById('message').addEventListener('blur', (e) => validateField(e.target, 'message-error', isRequired));

});