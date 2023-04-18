function updateNavLinks() {
    let urlParts = window.location.href.split("/");
    let pageName = urlParts[urlParts.length - 1].replace(".html", "");
    $("#" + pageName).addClass("active");
}

$(document).ready(function () {
  SlideShow(slidePosition);
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

function UserCheck() {
    if (UC == 0) {
        r_e('signinbtn').innerHTML = `Admin Portal`
    } else if (UC == 1) {
        r_e('signinbtn').innerHTML = `Log Out`
    }
};
r_e('index').onload = UserCheck();

function r_e(id) {
    return document.querySelector(`#${id}`)
}
let signinbtn = document.querySelector('#signinbtn');
let signin_modal = document.querySelector('#signin_modal');
let signin_modalbg = document.querySelector('#signin_modalbg');

login_submit.addEventListener('click', () => {
    signin_modal.classList.remove('is-active');
    r_e('signin_form').reset();
    console.log("hello");
    r_e('signinbtn').innerHTML = `Log Out`;
    UC = 1;
    console.log(UC);

});


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
// Slideshow functions 
var slidePosition = 1;

// forward/Back controls
function plusSlides(n) {
  SlideShow(slidePosition += n);
}

//  images controls
function currentSlide(n) {
  SlideShow(slidePosition = n);
}

function SlideShow(n) {
  var i;
  var slides = document.getElementsByClassName("Containers");
  if (n > slides.length) {slidePosition = 1}
  if (n < 1) {slidePosition = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[slidePosition-1].style.display = "flex";
}
