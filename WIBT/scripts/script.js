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

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
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
console.log(auth);

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
r_e("index").onload = UserCheck();

function r_e(id) {
  return document.querySelector(`#${id}`);
}
let signinbtn = document.querySelector("#signinbtn");
let signin_modal = document.querySelector("#signin_modal");
let signin_modalbg = document.querySelector("#signin_modalbg");
let eventbtn = document.querySelector("#eventbtn");
let event_modal = document.querySelector("#event_modal");

login_submit.addEventListener("click", (e) => {
  e.preventDefault();
  //alert('test');

  let email = r_e("email_").value;
  let password = r_e("password_").value;
  auth.createUserWithEmailAndPassword(email, password).then((user) => {
    //console.log(`${user.user.email}  is created`);
    console.log(user);
  });
  //.catch(err => {
  //signup_modal.querySelector('.error').innerHTML = err.message;

  // })
  signin_modal.classList.remove("is-active");
  //console.log("hello");
  r_e("signinbtn").innerHTML = `Log Out`;
  eventbtn.classList.add("is-active");
  //r_e('user_add').innerHTML = `Add User`;
  UC = 1;
  r_e("signin_form").reset();
});

function UserCheck() {
  if (UC == 0) {
    r_e("signinbtn").innerHTML = `Admin Portal`;
    //        user_add_div.classList.add('is-hidden');
  } else if (UC == 1) {
    r_e("signinbtn").innerHTML = `Log Out`;
    eventbtn.classList.add("is-active");
    //      user_add_div.classList.remove('is-hidden');
  }
}

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

// eventbtn.addEventListener("click", () => {
//   event_modal.classList.add("is-active");
// });

// event_modalbg.addEventListener("click", () => {
//   event_modal.classList.remove("is-active");
//   r_e("event_form").reset();
// });

///user sign in

//firebase.auth().createUserWithEmailAndPassword(email, password)
//  .then((userCredential) => {
// Signed in
//    var user = userCredential.user;
// ...
//})

// event_submit.addEventListener("click", () => {
//   let title = document.querySelector("#title").innerHTML;
//   let date = document.querySelector("#date").innerHTML;
//   let hour = document.querySelector("#hour").innerHTML;
//   let minute = document.querySelector("minute").innerHTML;
//   let ampm = document.querySelector("ampm").innerHTML;
//   let time = hour + " " + minute + " " + ampm;

//   let new_event = {
//     Title: title,
//     Date: date,
//     Time: time,
//   };
//   db.collection("events").add(new_event);

//   db.collection("events")
//     .get()
//     .then((response) => {
//       let element = response.docs;
//       element.forEach((e) => {
//         console.log(e.data().Title);
//       });
//     });
// });
// let homeEvents = document.querySelector("#homeEvents");
// let eventsEvents = document.querySelector("#eventsEvents");
// let previousSpeakers = document.querySelector("#previousSpeakers");

// function eventsEvents1(ID) {
//   db.collection("INSERTNAME")
//     .get()
//     .then((response) => {
//       let eventCard = "";
//       let element = response.docs;
//       element.forEach((e) => {
//         let title = e.data().TITLE;
//         let time = e.data().TIME;
//         eventCard += `<div class="mini-card">`;
//         eventCard += `<p class="mini-card-title">${title}</p>`;
//         eventCard += `<div class="event-date">${time}</div>`;
//         eventCard += `</div>`;
//         document.querySelector(ID).innerHTML = eventCard;
//       });
//     });
// }

// function eventsEvents2() {
//   let eventCard = "";
//   eventCard += `<div class="mini-card">`;
//   eventCard += `<p class="mini-card-title">test</p>`;
//   eventCard += `<div class="event-date">test</div>`;
//   eventCard += `</div>`;
//   document.querySelector("#homeEventsTest").innerHTML = eventCard;
// }
// eventsEvents2();

