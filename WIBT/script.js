function updateNavLinks() {
    let urlParts = window.location.href.split("/");
    let pageName = urlParts[urlParts.length - 1].replace(".html", "");
    $("#" + pageName).addClass("active");
}

$(document).ready(function () {
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

    //    let email = r_e("email_").value;
    //    let password = r_e("password_").value;
    //    firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {

    //console.log(`${user.user.email}  is created`);
    //        console.log(user);
    //    })
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
        user_add_div.classList.add('is-hidden');
    } else if (UC == 1) {
        r_e('signinbtn').innerHTML = `Log Out`
        user_add_div.classList.remove('is-hidden');
    }
};


//e.preventDefault();
//alert('test');

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



signinbtn.addEventListener('click', () => {
    if (r_e('signinbtn').innerHTML == "Admin Portal") {
        signin_modal.classList.add('is-active');
    } else if (r_e('signinbtn').innerHTML == "Log Out") {
        r_e('signinbtn').innerHTML = `Admin Portal`;
        UC = 0;
    }
});

signin_modalbg.addEventListener('click', () => {
    signin_modal.classList.remove('is-active');
    r_e('signin_form').reset();
});


///user sign in

//firebase.auth().createUserWithEmailAndPassword(email, password)
//  .then((userCredential) => {
// Signed in 
//    var user = userCredential.user;
// ...
//})