$(document).ready(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBru5AT63S2irYQOXh6H2CWXCn36O0vQaM",
    authDomain: "train-scheduler-413a1.firebaseapp.com",
    databaseURL: "https://train-scheduler-413a1.firebaseio.com",
    storageBucket: "train-scheduler-413a1.appspot.com",
    messagingSenderId: "485096167537"
  };
  firebase.initializeApp(config);

  var trainDatabase = firebase.database();

  var trainName;
  var trainDestination;
  var trainFrequency;
  var trainTime;
  var nbrMinutes;
  var dateFormated;
  var date = new Date();
  var currentTime = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
  var timeMiliS = date.getTime();
  console.log(currentTime);
  console.log(timeMiliS);
  

$("#add-train").on("click", function(event){

	event.preventDefault();
	trainName = $("#train").val().trim();
	trainDestination = $("#city").val().trim();
	trainFrequency = $("#frequency").val().trim();
	trainTime = $("#time").val().trim();

  trainDatabase.ref().push({
  	train:trainName,
  	destination: trainDestination,
  	frequency:trainFrequency,
  	time:trainTime,
  	dateAdded: firebase.database.ServerValue.TIMESTAMP  	


  });

  	$("#train").html();
  	$("#city").html();
  	$("#frequency").html();
  	$("#time").html();



});

  trainDatabase.ref().on("child_added", function(childSnapshot){

  	dateFormated = moment(childSnapshot.val().dateAdded).format('LLLL');

  	 $("#trainTable").append("<tr>" +"<td>" +childSnapshot.val().train +"</td>"+
        "<td>" + childSnapshot.val().destination +"</td>"+
        "<td>" + childSnapshot.val().frequency +"</td>"+
        "<td>" + childSnapshot.val().time + "</td>"+ "<td>" + dateFormated + "</td>"+"</tr>");
  	 	
  	 	console.log(dateFormated);
    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

  	
  });




