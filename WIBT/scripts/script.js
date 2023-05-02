// Configuration for WIBT DB
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
    // Enable responsive navbar for mobile viewing
    $(".navbar-burger").click(function () {
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
    });
});

//--------------------------------HELPER FUNCTIONS-----------------------------

function return_element(id) {
    return document.querySelector(`#${id}`);
}

//--------------------------------SIGN UP FUNCTIONALITY------------------------

// Set up sign up variables
let signinbtn = document.querySelector("#signinbtn");
let signin_modal = document.querySelector("#signin_modal");
let signin_modalbg = document.querySelector("#signin_modalbg");
let event_modal = document.querySelector("#event_modal");
let user_add = document.querySelector("#user_add");
let actual_user_add = document.querySelector("#actual_user_add");
let cancel_btn = document.querySelector("#cancel_btn");
let login_submit = document.querySelector("#login_submit");

// set up modal open
signinbtn.addEventListener("click", () => {
    signin_modal.classList.add("is-active");
});

// set up modal closing
signin_modalbg.addEventListener("click", () => {
    submit_btn.classList.remove('is-hidden');
    cancel_btn.classList.add('is-hidden');
    if (auth.currentUser) {
        email_bar.classList.add('is-hidden');
        password_bar.classList.add('is-hidden');
        user_add.classList.remove('is-hidden');
    }
    actual_user_add.classList.add('is-hidden');
    signin_modal.querySelector('.error').innerHTML = "";
    signin_modal.classList.remove("is-active");
    return_element("signin_form").reset();
});

// Sign in Functionality
login_submit.addEventListener("click", (e) => {
    if (auth.currentUser) {
        auth.signOut()
            .then(() => {
                signin_modal.classList.remove("is-active");
                return_element("signin_form").reset();
            })
            .catch((error) => {
                signin_modal.querySelector('.error').innerHTML = error.message;
            });
    } else {
        e.preventDefault();
        let email = return_element("email_").value;
        let password = return_element("password_").value;
        auth.signInWithEmailAndPassword(email, password)
            .then((user) => {
                signin_modal.classList.remove("is-active");
                return_element("signin_form").reset();
            })
            .catch((error) => {
                signin_modal.querySelector('.error').innerHTML = error.message;
            });
    }
});

// auto hide cancel btn
cancel_btn.classList.add('is-hidden');

// add new user functionality
user_add.addEventListener("click", () => {
    submit_btn.classList.add('is-hidden');
    cancel_btn.classList.remove('is-hidden');
    email_bar.classList.remove('is-hidden');
    password_bar.classList.remove('is-hidden');
    user_add.classList.add('is-hidden');
    actual_user_add.classList.remove('is-hidden');
});

// handle submitting user to firestore
actual_user_add.addEventListener("click", () => {
    let email = return_element("email_").value;
    let password = return_element("password_").value;
    auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
            signin_modal.classList.remove("is-active");
            return_element("signin_form").reset();
            submit_btn.classList.remove('is-hidden');
            cancel_btn.classList.add('is-hidden');
            email_bar.classList.add('is-hidden');
            password_bar.classList.add('is-hidden');
            user_add.classList.remove('is-hidden');
            actual_user_add.classList.add('is-hidden');
            signin_modal.querySelector('.error').innerHTML = "";
        })
        .catch((error) => {
            signin_modal.querySelector('.error').innerHTML = error.message;
        });
});

// handle canceling add user
cancel_btn.addEventListener("click", () => {
    submit_btn.classList.remove('is-hidden');
    cancel_btn.classList.add('is-hidden');
    email_bar.classList.add('is-hidden');
    password_bar.classList.add('is-hidden');
    user_add.classList.remove('is-hidden');
    actual_user_add.classList.add('is-hidden');
    signin_modal.querySelector('.error').innerHTML = "";
    return_element("signin_form").reset();
});

// manage state
auth.onAuthStateChanged(function (user) {
    if (user) {
        return_element("signinbtn").innerHTML = user.email;
        user_add_div.classList.remove('is-hidden');
        email_bar.classList.add('is-hidden');
        password_bar.classList.add('is-hidden');
        user_add.classList.remove('is-hidden');
        signin_modal.querySelector('.error').innerHTML = "";
        return_element("login_submit").innerHTML = "Log Out";
        reloadEvents();
    } else {
        return_element("signinbtn").innerHTML = `Admin Portal`;
        user_add_div.classList.add('is-hidden');
        email_bar.classList.remove('is-hidden');
        password_bar.classList.remove('is-hidden');
        signin_modal.querySelector('.error').innerHTML = "";
        return_element("login_submit").innerHTML = "Login";
        reloadEvents();
    }
});


//-------------------EVENT EDITING & CREATING MODAL FUNCTIONALITY--------------

