$( document ).ready(function() {
    $('.nav-link').click(function(e) {
        $('.nav-link').removeClass('active');
        $(e.target).addClass('active');
        window.location.href = $(e.target).attr('href');
    });
});