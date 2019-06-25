// jQuery("#credits").on("click", function() {
//   var message = "Game created by Julian!";
//   jQuery("#credits").append(
//     "<p>" + message + "</p>"
//   );
// });

jQuery("#scoresbtn").on("click", function() {
  jQuery("#content").empty();
  jQuery("#content").append(
    "<ul>" +
      "<li>" + "Me" + "</li>" +
      "<li>" + "Also me" + "</li>" +
      "<li>" + "Me again" + "</li>" +
    "</ul>"
  );
  jQuery("#scoresbtn").addClass("active");
  jQuery("#creditsbtn").removeClass("active");
  jQuery("#helpbtn").removeClass("active");
});

jQuery("#creditsbtn").on("click", function() {
  jQuery("#content").empty();
  jQuery("#content").append(
    "<div>" + "Game created by Bob!" + "</div>"
  );
  jQuery("#scoresbtn").removeClass("active");
  jQuery("#creditsbtn").addClass("active");
  jQuery("#helpbtn").removeClass("active");
});

jQuery("#helpbtn").on("click", function() {
  jQuery("#content").empty();
  jQuery("#content").append(
    "<ul>"
      + "<li>" + "Press SPACE to flap your wings" + "</li>"
      + "<li>" + "Avoid the incoming pipes" + "</li>"
      + "<li>" + "If you crash, just try again!" + "</li>"
    + "</ul>"
  );
  jQuery("#scoresbtn").removeClass("active");
  jQuery("#creditsbtn").removeClass("active");
  jQuery("#helpbtn").addClass("active");
});

function registerScore(score) {
   var playerName = prompt("What's your name?");
   var scoreEntry = "<li>" + playerName + ":" + score.toString() + "</li>";
}

jQuery("#sharing").on("click", function(){
  var text = "I scored " + score.toString() + " in Flappy Birdy! Can you do better?";
  var escapedText = encodeURIComponent(text);
  var url = "https:twitter.com/share?text=" + escapedText
  jQuery("#sharing").attr("href", url);
});
