document.addEventListener("DOMContentLoaded", function () {
    const popupWindow = document.getElementById("popupWindow");
    const closeButton = document.querySelector(".close");
    const userForm = document.getElementById("userForm");
    const okButton = document.getElementById("okButton");

    // Flag to track if the form has been submitted
    let formSubmitted = false;

    function showPopup() {
        popupWindow.style.display = 'block';
    }

    // Show the popup every 5 seconds
    const intervalId = setInterval(() => {
        if (!formSubmitted) { // Only show if the form hasn't been submitted
            showPopup();
        }
    }, 5000);

    closeButton.addEventListener('click', function () {
        popupWindow.style.display = 'none';
    });

    userForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const mobile = document.getElementById("mobile").value;

        // Simulate sending data to the server
        fetch('http://localhost:3000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, mobile })
        })
        .then(response => {
            if (response.ok) {
                formSubmitted = true; // Update the flag
                displayThankYouMessage();
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    });

    function displayThankYouMessage() {
        popupWindow.querySelector('.popup-content').innerHTML = `
            <span class="close">&times;</span>
            <h2>Thank You!</h2>
            <p>Your details have been submitted.</p>
            <button id="okButton" class="btn">OK</button>
        `;
        // Attach event listener for the new OK button
        document.getElementById("okButton").addEventListener('click', function () {
            popupWindow.style.display = 'none';
        });
        popupWindow.style.display = 'block'; // Show the updated popup
    }
});
