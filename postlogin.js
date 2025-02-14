/* 

A lot of stuff is hidden because while testing I was unable to use the backend (PHP files) tofetch, add, edit, or delete contacts.
So I used placeholders and local storage to test the functionality. The final code will be uncommented and will use the backend.

*/
// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
    console.log("Contact Manager Loaded");

    const addContactBtn = document.getElementById("add-contact-btn");
    const contactForm = document.getElementById("contact-form");
    const contactFormElement = document.getElementById("contact-form-element");
    const searchInput = document.getElementById("search-input");
    const contactsGrid = document.querySelector(".contacts-grid");

    // Toggle contact form visibility
    addContactBtn.addEventListener("click", function () {
        console.log("Toggling contact form");
        contactForm.style.display = contactForm.style.display === "none" || contactForm.style.display === "" ? "block" : "none";
    });

    // Display placeholders if fetch fails or contacts are empty
    function displayPlaceholders() {
        console.log("Displaying placeholders...");
        contactsGrid.innerHTML = "";
        for (let i = 1; i <= 9; i++) {
            const placeholder = document.createElement("div");
            placeholder.classList.add("contact-card");
            placeholder.dataset.id = `placeholder-${i}`;
            placeholder.innerHTML = `
                <h3 contenteditable="false">Placeholder Contact ${i}</h3>
                <p>Email: <span contenteditable="false">placeholder${i}@example.com</span></p>
                <p>Phone: <span contenteditable="false">123-456-789${i}</span></p>
                <button class="edit-contact">Edit</button>
                <button class="delete-contact">Delete</button>
                <button class="save-contact" style="display:none">Save</button>
            `;
            contactsGrid.appendChild(placeholder);
        }
    }

    // Fetch and display contacts (hidden for now, will use in production)
    async function fetchContacts() {
        /*
        try {
            console.log("Fetching contacts...");
            const response = await fetch("retrieve.php");
            if (!response.ok) throw new Error(`Failed to fetch contacts: ${response.status}`);
            const contacts = await response.json();

            console.log("Contacts fetched:", contacts);

            contactsGrid.innerHTML = "";
            if (contacts.length === 0) {
                console.log("No contacts found. Displaying placeholders.");
                displayPlaceholders(); // TODO: Remove this in production
            } else {
                contacts.forEach(contact => {
                    const contactCard = document.createElement("div");
                    contactCard.classList.add("contact-card");
                    contactCard.dataset.id = contact.id;

                    contactCard.innerHTML = `
                        <h3 contenteditable="false">${contact.name}</h3>
                        <p>Email: <span contenteditable="false">${contact.email}</span></p>
                        <p>Phone: <span contenteditable="false">${contact.phone}</span></p>
                        <button class="edit-contact">Edit</button>
                        <button class="delete-contact">Delete</button>
                        <button class="save-contact" style="display:none">Save</button>
                    `;

                    contactsGrid.appendChild(contactCard);
                });
            }
        } catch (error) {
            console.error("Error fetching contacts:", error);
            displayPlaceholders(); // TODO: Remove this in production
        }
        */

        // For testing: display placeholders
        console.log("Skipping fetch and displaying placeholders for testing.");
        displayPlaceholders();
    }

    // Add a contact (hidden for now, will use in production)
    contactFormElement.addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;

        if (!name || !email || !phone) {
            alert("All fields are required to add a contact.");
            return;
        }

        console.log("Adding contact:", { name, email, phone });

        /*
        try {
            const response = await fetch("create.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, phone })
            });

            if (!response.ok) throw new Error(`Failed to add contact: ${response.status}`);

            console.log("Contact added successfully");

            contactFormElement.reset();
            contactForm.style.display = "none";
            fetchContacts();
        } catch (error) {
            console.error("Error adding contact:", error);
            alert("Failed to add contact. Please try again.");
        }
        */

        // For testing: Add a placeholder contact locally
        const placeholderCount = contactsGrid.querySelectorAll(".contact-card").length;
        const newPlaceholder = document.createElement("div");
        newPlaceholder.classList.add("contact-card");
        newPlaceholder.dataset.id = `placeholder-${placeholderCount + 1}`;
        newPlaceholder.innerHTML = `
            <h3 contenteditable="false">${name}</h3>
            <p>Email: <span contenteditable="false">${email}</span></p>
            <p>Phone: <span contenteditable="false">${phone}</span></p>
            <button class="edit-contact">Edit</button>
            <button class="delete-contact">Delete</button>
            <button class="save-contact" style="display:none">Save</button>
        `;
        contactsGrid.appendChild(newPlaceholder);

        contactFormElement.reset();
        contactForm.style.display = "none";
    });

    // Handle edit and delete actions
    contactsGrid.addEventListener("click", async function (e) {
        const target = e.target;
        const contactCard = target.closest(".contact-card");

        console.log("Clicked element:", target);
        if (!contactCard) {
            console.log("No contact card clicked.");
            return;
        }

        const contactId = contactCard.dataset.id;
        console.log("Clicked on contact ID:", contactId);

        if (target.classList.contains("edit-contact")) {
            console.log("Edit button clicked for:", contactId);
            const h3 = contactCard.querySelector("h3");
            const emailSpan = contactCard.querySelector("p:nth-of-type(1) span");
            const phoneSpan = contactCard.querySelector("p:nth-of-type(2) span");
            const saveButton = contactCard.querySelector(".save-contact");

            h3.contentEditable = "true";
            emailSpan.contentEditable = "true";
            phoneSpan.contentEditable = "true";
            target.style.display = "none";
            saveButton.style.display = "inline";
        } else if (target.classList.contains("save-contact")) {
            console.log("Save button clicked for:", contactId);
            const h3 = contactCard.querySelector("h3");
            const emailSpan = contactCard.querySelector("p:nth-of-type(1) span");
            const phoneSpan = contactCard.querySelector("p:nth-of-type(2) span");
            const editButton = contactCard.querySelector(".edit-contact");

            h3.contentEditable = "false";
            emailSpan.contentEditable = "false";
            phoneSpan.contentEditable = "false";
            target.style.display = "none";
            editButton.style.display = "inline";

            console.log("Updated contact:", {
                contactId,
                name: h3.textContent,
                email: emailSpan.textContent,
                phone: phoneSpan.textContent
            });

            if (contactId.startsWith("placeholder-")) {
                console.log("Updated placeholder contact locally.");
            } else {
                /*
                try {
                    const response = await fetch("update.php", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            id: contactId,
                            name: h3.textContent,
                            email: emailSpan.textContent,
                            phone: phoneSpan.textContent
                        })
                    });

                    if (!response.ok) throw new Error("Failed to update contact.");

                    console.log("Contact updated successfully");
                } catch (error) {
                    console.error("Error updating contact:", error);
                    alert("Failed to update contact. Please try again.");
                }
                */
            }
        } else if (target.classList.contains("delete-contact")) {
            console.log("Delete button clicked for:", contactId);
            if (confirm("Are you sure you want to delete this contact?")) {
                if (contactId.startsWith("placeholder-")) {
                    console.log("Deleting placeholder contact locally.");
                    contactCard.remove();
                } else {
                    /*
                    try {
                        const response = await fetch("delete.php", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ id: contactId })
                        });

                        if (!response.ok) throw new Error("Failed to delete contact.");

                        console.log("Contact deleted successfully");
                        fetchContacts();
                    } catch (error) {
                        console.error("Error deleting contact:", error);
                        alert("Failed to delete contact. Please try again.");
                    }
                    */
                }
            }
        }
    });

    // Search contacts
    searchInput.addEventListener("input", function () {
        const query = searchInput.value.toLowerCase();
        const contactCards = contactsGrid.querySelectorAll(".contact-card");

        contactCards.forEach(card => {
            const name = card.querySelector("h3").textContent.toLowerCase();
            card.style.display = name.includes(query) ? "block" : "none";
        });
    });

    // Initial fetch
    fetchContacts();
});
