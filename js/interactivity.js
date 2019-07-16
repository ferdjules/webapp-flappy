jQuery('#scoresbtn').on('click', function() {
  jQuery('#content').empty();
  jQuery('#content').append(
    '<p>'+'Scores'+'</p>'
  );
  jQuery('#scoresbtn').addClass('active');
});

jQuery('#creditsbtn').on('click', function() {
  jQuery('#content').empty();
  jQuery('#content').append(
    '<p>'+'Credits'+'</p>'
  )
});

jQuery('#helpbtn').on('click', function() {
  jQuery('#content').empty();
  jQuery('#content').append(
    '<p>'+'Help'+'</p>'
  )
});














// jQuery("#credits").on("mouseleave", function() {
//   var message = "This game was created by guys and girls!";
//   jQuery("#credits").append(
//     '<p>'+message+'</p>'
//   )
// });
