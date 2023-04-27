// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCtCVG7aHc8mqYUa61X3MejlUYHQSYApgM",
//   authDomain: "wibt-60aff.firebaseapp.com",
//   projectId: "wibt-60aff",
//   storageBucket: "wibt-60aff.appspot.com",
//   messagingSenderId: "157489052248",
//   appId: "1:157489052248:web:e2c63c229bec07d174e82d"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// Import the functions you need from the SDKs you need




function updateNavLinks() {
    let urlParts = window.location.href.split("/");
    let pageName = urlParts[urlParts.length - 1].replace(".html", "");
    $("#" + pageName).addClass("active");
}

$(document).ready(function () {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function () {
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
    });
    updateNavLinks();
});

function myFunc(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

var UC = 0;
r_e('index').onload = UserCheck();

function r_e(id) {
    return document.querySelector(`#${id}`)
}
let signinbtn = document.querySelector('#signinbtn');
let signin_modal = document.querySelector('#signin_modal');
let signin_modalbg = document.querySelector('#signin_modalbg');


login_submit.addEventListener('click', (e) => {

    e.preventDefault();
    //alert('test');

    let email = r_e("email_").value;
    let password = r_e("password_").value;
    auth.createUserWithEmailAndPassword(email, password).then((user) => {

        //console.log(`${user.user.email}  is created`);
        console.log(user);
    })
    //.catch(err => {
    //signup_modal.querySelector('.error').innerHTML = err.message;

    // })
    signin_modal.classList.remove('is-active');
    //console.log("hello");
    r_e('signinbtn').innerHTML = `Log Out`;
    //r_e('user_add').innerHTML = `Add User`;
    UC = 1;
    r_e('signin_form').reset();
});


function UserCheck() {
    if (UC == 0) {
        r_e('signinbtn').innerHTML = `Admin Portal`
        //        user_add_div.classList.add('is-hidden');
    } else if (UC == 1) {
        r_e('signinbtn').innerHTML = `Log Out`
        //      user_add_div.classList.remove('is-hidden');
    }
};

var UC = 0;
r_e("index").onload = UserCheck();

function r_e(id) {
    return document.querySelector(`#${id}`);
}

login_submit.addEventListener("click", () => {
    signin_modal.classList.remove("is-active");
    eventbtn.classList.remove("is-hidden");
    r_e("signin_form").reset();
    console.log("hello");
    r_e("signinbtn").innerHTML = `Log Out`;
    UC = 1;
    console.log(UC);
});

let signinbtn = document.querySelector("#signinbtn");
let signin_modal = document.querySelector("#signin_modal");
let signin_modalbg = document.querySelector("#signin_modalbg");

login_submit.addEventListener("click", (e) => {
    e.preventDefault();
    //alert('test');

    //    let email = r_e("email_").value;
    //    let password = r_e("password_").value;
    //    firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {

    //console.log(`${user.user.email}  is created`);
    //        console.log(user);
    //    })
    //.catch(err => {
    //signup_modal.querySelector('.error').innerHTML = err.message;

    // })
    signin_modal.classList.remove("is-active");
    //console.log("hello");
    r_e("signinbtn").innerHTML = `Log Out`;
    //r_e('user_add').innerHTML = `Add User`;
    UC = 1;
    r_e("signin_form").reset();
});

function UserCheck() {
    if (UC == 0) {
        r_e("signinbtn").innerHTML = `Admin Portal`;
        user_add_div.classList.add("is-hidden");
    } else if (UC == 1) {
        r_e("signinbtn").innerHTML = `Log Out`;
        user_add_div.classList.remove("is-hidden");
    }
}


//let email = r_e("email_").value;
//let password = r_e("password_").value;
//auth.signInWithEmailAndPassword(email, password).then((user) => {

//console.log(`${user.user.email}  is created`);

//configure_message_bar(`${user.user.email}  is signed in`);
//r_e('signin_form').reset();
//r_e('signin_modal').classList.remove('is-active');

//}).catch(err => {
//signin_modal.querySelector('.error').innerHTML = err.message;

//r_e('signup_form').requestFullscreen();
//or

signinbtn.addEventListener("click", () => {
    if (r_e("signinbtn").innerHTML == "Admin Portal") {
        signin_modal.classList.add("is-active");
    } else if (r_e("signinbtn").innerHTML == "Log Out") {
        r_e("signinbtn").innerHTML = `Admin Portal`;
        eventbtn.classList.add("is-hidden");
        UC = 0;
    }
});

signin_modalbg.addEventListener("click", () => {
    signin_modal.classList.remove("is-active");
    r_e("signin_form").reset();
});

eventbtn.addEventListener("click", () => {
    event_modal.classList.add("is-active");
});

event_modalbg.addEventListener("click", () => {
    event_modal.classList.remove("is-active");
    r_e("event_form").reset();
});

///user sign in

//firebase.auth().createUserWithEmailAndPassword(email, password)
//  .then((userCredential) => {
// Signed in
//    var user = userCredential.user;
// ...
//})