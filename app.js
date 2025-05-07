const users = JSON.parse(localStorage.getItem('usersdata')) || [];
console.log(users);

function displayUsers() {
      tbody.innerHTML = 'No Data Found';
      users.forEach((user, index) => {
        tbody.innerHTML = '';
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${user.username}</td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.address}</td>
          <td>${user.mobile}</td>
        `;
        tbody.appendChild(row);
      });
  }

const formdata = document.querySelector("#userForm");
console.log(formdata);
const tbody = document.querySelector('#table-part tbody');
//console.log(tbody);
formdata.addEventListener('submit', function(event) {

    event.preventDefault(); 

   let user ={
        username : document.getElementById('username').value,
        name : document.getElementById('name').value,
        email : document.getElementById('email').value,    
        address : document.getElementById('address').value,   
        mobile : document.getElementById('mobile').value
   }

    if (user.username && user.name && user.email && user.address && user.mobile) {
        let localData = JSON.parse(localStorage.getItem('usersdata')) || [];
        localData.push(user);
        localStorage.setItem('usersdata', JSON.stringify(localData));
        location.reload();
        displayUsers()
        formdata.reset();
    } else {
        alert("Please fill all fields");
    }
});
displayUsers();