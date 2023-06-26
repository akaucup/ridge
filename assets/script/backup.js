import {
  nameData
} from './name.js';

let firstNameList = nameData.firstNameList;
let lastNameList = nameData.lastNameList;

const currentYear = new Date().getFullYear();
const yearElement = document.getElementById("year");
yearElement.textContent = currentYear;

function updateYear() {
  const newYear = new Date().getFullYear();
  if (newYear !== currentYear) {
    yearElement.textContent = newYear;
  }
}
setInterval(updateYear, 1000);

const getElementById = id => document.getElementById(id);
const querySelector = selector => document.querySelector(selector);

const inputNameList = getElementById("inputNameList");
const inputPassword = getElementById("inputPassword");
const inputProviderCode = getElementById("inputProviderCode");
const inputDate = querySelector('input[type="date"]');
const selectedDomain = getElementById("selectedDomain");
const providerCode = getElementById("providerCode");
const resultData = getElementById("resultData");

const buttonIds = [
  "btnCopyFName",
  "btnCopyLName",
  "btnCopyUname",
  "btnCopyEmail",
  "btnCopyPassword",
  "btnCopyPhone",
  "btnCopyDate",
  "btnCopyMonth",
  "btnCopyAll",
  "btnCopyYear"];
const buttons = buttonIds.reduce((acc, id) => {
  acc[id] = getElementById(id);
  return acc;
}, {});


// Generate random Date
function randomDob() {
  const minDate = new Date('01/01/1960');
  const maxDate = new Date('12/31/2005');
  const randomDate = new Date(minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime()));
  const formattedDate = randomDate.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });

  const [month, day, year] = formattedDate.split('/');

  let dateStr = ("0" + day).slice(-2);
  let monthStr = ("0" + month).slice(-2);
  let yearStr = year;

  return `${yearStr}-${monthStr}-${dateStr}`;
}