// function previousSpeakers1() {
//   db.collection("INSERTNAME")
//     .get()
//     .then((response) => {
//       let speakerCard = "";
//       let element = response.docs;
//       let semester = [];
//       element.forEach((e) => {
//         let image = e.data().IMAGE;
//         let name = e.data().NAME;
//         let position = e.data().POSITION;
//         let comp = e.data().COMPANY;
//         let sem = e.data().SEMESTER;
//         if (semester.includes(sem)) {
//           speakerCard += `<div class="row">`;
//           speakerCard += `<div class="speaker-card">`;
//           speakerCard += `<img class="speaker-image" src="${image}" alt="Headshot">`;
//           speakerCard += `<div class="speaker-name">${name}</div>`;
//           speakerCard += `<div class="speaker-position">${position}</div>`;
//           speakerCard += `<div class="speaker-company">${comp}</div>`;
//           speakerCard += `</div>`;
//           speakerCard += `</div>`;
//           let currentSemStr = "#" + sem;
//           let currentSem = document.querySelector(currentSemStr);
//           document.querySelector(currentSem).innerHTML = speakerCard;
//         } else {
//           semester.push("semester");
//           speakerCard += `<div id="${sem}">`;
//           speakerCard += `<h2 class="section-title">${sem}</h2>`;
//           speakerCard += `<div class="row">`;
//           speakerCard += `<div class="speaker-card">`;
//           speakerCard += `<img class="speaker-image" src="${image}" alt="Headshot">`;
//           speakerCard += `<div class="speaker-name">${name}</div>`;
//           speakerCard += `<div class="speaker-position">${position}</div>`;
//           speakerCard += `<div class="speaker-company">${comp}</div>`;
//           speakerCard += `</div>`;
//           speakerCard += `</div>`;
//           speakerCard += `</div>`;
//           document.querySelector("#previousSpeakers").innerHTML = speakerCard;
//         }
//       });
//     });
// }

let semesters = [];
let elementExists = document.getElementsByTagName("h2");
for (let item of elementExists) {
  semesters.push(item.innerHTML);
}
for (item in semesters) {
  console.log(semesters[item]);
}
console.log(semesters.includes("Fall 2021"));
let a = "Spring";
let b = "Fall";

console.log(a > b);

const s = "2022";
const s1 = "2021";
const d = new Date(s);
const d1 = new Date(s1);
console.log(d);
console.log(d1);
console.log(d > d1);

let c = "Spring 2023";
c = c.split(" ");
console.log(c);
// origin / dynamic;

// let homeEvents = document.querySelector("#homeEvents");
// let eventsEvents = document.querySelector("#eventsEvents");
// let previousSpeakers = document.querySelector("#previousSpeakers");
//delete document

function eventsEvents1(ID) {
  db.collection("events")
    .get()
    .then((response) => {
      let eventCard = "";
      let element = response.docs;
      element.forEach((e) => {
        let title = e.data().Title;
        let time = e.data().Time;
        let date = e.data().Date;
        eventCard += `<div class="mini-card">`;
        eventCard += `<p class="mini-card-title">${title}</p>`;
        eventCard += `<div class="event-date"><b>${time}</b>&nbsp&nbsp&nbsp${date}</div>`;
        eventCard += `<p><button class="button is-small is-rounded delete-button m-0" onclick = "del_doc('${e.id}')"><i class="fas fa-ban"></i></button><button class="button is-small is-rounded m-0" onclick = "edit_doc('${e.id}1')"><i class="fas fa-pencil"></i></button></p>`;
        eventCard += `</div>`;
        document.querySelector(ID).innerHTML = eventCard;
      });
    });
}
// //create editing
// function edit_doc(id1) {
//   event_modal.classList.add("is-active");
//   db.collection("events")
//     .where(id, "==", id1)
//     .get()
//     .then((response) => {
//       let e = response.docs;
//       let title = e.data().Title;
//       let time = e.data().Time;
//       let date = e.data().Date;
//       let newTime = time.split(" ");
//       document.querySelector("#title").innerHTML = title;
//       document.querySelector("#date").innerHTML = date;
//       document.querySelector("#hour").innerHTML = newTime[0];
//       document.querySelector("minute").innerHTML = newTime[1];
//       document.querySelector("ampm").innerHTML = newTime[2];
//     });
// }
// // edit_doc("mEokhz4zCIpNBY9MXrq7");
// //onclick deletion function
// function del_doc(id) {
//   db.collection("events")
//     .doc(id)
//     .delete()
//     .then(() => {
//       console.log("deleted event");
//     });
// }

eventsEvents1("#homeEventsTest");

function eventsEvents2() {
  let eventCard = "";
  eventCard += `<div class="mini-card">`;
  eventCard += `<p class="mini-card-title">test</p>`;
  eventCard += `<div class="event-date">test</div>`;
  eventCard += `</div>`;
  console.log(eventCard);
  document.querySelector("#homeEventsTest").innerHTML = eventCard;
}

