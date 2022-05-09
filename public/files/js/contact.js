// import "https://smtpjs.com/v3/smtp.js";

const name = document.getElementById("form_name");
const email = document.getElementById("form_email");
const subject = document.getElementById("form_subject");
const msg = document.getElementById("form_msg");
const submit_btn = document.getElementById("form_submit_btn");
let name_value = "";
let email_value = "";
let subject_value = "";
let msg_value = "";

const error_name = document.getElementById("error_name");
const error_email = document.getElementById("error_email");
const error_subject = document.getElementById("error_subject");
const error_msg = document.getElementById("error_msg");
// const error_submit_btn = document.getElementById("form_submit_btn");

function validateForm() {
  if (name.value == "") {
    error_name.textContent = "Please enter your name";
    error_name.style.color = "red";
  } else {
    name_value = name.value;
    error_name.textContent = "";
  }

  if (email.value == "") {
    error_email.textContent = "Please enter your email";
    error_email.style.color = "red";
  } else {
    email_value = email.value;
    error_email.textContent = "";
    console.log(email_value);
  }

  if (subject.value == "") {
    error_subject.textContent = "Please enter your subject";
    error_subject.style.color = "red";
  } else {
    subject_value = subject.value;
    error_subject.textContent = "";
  }

  if (msg.value == "") {
    error_msg.textContent = "Please enter your message";
    error_msg.style.color = "red";
  } else {
    msg_value = msg.value;
    error_msg.textContent = "";
  }

  return [name_value, email_value, subject_value, msg_value];
}

function sendEmail() {
  email_details = validateForm();
  console.log("Inside send mail");
  Email.send({
    Host: "smtp.gmail.com",
    Username: "daipayan.sarkar.25@gmail.com",
    Password: "Your Gmail Password",
    To: "recipient_1_email_address, recipient_2_email_address",
    From: "sender’s email address",
    Subject: "email subject",
    Body: "email body",
  }).then((message) => alert("mail sent successfully"));
}

submit_btn.addEventListener("onsubmit", stopDefault);

function stopDefault(event) {
  event.preventDefault();
  console.log("It works");
}
