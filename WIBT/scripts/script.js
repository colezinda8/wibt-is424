// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
//import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-analytics.js";
//import { getAuth } from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js'
const firebaseConfig = {
    apiKey: "AIzaSyABqmr8_UbI6eoET593lRbqvmB_XxUIIMY",
    authDomain: "wibt-website.firebaseapp.com",
    projectId: "wibt-website",
    storageBucket: "wibt-website.appspot.com",
    messagingSenderId: "620909080156",
    appId: "1:620909080156:web:4f81b6f258a535e833c099",
    measurementId: "G-YRG9SDJ7DN",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
let auth = firebase.auth();
let db = firebase.firestore();
//let db = firebase.firestore();
console.log(auth.currentUser);

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

//--------------------------------SIGN UP--------------------------------------------------------
function r_e(id) {
    return document.querySelector(`#${id}`);
}

let signinbtn = document.querySelector("#signinbtn");
let signin_modal = document.querySelector("#signin_modal");
let signin_modalbg = document.querySelector("#signin_modalbg");
let user_add = document.querySelector("#user_add");
let cancel_btn = document.querySelector("#cancel_btn");


signinbtn.addEventListener("click", () => {
    signin_modal.classList.add("is-active");
});


signin_modalbg.addEventListener("click", () => {
    signin_modal.classList.remove("is-active");
    r_e("signin_form").reset();
});

login_submit.addEventListener("click", (e) => {

    if (auth.currentUser) {
        auth.signOut().then(() => {

            console.log("ahahahahah");
        })
    } else {
        e.preventDefault();
        //alert('test');
        let email = r_e("email_").value;
        let password = r_e("password_").value;
        auth.signInWithEmailAndPassword(email, password).then((user) => {
            //console.log(`${user.user.email}  is created`);
            console.log(user);
        });
        //.catch(err => {
        //signup_modal.querySelector('.error').innerHTML = err.message;

        // })
    }
    signin_modal.classList.remove("is-active");
    r_e("signin_form").reset();
});

auth.onAuthStateChanged(function (user) {
    if (user) {
        console.log(user.email);
        r_e("signinbtn").innerHTML = user.email;
        user_add_div.classList.remove('is-hidden');
        email_bar.classList.add('is-hidden');
        password_bar.classList.add('is-hidden');
        r_e("login_submit").innerHTML = "Log Out";
        // eventbtn.classList.add("is-active");
    } else {
        r_e("signinbtn").innerHTML = `Admin Portal`;
        user_add_div.classList.add('is-hidden');
        email_bar.classList.remove('is-hidden');
        password_bar.classList.remove('is-hidden');
        r_e("login_submit").innerHTML = "Login";
        // eventbtn.classList.add("is-hidden");
    }
});

cancel_btn.classList.add('is-hidden');
var btn_counter = 0;
user_add.addEventListener("click", () => {
    if (btn_counter == 0) {
        submit_btn.classList.add('is-hidden');
        cancel_btn.classList.remove('is-hidden');
        email_bar.classList.remove('is-hidden');
        password_bar.classList.remove('is-hidden');
        btn_counter = 1;
    } else if (btn_counter == 1) {

        let email = r_e("email_").value;
        let password = r_e("password_").value;
        auth.createUserWithEmailAndPassword(email, password).then((user) => {
            //console.log(`${user.user.email}  is created`);
            console.log(user);
        });
        btn_counter = 0;
        signin_modal.classList.remove("is-active");
        r_e("signin_form").reset();
    }
});

cancel_btn.addEventListener("click", () => {
    submit_btn.classList.remove('is-hidden');
    cancel_btn.classList.add('is-hidden');
    email_bar.classList.add('is-hidden');
    password_bar.classList.add('is-hidden');
    btn_counter = 0;

});


//--------------------------------------EVENT MODAL-------------------------------------

// eventbtn.addEventListener("click", () => {
//     event_modal.classList.add("is-active");
// });

// event_modalbg.addEventListener("click", () => {
//     event_modal.classList.remove("is-active");
//     r_e("event_form").reset();
// });

// event_submit.addEventListener("click", () => {
//     let title = document.querySelector("#title").innerHTML;
//     let date = document.querySelector("#date").innerHTML;
//     let hour = document.querySelector("#hour").innerHTML;
//     let minute = document.querySelector("minute").innerHTML;
//     let ampm = document.querySelector("ampm").innerHTML;
//     let time = hour + " " + minute + " " + ampm;

//     let new_event = {
//         Title: title,
//         Date: date,
//         Time: time,
//     };
//     db.collection("events").add(new_event);

//     db.collection("events")
//         .get()
//         .then((response) => {
//             let element = response.docs;
//             element.forEach((e) => {
//                 console.log(e.data().Title);
//             });
//         });
// });

//--------------------------------------EVENTS LOADING-------------------------------------

function Events(ID) {
    db.collection("events")
        .get()
        .then((response) => {
            let eventCard = "";
            let element = response.docs;
            element.forEach((e) => {
                let title = e.data().Title;
                let titleNode = document.createTextNode(title);
                let date = e.data().Date;
                let dateNode = document.createTextNode(date);
                let eventElem = document.createElement("div");
                $(eventElem).addClass("event");
                let titleElem = document.createElement("div");
                $(titleElem).addClass("event-title");
                titleElem.appendChild(titleNode);
                eventElem.appendChild(titleElem);
                let dateElem = document.createElement("div");
                $(dateElem).addClass("event-date");
                dateElem.appendChild(dateNode);
                eventElem.appendChild(dateElem);
                console.log(ID);
                document.getElementById(ID).appendChild(eventElem);
            });
        });
}

Events("homeEvents");
//Events("#eventsEvents");
