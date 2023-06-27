document.getElementById('theme-toggle').addEventListener('click', function() {
    // Get the body element and all the elements that you want to change style
    var body = document.body;
    var allHeaders = document.querySelectorAll('h1, h2, p');
    var topDiv = document.getElementById('top');
    var navbar = document.querySelector('.navbar');
    var buttons = document.querySelectorAll('.btn');
  
    // Toggle the "dark-theme" class on each of them
    body.classList.toggle('dark-theme');
    allHeaders.forEach(function(header) {
      header.classList.toggle('dark-theme');
    });
    topDiv.classList.toggle('dark-theme');
    navbar.classList.toggle('dark-theme');
    buttons.forEach(function(button) {
      button.classList.toggle('dark-theme');
    });
  });
  