function randomPassword(length) {
  let password = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";

  for (let i = 0; i < length; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return password;
}
window.onload = function () {
  // Mengambil data dari localStorage dan menambahkannya ke dalam tabel
  const dataList = JSON.parse(localStorage.getItem("dataList")) || [];
  dataList.forEach(function (data) {
    addToTable(data);
  });
}

function addToTable(data) {
  const table = document.getElementById("outputTable").getElementsByTagName("tbody")[0];
  const newRow = table.insertRow();

  newRow.insertCell(0).innerHTML = data.name;
  newRow.insertCell(1).innerHTML = data.username;
  newRow.insertCell(2).innerHTML = data.dob;
  newRow.insertCell(3).innerHTML = data.email;
  newRow.insertCell(4).innerHTML = data.phone;
  newRow.insertCell(5).innerHTML = data.password;

  newRow.classList.add("odd:bg-white", "even:bg-slate-200");

  let dataList = JSON.parse(localStorage.getItem("dataList")) || [];

  dataList = dataList.filter(function (oldData) {
    return oldData.username !== data.username;
  });

  dataList.push(data);
  localStorage.setItem("dataList", JSON.stringify(dataList));

  const dataCount = dataList.length;
  const dataCountElement = document.getElementById("dataCount");
  dataCountElement.textContent = dataCount;
}

let counter = 1; // Counter untuk nomor ID

function generateData() {
  let yearStr, monthStr, dateStr;
  if (inputDate.value) {
    const selectedDate = new Date(inputDate.value);
    const formattedDate = selectedDate.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
    const [month, day, year] = formattedDate.split('/');
    dateStr = ("0" + day).slice(-2);
    monthStr = ("0" + month).slice(-2);
    yearStr = year;
  } else {
    // Menghasilkan nilai acak
    const dob = randomDob();
    [yearStr, monthStr, dateStr] = dob.split('-');
  }

  //Generate Name
  if (inputNameList.value.trim() !== "") {
    firstNameList = inputNameList.value.trim().split(/\n/);
    lastNameList = inputNameList.value.trim().split(/\n/);
  }

  const randomFirstName = firstNameList[Math.floor(Math.random() * firstNameList.length)];
  const randomLastName = lastNameList[Math.floor(Math.random() * lastNameList.length)];


  function limitInputLength(event, maxLength) {
    const input = event.target;
    let inputValue = input.value;
    const regex = /^[0-9]{0,3}$/; // Regex untuk membatasi hanya angka dengan panjang maksimal 3 digit

    if (!regex.test(inputValue)) {
      inputValue = inputValue.slice(0, maxLength); // Potong input menjadi 3 digit
      input.value = inputValue;
    }
  }

  let inputProviderCode = document.getElementById("providerCode").value;
  if (inputProviderCode === "") {
    inputProviderCode = "812"; // set default value
  }

  const isNumeric = /^[0-9]+$/.test(inputProviderCode); // validasi input
  if (!isNumeric) {
    alert("USE NUMBERS ONLY");
    return;
  }

  if (inputProviderCode.length > 3) {
    inputProviderCode = inputProviderCode.slice(0, 3); // Potong menjadi 3 digit jika lebih dari 3 digit
  }

  const randomNumber = Math.floor(Math.random() * 100000000);
  const phoneNumber =
    "62" + inputProviderCode + randomNumber.toString().padStart(7, "0");


  let password = inputPassword.value.trim();
  if (password === "") {
    password = randomPassword(8);
  }

  let dob = `${monthStr}/${dateStr}/${yearStr}`;
  const uniqueId = counter;
  let firstName = randomFirstName;
  let lastName = randomLastName;
  let randomUsername = (randomFirstName + randomLastName).toLowerCase().replace(/[^a-z]/g, "") + Math.random().toString(36).substring(2, 6);
  let domain = selectedDomain.value;
  let email = randomUsername + domain;
  let phone = phoneNumber;
  let fullname = firstName + " " + lastName;

  const resultData = document.getElementById("resultData")
  resultData.innerText = fullname + "|" + randomUsername + "|" + email + "|" + dob + "|" + phone + "|" + password;

  const outputTable = document.getElementById("outputTable");
  const dataTable = document.getElementById("dataTable");
  const newRow = dataTable.insertRow(-1);
  const nameCell = newRow.insertCell(0);
  const usernameCell = newRow.insertCell(1);
  const dobCell = newRow.insertCell(2);
  const emailCell = newRow.insertCell(3);
  const phoneNumberCell = newRow.insertCell(4);
  const passwordCell = newRow.insertCell(5);
  const data = {

    name: fullname,
    username: randomUsername,
    dob: dob,
    email: email,
    phone: phone,
    password: password
  }

  nameCell.innerHTML = fullname;
  usernameCell.innerHTML = randomUsername;
  dobCell.innerHTML = dob;
  emailCell.innerHTML = email;
  phoneNumberCell.innerHTML = phoneNumber;
  passwordCell.innerHTML = password;

  newRow.classList.add("odd:bg-white", "even:bg-slate-200");

  const dataList = JSON.parse(localStorage.getItem("dataList")) || [];
  dataList.push(data);
  localStorage.setItem("dataList", JSON.stringify(dataList));

  const btnCopyList = [{
    id: "btnCopyFName",
    text: firstName
  },
  {
    id: "btnCopyUname",
    text: randomUsername
  },
  {
    id: "btnCopyLName",
    text: lastName
  },
  {
    id: "btnCopyEmail",
    text: email
  },
  {
    id: "btnCopyPassword",
    text: password
  },
  {
    id: "btnCopyDate",
    text: dateStr
  },
  {
    id: "btnCopyMonth",
    text: monthStr
  },
  {
    id: "btnCopyYear",
    text: yearStr
  },
  {
    id: "btnCopyPhone",
    text: phone
  },
  ];

  btnCopyList.forEach((btnCopy) => {
    const btn = document.getElementById(btnCopy.id);
    btn.addEventListener("click", () => {
      navigator.clipboard.writeText(btnCopy.text);
    });
  });

  btnCopyAll.addEventListener("click", () => {
    let resultData = document.getElementById("resultData");
    resultData.select();
    document.execCommand("copy");
  });

  const dataCount = dataList.length;
  const dataCountElement = getElementById("dataCount");

  dataCountElement.textContent = dataCount;

}

const btnClearHistory = document.getElementById("btnClearHistory");

btnClearHistory.addEventListener("click", function () {
  localStorage.removeItem("dataList");
  setTimeout(() => {
    location.reload();
  }, 2000);
});

const btnGenerate = document.getElementById("btnGenerate");
btnGenerate.addEventListener("click", generateData);

function onSubmit(token) {
  document.getElementById("messageForm").submit();
}