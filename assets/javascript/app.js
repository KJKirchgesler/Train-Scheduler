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

  });