if (pageName == "index.html" || pageName == "events.html" || pageName == "") {
    //add new events
    event_submit.addEventListener("click", () => {
        add_doc();
    });

    document.getElementById("event_modalbg").addEventListener("click", () => {
        event_modal.classList.remove("is-active");
        return_element("event_form").reset();
        $('#addError').text("");
    });

    document.getElementById("event_edit_modalbg").addEventListener("click", () => {
        $('#event_edit_modal').removeClass("is-active");
        return_element("event_edit_form").reset();
        $('#editError').text("");
    });

    $('#close_delete').click(function () {
        $('#deleteModal').removeClass("is-active");
        $('#eventToDelete').attr("event_id", "");
        $('#deleteError').text("");
    });

    $('#delete_modalbg').click(function () {
        $('#deleteModal').removeClass("is-active");
        $('#eventToDelete').attr("event_id", "");
        $('#deleteError').text("");
    });

    $('#event_edit_close').click(function () {
        $('#event_edit_modal').removeClass("is-active");
        return_element("event_edit_form").reset();
        $('#editError').text("");
    });

    $('#event_delete').click(function () {
        submit_delete();
    });

    $('#event_edit_submit').click(function () {
        submit_edit();
    });

    $('#close_add').click(function () {
        event_modal.classList.remove("is-active");
        return_element("event_form").reset();
        $('#addError').text("");
    });
}


function add_doc() {
    let title = document.querySelector("#title").value;
    let date = document.querySelector("#date").value;
    let hour = document.querySelector("#hour").value;
    if (hour.length > 2 || hour.length < 1 || parseInt(hour) > 12 || parseInt(hour) < 1) {
        $('#addError').text("Invalid Hour Entry. Must be between 1 & 12.");
        return;
    }
    let minute = document.querySelector("#minute").value;
    if (minute.length > 2 || minute.length < 1 || parseInt(minute) > 59 || parseInt(minute) < 0) {
        $('#addError').text("Invalid Minutes Entry. Must be between 1 & 59.");
        return;
    }
    let ampm = document.querySelector("#ampm").value;
    let time = hour + ":" + minute + " " + ampm;

    let new_event = {
        Title: title,
        Date: date,
        Time: time,
    };

    if (auth.currentUser) {
        db.collection("events")
            .add(new_event)
            .catch((error) => {
                $('#addError').text("There was an issue communicating with the DB. Please try again later.");
            })
            .then(() => {
                reloadEvents();
                event_modal.classList.remove("is-active");
            });
    }
}

//create editing
function edit_doc(id1) {
    $('#event_edit_modal').addClass("is-active");
    $('#eventToEdit').attr("event_id", id1);
    db.collection("events")
        .where(firebase.firestore.FieldPath.documentId(), "==", id1)
        .get()
        .then((response) => {
            let element = response.docs;
            element.forEach((e) => {
                let title = e.data().Title;
                let time = e.data().Time;
                let date = e.data().Date;
                let firstSplit = time.split(" ");
                let secondSplit = firstSplit[0].split(":");
                document.getElementById("edit_title").value = title;
                document.getElementById("edit_date").value = date;
                document.getElementById("edit_hour").value = secondSplit[0];
                document.getElementById("edit_minute").value = secondSplit[1];
                document.getElementById("edit_ampm").value = firstSplit[1];
            });
        });
}

function submit_edit() {
    let title = document.getElementById("edit_title").value;
    let date = document.getElementById("edit_date").value;
    let hour = document.getElementById("edit_hour").value;
    if (hour.length > 2 || hour.length < 1 || parseInt(hour) > 12 || parseInt(hour) < 1) {
        $('#editError').text("Invalid Hour Entry. Must be between 1 & 12.");
        return;
    }
    let minute = document.getElementById("edit_minute").value;
    if (minute.length > 2 || minute.length < 1 || parseInt(minute) > 59 || parseInt(minute) < 0) {
        $('#editError').text("Invalid Minutes Entry. Must be between 1 & 59.");
        return;
    }
    let ampm = document.getElementById("edit_ampm").value
    let time = hour + ":" + minute + " " + ampm;
    let id = $('#eventToEdit').attr("event_id");

    if (auth.currentUser) {
        db.collection("events").doc(id).update({
            Title: title,
            Date: date,
            Time: time
        })
            .catch((error) => {
                $('#editError').text("There was an issue communicating with the DB. Please try again later.");
            })
            .then(() => {
                reloadEvents();
                $('#event_edit_modal').removeClass("is-active");
                $('#editError').text("");
            });
    }
}

function del_doc(id) {
    $('#deleteModal').addClass("is-active");
    $('#eventToDelete').attr("event_id", id);
}

function submit_delete() {
    let id = $('#eventToDelete').attr("event_id");
    db.collection("events")
        .doc(id)
        .delete()
        .catch((error) => {
            $('#deleteError').text("There was an issue communicating with the DB. Please try again later.");
        })
        .then(() => {
            reloadEvents();
            $('#deleteModal').removeClass("is-active");
            $('#eventToDelete').attr("event_id", "");
        });
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

            let docs = response.docs;
            // sort by date ascending
            docs.sort(function (a, b) {
                return Date.parse(a.data().Date) - Date.parse(b.data().Date);
            });
            // load events
            docs.forEach((e) => {
                if (Date.parse(e.data().Date) < Date.now()) {
                    // don't show if date is already past
                    return;
                }
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
    if (pageName == "index.html" || pageName == "") {
        $("#homeEvents").empty();
        loadEvents("homeEvents");
    } else if (pageName == "events.html") {
        $("#eventsEvents").empty();
        loadEvents("eventsEvents");
    }
}
