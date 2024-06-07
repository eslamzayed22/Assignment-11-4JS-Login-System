let clientName = document.getElementById("clientName");
let clientEmail = document.getElementById("clientEmail");
let clientPassword = document.getElementById("clientPassword");
let signinEmail = document.getElementById("signinEmail");
let signinPassword = document.getElementById("signinPassword");
let clientList = [];
// ----------------sign up--------------
if (localStorage.getItem("client") !== null) {
  clientList = JSON.parse(localStorage.getItem("client"));
} else {
  clientList = [];
}
function noInputsOut() {
  if (clientName.value == "" || clientEmail.value == "" || clientPassword.value == "") {
      return false
  } else {
      return true
  }
}
// add client
function addClient() {
  let noInfo = document.getElementById("noInfo");
  if (noInputsOut() == false) {
    noInfo.classList.remove("d-none");
    return false
} else {
  noInfo.classList.add("d-none");
}
  let success = document.getElementById("success");
  if (validateClientName() && validateClientEmail() && validateClientPassword()) {
    let client = {
      name: clientName.value,
      email: clientEmail.value,
      password: clientPassword.value,
    };
    clientList.push(client);
    localStorage.setItem("client", JSON.stringify(clientList));
    success.classList.remove("d-none");
  }
}
// validation for client name
function validateClientName() {
  let regex = /^[A-Z][a-z]{1,20}$/;
  let nameError = document.getElementById("nameError");
  if (regex.test(clientName.value)) {
    clientName.classList.add("is-valid");
    clientName.classList.remove("is-invalid");
    nameError.classList.add("d-none");
    return true;
  } else {
    clientName.classList.add("is-invalid");
    clientName.classList.remove("is-valid");
    nameError.classList.remove("d-none");
    return false;
  }
}
// validation for client email
function validateClientEmail() {
  let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  let emailError = document.getElementById("emailError");
  if (regex.test(clientEmail.value)) {
    clientEmail.classList.add("is-valid");
    clientEmail.classList.remove("is-invalid");
    emailError.classList.add("d-none");
    return true;
  } else {
    clientEmail.classList.add("is-invalid");
    clientEmail.classList.remove("is-valid");
    emailError.classList.remove("d-none");
    return false;
  }
}
// validation for client Password
function validateClientPassword() {
  let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  let passwordError = document.getElementById("passwordError");
  if (regex.test(clientPassword.value)) {
    clientPassword.classList.add("is-valid");
    clientPassword.classList.remove("is-invalid");
    passwordError.classList.add("d-none");
    return true;
  } else {
    clientPassword.classList.add("is-invalid");
    clientPassword.classList.remove("is-valid");
    passwordError.classList.remove("d-none");
    return false;
  }
}

// --------------sign in--------------------
function noInputsIn() {
  if (signinEmail.value == "" || signinPassword.value == "") {
      return false
  } else {
      return true
  }
}
function login() {
  let noInfo = document.getElementById("noInfo");
    if (noInputsIn() == false) {
      noInfo.classList.remove("d-none");
      return false
  } else {
    noInfo.classList.add("d-none");
  }
  let storedClients = JSON.parse(localStorage.getItem("client"));
  let email = signinEmail.value
  let password = signinPassword.value
  let infoError = document.getElementById("infoError");
  for (let i = 0; i < clientList.length; i++) {
      if (clientList[i].email == email && clientList[i].password == password) {
          localStorage.setItem('currentName', clientList[i].name)
          if (storedClients) {
              window.location.href = "./home.html";
          } else {
            infoError.classList.remove("d-none");
          }
      } else {
        infoError.classList.remove("d-none");
      }
  }
}
// -------------welcome------------------
let username = localStorage.getItem('currentName')
if (username) {
    document.getElementById('welcome').innerHTML = `<h1 class="text-center mb-3">Welcome ${username}</h1>`
}