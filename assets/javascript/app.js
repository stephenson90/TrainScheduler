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
  var firstTrain;
  var trainTime;
  var nbrMinutes;
  var currentTime = moment();
  var timeMiliS;
  var nextTrain;
  var tRemainder;
  var diffTime;

   
$("#add-train").on("click", function(event){

	event.preventDefault();
	trainName = $("#train").val().trim();
	trainDestination = $("#city").val().trim();
	trainFrequency = $("#frequency").val().trim();
	firstTrain = $("#time").val().trim();

	

  trainDatabase.ref().push({
  	train:trainName,
  	destination: trainDestination,
  	frequency:trainFrequency,
  	time:firstTrain,
  	mins:nbrMinutes,
  	

  });

  
     

  	$("#train").html();
  	$("#city").html();
  	$("#frequency").html();
  	$("#time").html();



});

console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm")); 


  trainDatabase.ref().on("child_added", function(childSnapshot){
  	trainTime = childSnapshot.val().time;
  	trainFrequency = childSnapshot.val().frequency;
  	console.log(trainTime);

  	// First Time (pushed back 1 year to make sure it comes before current time)
    timeMiliS = moment(trainTime, "hh:mm").subtract(1, "years");
    console.log(timeMiliS);

     // Difference between the times
    var diffTime = moment().diff(moment(timeMiliS), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    tRemainder = diffTime % trainFrequency;
    console.log(tRemainder);

    // Minute Until Train
    nbrMinutes = trainFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + nbrMinutes);

    // Next Train
    nextTrain = moment().add(nbrMinutes, "minutes");

  	  	 $("#trainTable").append("<tr>"+"<td>" +childSnapshot.val().train +"</td>"+
        "<td>" + childSnapshot.val().destination +"</td>"+
        "<td>" + childSnapshot.val().frequency +"</td>"+
        "<td>" + moment(nextTrain).format("hh:mm") + "</td>"+ "<td>" + nbrMinutes+ "</td>"+"</tr>");

 	
  	
    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });


  
  	
  });




