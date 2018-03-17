// 1. Initialize Firebase
// 2. Create click event for adding new train data that will
		//update the table in index.html
		//update the Firebase database
// 3. Create a way to retrieve train data from the database.
// 4. Calculate when the next train will arrive:
		//based on first train time and frequency
		//this should be relative to the current time.
//    Then use moment.js formatting to set difference in minutes.
// 5. Calculate Minutes away


 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyC53-iDPz8HVCFzrx4UowiKrk5CRqL1sMA",
    authDomain: "trainscheduler-52e93.firebaseapp.com",
    databaseURL: "https://trainscheduler-52e93.firebaseio.com",
    projectId: "trainscheduler-52e93",
    storageBucket: "trainscheduler-52e93.appspot.com",
    messagingSenderId: "524907778316"
  };
  
  firebase.initializeApp(config);

  // Create a variable to reference the database.
  var database = firebase.database();

  // 2. Button for adding train
$("#add-train").on("click", function(event) {
  event.preventDefault();

  // Captures user input
  var trainName = $("#train-name").val().trim();
  var destination = $("#destination").val().trim();
  var firstTime = moment($("#first-time").val().trim(), "HH:mm").format("hh:mm");
  var frequencyMin = $("#frequency-min").val().trim();

 

  // Variable for holding train data
  var newTrain = {
    name: trainName,
    destination: destination,
    start: firstTime,
    frequency: frequencyMin
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name").val("");
  $("#destination").val("");
  $("#first-time").val("");
  $("#frequency-min").val("");

  });

// 3. Create Firebase event for adding train to the database and 
	//a row in the table when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

// Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTime = childSnapshot.val().start;
  var frequencyMin = childSnapshot.val().frequency;

   // console log train data to make sure variable works
  console.log(trainName);
  console.log(destination);
  console.log(firstTime);
  console.log(frequencyMin);


  // First Train Time  - set back 1 year to ensure it comes before current time
    var firstTimeReset = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeReset);

    // Current Time
    var rightNow = moment();
    console.log("The time now is: " + moment(rightNow).format("hh:mm"));

    // Establishing difference between the reset time and now
    var timeDifference = moment().diff(moment(firstTimeReset), "minutes");
    console.log("The difference is: " + timeDifference);

    // Time apart (remainder)
    var timeRemainder = timeDifference % frequencyMin;
    console.log(timeRemainder);

    // Minutes until next train arrives
    var minutesNextTrain = frequencyMin - timeRemainder;
    console.log("Minutes until next train: " + minutesNextTrain);

    // Next train arrives
    var nextTrain = moment().add(minutesNextTrain, "minutes");
    console.log("Next train arrival time: " + moment(nextTrain).format("hh:mm"));




  });