function previousSpeakers1() {
  db.collection("INSERTNAME")
    .get()
    .then((response) => {
      let speakerCard = "";
      let element = response.docs;
      let semester = [];
      element.forEach((e) => {
        let image = e.data().IMAGE;
        let name = e.data().NAME;
        let position = e.data().POSITION;
        let comp = e.data().COMPANY;
        let sem = e.data().SEMESTER;
        if (semester.includes(sem)) {
          speakerCard += `<div class="row">`;
          speakerCard += `<div class="speaker-card">`;
          speakerCard += `<img class="speaker-image" src="${image}" alt="Headshot">`;
          speakerCard += `<div class="speaker-name">${name}</div>`;
          speakerCard += `<div class="speaker-position">${position}</div>`;
          speakerCard += `<div class="speaker-company">${comp}</div>`;
          speakerCard += `</div>`;
          speakerCard += `</div>`;
          let currentSemStr = "#" + sem;
          let currentSem = document.querySelector(currentSemStr);
          document.querySelector(currentSem).innerHTML = speakerCard;
        } else {
          semester.push("semester");
          speakerCard += `<div id="${sem}">`;
          speakerCard += `<h2 class="section-title">${sem}</h2>`;
          speakerCard += `<div class="row">`;
          speakerCard += `<div class="speaker-card">`;
          speakerCard += `<img class="speaker-image" src="${image}" alt="Headshot">`;
          speakerCard += `<div class="speaker-name">${name}</div>`;
          speakerCard += `<div class="speaker-position">${position}</div>`;
          speakerCard += `<div class="speaker-company">${comp}</div>`;
          speakerCard += `</div>`;
          speakerCard += `</div>`;
          speakerCard += `</div>`;
          document.querySelector("#previousSpeakers").innerHTML = speakerCard;
        }
      });
    });
}

// let semesters = [];
// let elementExists = document.getElementsByTagName("h2");
// for (let item of elementExists) {
//   semesters.push(item.innerHTML);
// }
// for (item in semesters) {
//   console.log(semesters[item]);
// }
// console.log(semesters.includes("Fall 2021"));
// let a = "Spring";
// let b = "Fall";

// console.log(a > b);

// const s = "2022";
// const s1 = "2021";
// const d = new Date(s);
// const d1 = new Date(s1);
// console.log(d);
// console.log(d1);
// console.log(d > d1);

// let c = "Spring 2023";
// c = c.split(" ");
// console.log(c); >>>
// >>>
// >
// origin / dynamic}

eventbtn.addEventListener("click", () => {
  event_modal.classList.add("is-active");
});

event_modalbg.addEventListener("click", () => {
  event_modal.classList.remove("is-active");
  r_e("event_form").reset();
});

//add new events
event_submit.addEventListener("click", () => {
  let title = document.querySelector("#title").innerHTML;
  let date = document.querySelector("#date").innerHTML;
  let hour = document.querySelector("#hour").innerHTML;
  let minute = document.querySelector("#minute").innerHTML;
  let ampm = document.querySelector("#ampm").innerHTML;
  let time = hour + " " + minute + " " + ampm;

  let new_event = {
    Title: title,
    Date: date,
    Time: time,
  };
  db.collection("events").add(new_event);

  db.collection("events")
    .get()
    .then((response) => {
      let element = response.docs;
      element.forEach((e) => {
        console.log(e.data().Title);
      });
    });
});

//create editing
function edit_doc(id1) {
  event_modal.classList.add("is-active");
  db.collection("events")
    .where(id, "==", id1)
    .get()
    .then((response) => {
      let e = response.docs;
      let title = e.data().Title;
      let time = e.data().Time;
      let date = e.data().Date;
      let newTime = time.split(" ");
      document.querySelector("#title").innerHTML = title;
      document.querySelector("#date").innerHTML = date;
      document.querySelector("#hour").innerHTML = newTime[0];
      document.querySelector("minute").innerHTML = newTime[1];
      document.querySelector("ampm").innerHTML = newTime[2];
    });
  db.collection("events")
    .doc(id)
    .delete()
    .then(() => {
      console.log("Previous event has been deleted");
    });
}
function del_doc(id) {
  db.collection("events")
    .doc(id)
    .delete()
    .then(() => {
      console.log("deleted event");
    });
}
