/* 
document.querySelector('.editButt').addEventListener("click", function(event) { 
    event.preventDefault();

    var database = firebase.database().ref('user/');
    var tel = document.getElementById('telNo');
    
    var postData = {
      name: document.getElementById('name').value,
      height: document.getElementById('height').value,
      weight: document.getElementById('weight').value,
      faculty: document.getElementById('faculty').value
    };
    
    var updates = {};
    updates['user/' + tel] = postData;
    var name = document.getElementById('name').value;
    var height = document.getElementById('height').value;
    var weight = document.getElementById('weight').value;
    var faculty = document.getElementById('faculty').value;

    
    database.set({
      name: name,
      height: height,
      weight: weight,
      faculty: faculty
      name = document.getElementById('name').value;
      height = document.getElementById('height').value;
      weight = document.getElementById('weight').value;
      faculty = document.getElementById('faculty').value;
    });
    
    
    displayName: document.getElementById('name').value;
    height: document.getElementById('height').value;
    weight: document.getElementById('weight').value;
    faculty: document.getElementById('faculty').value;
    
});
    */
  

(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#sideNav'
  });

})(jQuery); // End of use strict
