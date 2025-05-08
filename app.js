const users = JSON.parse(localStorage.getItem('usersdata')) || [];
console.log(users);

function displayUsers() {
    tbody.innerHTML = '';
    
    if (users.length === 0) {
        const noDataRow = document.createElement('tr');
        noDataRow.innerHTML = '<td colspan="6" class="no-data">No Data Found</td>';
        tbody.appendChild(noDataRow);
        return;
    }

    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.username}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.address}</td>
            <td>${user.mobile}</td>
            <td>
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Add event listeners for edit and delete buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', handleEdit);
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', handleDelete);
    });
}

const formdata = document.querySelector("#userForm");
console.log(formdata);
const tbody = document.querySelector('#table-part tbody');
//console.log(tbody);

const loadingIndicator = document.createElement('div');
loadingIndicator.className = 'loading';
loadingIndicator.textContent = 'Loading...';

// Utility functions
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validateMobile = (mobile) => {
    const re = /^[0-9]{11}$/;
    return re.test(mobile);
};

const showError = (message) => {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    formdata.insertBefore(errorDiv, formdata.firstChild);
    setTimeout(() => errorDiv.remove(), 3000);
};

const showSuccess = (message) => {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    formdata.insertBefore(successDiv, formdata.firstChild);
    setTimeout(() => successDiv.remove(), 3000);
};

// Handle form submission
formdata.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const user = {
        username: document.getElementById('username').value.trim(),
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        address: document.getElementById('address').value.trim(),
        mobile: document.getElementById('mobile').value.trim()
    };

    // Validation
    if (!user.username || !user.name || !user.email || !user.address || !user.mobile) {
        showError("Please fill all fields");
        return;
    }

    if (!validateEmail(user.email)) {
        showError("Please enter a valid email address");
        return;
    }

    if (!validateMobile(user.mobile)) {
        showError("Please enter a valid 10-digit mobile number");
        return;
    }

    try {
        // Show loading state
        formdata.appendChild(loadingIndicator);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const localData = JSON.parse(localStorage.getItem('usersdata')) || [];
        localData.push(user);
        localStorage.setItem('usersdata', JSON.stringify(localData));
        
        showSuccess("User registered successfully!");
        formdata.reset();
        displayUsers();
        location.reload();
    } catch (error) {
        showError("An error occurred while saving the data");
        console.error(error);
    } finally {
        loadingIndicator.remove();
    }
});

// Handle edit
function handleEdit(event) {
    const index = event.target.dataset.index;
    const user = users[index];
    
    document.getElementById('username').value = user.username;
    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('address').value = user.address;
    document.getElementById('mobile').value = user.mobile;

    // Remove the old user
    users.splice(index, 1);
    localStorage.setItem('usersdata', JSON.stringify(users));
    displayUsers();
}

// Handle delete
function handleDelete(event) {
    if (confirm('Are you sure you want to delete this user?')) {
        const index = event.target.dataset.index;
        users.splice(index, 1);
        localStorage.setItem('usersdata', JSON.stringify(users));
        displayUsers();
        showSuccess("User deleted successfully!");
    }
}

// Initial display
displayUsers();