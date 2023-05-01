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
    } else {
        r_e("signinbtn").innerHTML = `Admin Portal`;
        user_add_div.classList.add('is-hidden');
        email_bar.classList.remove('is-hidden');
        password_bar.classList.remove('is-hidden');
        r_e("login_submit").innerHTML = "Login";
        reloadEvents();
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


if (pageName == "index.html" || pageName == "events.html") {
    //add new events
    event_submit.addEventListener("click", () => {
        add_doc();
    });

    document.getElementById("event_modalbg").addEventListener("click", () => {
        event_modal.classList.remove("is-active");
        r_e("event_form").reset();
        $('#addError').text("");
    });

    document.getElementById("event_edit_modalbg").addEventListener("click", () => {
        $('#event_edit_modal').removeClass("is-active");
        r_e("event_edit_form").reset();
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
        r_e("event_edit_form").reset();
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
        r_e("event_form").reset();
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
            docs.sort((e) => {
                return Date.parse(e.data().Date);
            });
            docs.forEach((e) => {
                if (Date.parse(e.data().Date) < Date.now()) {
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
    if (pageName == "index.html") {
        $("#homeEvents").empty();
        loadEvents("homeEvents");
    } else if (pageName == "events.html") {
        $("#eventsEvents").empty();
        loadEvents("eventsEvents");
    }
}
