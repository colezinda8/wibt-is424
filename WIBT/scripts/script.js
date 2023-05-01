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
firebase.initializeApp(firebaseConfig);
let auth = firebase.auth();
let db = firebase.firestore();

// Initialize Page Variables
let urlArray = window.location.href.split('/');
let pageName = urlArray[urlArray.length - 1];

$(document).ready(function () {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function () {
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
    });
    updateNavLinks();
});

//--------------------------------NAVBAR FUNCTIONALITY-------------------------

function updateNavLinks() {
    let urlParts = window.location.href.split("/");
    let pageName = urlParts[urlParts.length - 1].replace(".html", "");
    $("#" + pageName).addClass("active");
}

function myFunc(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

//--------------------------------SIGN UP FUNCTIONALITY------------------------
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
        reloadEvents();
        // eventbtn.classList.add("is-active"); !!!!!!!UNDO BEFORE COMMITTING!!!!!!!!!!
    } else {
        r_e("signinbtn").innerHTML = `Admin Portal`;
        user_add_div.classList.add('is-hidden');
        email_bar.classList.remove('is-hidden');
        password_bar.classList.remove('is-hidden');
        r_e("login_submit").innerHTML = "Login";
        reloadEvents();
        // eventbtn.classList.add("is-hidden"); !!!!!!!UNDO BEFORE COMMITTING!!!!!!!!!!
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


//------------------------EVENT EDITING & CREATING MODAL-----------------------

// eventbtn.addEventListener("click", () => {
//     event_modal.classList.add("is-active");
// });

// if (pageName == "index.html" || pageName == "events.html") {
//     document.getElementById("#event_modalbg").addEventListener("click", () => {
//         event_modal.classList.remove("is-active");
//         r_e("event_form").reset();
//     });
// }

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

//create editing
function edit_doc(id1) {
    event_modal.classList.add("is-active");
    db.collection("events")
        .where(id, "==", id1)
        .get()
        .then((response) => {
            reloadEvents();
            // let e = response.docs;
            // let title = e.data().Title;
            // let time = e.data().Time;
            // let date = e.data().Date;
            // let newTime = time.split(" ");
            // document.querySelector("#title").innerHTML = title;
            // document.querySelector("#date").innerHTML = date;
            // document.querySelector("#hour").innerHTML = newTime[0];
            // document.querySelector("minute").innerHTML = newTime[1];
            // document.querySelector("ampm").innerHTML = newTime[2];
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
            reloadEvents();
        });
}

//-------------------------EVENTS LOADING FUNCTIONALITY------------------------

function loadEvents(ID) {
    db.collection("events")
        .get()
        .then((response) => {
            let eventCard = "";
            let element = response.docs;
            element.forEach((e) => {
                // create event
                let eventElem = document.createElement("div");
                $(eventElem).addClass("event");
                // create title
                let title = e.data().Title;
                let titleNode = document.createTextNode(title);
                let titleElem = document.createElement("div");
                $(titleElem).addClass("event-title");
                titleElem.appendChild(titleNode);
                eventElem.appendChild(titleElem);
                // create date
                let date = e.data().Date + " " + e.data().Time;
                let dateNode = document.createTextNode(date);
                let dateElem = document.createElement("div");
                $(dateElem).addClass("event-date");
                dateElem.appendChild(dateNode);
                eventElem.appendChild(dateElem);
                // only show edit & delete buttons if user is logged in
                if (auth.currentUser) {
                    // create buttons wrapper
                    let buttonWrapperElem = document.createElement("div");
                    // create delete button
                    let deleteButtonElem = document.createElement("button");
                    $(deleteButtonElem).addClass("button is-small is-rounded delete-button m-0");
                    $(deleteButtonElem).attr("id", e.id);
                    let deleteIconElem = document.createElement("i");
                    $(deleteIconElem).addClass("fas fa-ban");
                    deleteButtonElem.appendChild(deleteIconElem);
                    $(deleteButtonElem).click(function () {
                        let id = $(this).attr("id");
                        console.log(id);
                        del_doc(id);
                    });
                    buttonWrapperElem.appendChild(deleteButtonElem);
                    // create edit button
                    let editButtonElem = document.createElement("button");
                    $(editButtonElem).addClass("button is-small is-rounded delete-button m-0");
                    $(editButtonElem).attr("id", e.id);
                    let editIconElem = document.createElement("i");
                    $(editIconElem).addClass("fas fa-pencil");
                    editButtonElem.appendChild(editIconElem);
                    $(editButtonElem).click(function () {
                        let id = $(this).attr("id");
                        edit_doc(id);
                    });
                    buttonWrapperElem.appendChild(editButtonElem);
                    eventElem.appendChild(buttonWrapperElem);
                }
                document.getElementById(ID).appendChild(eventElem);
            });
        });
}

function reloadEvents() {
    // Get Current Page
    let urlArray = window.location.href.split('/');
    let pageName = urlArray[urlArray.length - 1];

    // Only Load Events on Desired Page
    if (pageName == "index.html") {
        $("#homeEvents").empty();
        loadEvents("homeEvents");
    } else if (pageName == "events.html") {
        $("#eventsEvents").empty();
        loadEvents("eventsEvents");
    }
}
