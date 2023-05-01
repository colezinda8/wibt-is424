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

//add new events
event_submit.addEventListener("click", () => {
    add_doc();
});

if (pageName == "index.html" || pageName == "events.html") {
    document.getElementById("event_modalbg").addEventListener("click", () => {
        event_modal.classList.remove("is-active");
        r_e("event_form").reset();
    });
}

$('#close_delete').click(function () {
    $('#deleteModal').removeClass("is-active");
});

$('#event_delete').click(function () {
    let id = $('#eventToDelete').attr("event_id");
    db.collection("events")
        .doc(id)
        .delete()
        .then(() => {
            reloadEvents();
            $('#deleteModal').removeClass("is-active");
        });
});

function add_doc() {
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
}

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
}

function del_doc(id) {
    $('#deleteModal').addClass("is-active");
    $('#eventToDelete').attr("event_id", id);
}

//-------------------------EVENTS LOADING FUNCTIONALITY------------------------

function loadEvents(ID) {
    db.collection("events")
        .get()
        .then((response) => {
            if (auth.currentUser) {
                let addEventElem = document.createElement("div");
                $(addEventElem).addClass("event event-add");
                let addEventParagraph = document.createElement("p");
                $(addEventParagraph).addClass("event-add-text");
                let addEventText = document.createTextNode("Add Event");
                addEventParagraph.appendChild(addEventText);
                addEventElem.appendChild(addEventParagraph);
                $(addEventElem).click(function () {
                    event_modal.classList.add("is-active");
                });
                document.getElementById(ID).appendChild(addEventElem);
            }
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
