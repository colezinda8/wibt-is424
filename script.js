function updateNavLinks() {
    let urlParts = window.location.href.split('/');
    let pageName = urlParts[urlParts.length - 1].replace('.html', '');
    $('#' + pageName).addClass('active');
}

$(document).ready(function () {
    updateNavLinks();
});


function r_e(id) {
    return document.querySelector(`#${id}`)
}
let signinbtn = document.querySelector('#signinbtn');
let signin_modal = document.querySelector('#signin_modal');
let signin_modalbg = document.querySelector('#signin_modalbg');

r_e('signin_form').addEventListener('submit', (e) => {
    e.preventDefault();
    //alert('test');
    let email = r_e("email_").value;
    let password = r_e("password_").value;
    auth.signInWithEmailAndPassword(email, password).then((user) => {

        //console.log(`${user.user.email}  is created`);


        configure_message_bar(`${user.user.email}  is signed in`);
        r_e('signin_form').reset();
        r_e('signin_modal').classList.remove('is-active');


    }).catch(err => {
        signin_modal.querySelector('.error').innerHTML = err.message;

    })
    //r_e('signup_form').requestFullscreen();
    //or

})


signinbtn.addEventListener('click', () => {
    signin_modal.classList.add('is-active');
})

signin_modalbg.addEventListener('click', () => {
    signin_modal.classList.remove('is-active');
});

$('#signin_modal').on('close', function (x) {
    console.log("succses");
    $(this).find('form').trigger('reset');
})