function updateNavLinks() {
    let urlParts = window.location.href.split('/');
    let pageName = urlParts[urlParts.length - 1].replace('.html', '');
    $('#' + pageName).addClass('active');
}

$( document ).ready(function() {
    updateNavLinks();
});