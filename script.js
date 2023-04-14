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
