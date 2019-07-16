// This is to show how tags can be appended using jQuery
jQuery("#credits").on("click", function() {
    var message = "Hello Julian";
    jQuery("#credits").append("<p>" + message + "</p>");
});

// jQuery("#scoresbtn").on("click", function() {
//   jQuery("#content").empty();
//   jQuery("#content").append(
//     "<ul>" +
//       "<li>" + "Me" + "</li>" +
//       "<li>" + "Also me" + "</li>" +
//       "<li>" + "Me again" + "</li>" +
//     "</ul>"
//   );
//   jQuery("#scoresbtn").addClass("active");
//   jQuery("#creditsbtn").removeClass("active");
//   jQuery("#helpbtn").removeClass("active");
// });

// manages click event on score button
jQuery("#scoresbtn").on("click", function() {
  jQuery("#content").empty();

  jQuery("#scoresbtn").addClass("active");
  jQuery("#creditsbtn").removeClass("active");
  jQuery("#helpbtn").removeClass("active");

  if (jQuery("#scores").children().length == 0) {
    jQuery("#noscores").show();
  } else {
    jQuery("#scores").show();
  }
});

// manages click event on credit button
jQuery("#creditsbtn").on("click", function() {
  jQuery("#content").empty();

  jQuery("#creditsbtn").addClass("active");
  jQuery("#scoresbtn").removeClass("active");
  jQuery("#helpbtn").removeClass("active");

  jQuery("#noscores").hide();
  jQuery("#scores").hide();

  jQuery("#content").append(
    "<div>" + "Game created by Julian!" + "</div>"
  );
});


// manages click event on help button
jQuery("#helpbtn").on("click", function() {
  jQuery("#content").empty();

  jQuery("#scoresbtn").removeClass("active");
  jQuery("#creditsbtn").removeClass("active");
  jQuery("#helpbtn").addClass("active");

  jQuery("#noscores").hide();
  jQuery("#scores").hide();

  jQuery("#content").append(
    "<ul>"
      + "<li>" + "Press SPACE to flap your wings" + "</li>"
      + "<li>" + "Avoid the incoming pipes" + "</li>"
      + "<li>" + "If you crash, just try again!" + "</li>"
    + "</ul>"
  );
});


// function asks user for name and adds score to ranking
// remark: function needs to be added to the gameOver function in flappy.js
function registerScore(score) {
   var playerName = prompt("What's your name?");
   var scoreEntry = "<li>" + playerName + ": " + score.toString() + "</li>";

   // use expression below and remove the if statement to add all scores to ranking
   //$("#scores").append(scoreEntry);

   // compares score with best score recorded since visited the website
   // if score is only added to ranking if it is better than the record
   // remark: one could also replace bestscore with treshold value
   if (score > bestscore ) {
      bestscore = score;
      $("#scores").append(scoreEntry);
   }
}


// manages click event on Twitter link / button
jQuery("#sharing").on("click", function(){
  var text = "I scored " + score.toString() + " in Flappy Birdy! Can you do better?";
  var escapedText = encodeURIComponent(text);
  var url = "https:twitter.com/share?text=" + escapedText;
  jQuery("#sharing").attr("href", url);
});
