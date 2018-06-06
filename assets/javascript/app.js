var config = {
  apiKey: "AIzaSyDrEDTdZKAaDeiv4Xtdna9mSJR9ZjLBE5o",
  authDomain: "rock-paper-scissors-onli-679e9.firebaseapp.com",
  databaseURL: "https://rock-paper-scissors-onli-679e9.firebaseio.com",
  projectId: "rock-paper-scissors-onli-679e9",
  storageBucket: "rock-paper-scissors-onli-679e9.appspot.com",
  messagingSenderId: "345831867479"
};

firebase.initializeApp(config);

var database = firebase.database();
var currentTime = moment();
var nameInput = "";
var dest = "";
var frequency = 0;
var firstTime = null;
var diffStartCurrent = null;
var diffInMinutes = 0;

console.log("Current time: " + currentTime.format('HH:mm'));

$('#submit-trains').on('click', function (event) {
  event.preventDefault();

  nameInput = $("#train-name").val().trim();
  dest = $("#destination").val().trim();
  frequency = $("#frequency").val().trim();

  firstTime = $("#first-train-time").val().trim();
  diffStartCurrent = moment.utc(moment(currentTime,"HH:mm").diff(moment(firstTime, "HH:mm"))).format("HH:mm")
  diffInMinutes = moment.duration(currentTime.diff(firstTime));
  var freqMod = diffInMinutes % frequency;

  var remainTime = diffInMinutes % frequency;
  var minsLeft = frequency - freqMod;
  console.log ("firstTime: " + firstTime);
  console.log ("diffStartCurrent: " + diffStartCurrent);
  console.log ("diffInMinutes: " + diffInMinutes);
  console.log ("Frequency: " + frequency);
  console.log ("RemainTime: " + remainTime);
  console.log ("Frequency: " + frequency);
  console.log ("MinsLeft: " + minsLeft);
  var nextArrival = moment().add(minsLeft, "m").format("hh:mm A");


  var addTrain = {
    name: nameInput,
    trainDestination: dest,
    freq: frequency,
    next: nextArrival,
    minsAway: minsLeft
  };

  database.ref().push(addTrain);
  
  //CLEARS INPUT BOXES
  $("#train-name").val("");
  $("#destination").val("");
  $("#first-train-time").val("");
  $("#frequency").val("");
});


database.ref().on("child_added", function (childSnapshot, prevChildKey) {
  //console.log(childSnapshot.val());

  var inputName = childSnapshot.val().name;
  var inputDestination = childSnapshot.val().trainDestination;
  var inputFreq = childSnapshot.val().freq;
  var nArrive = childSnapshot.val().next;
  var minsTilArrive = childSnapshot.val().minsAway;

  $("#trainTable > tbody").append("<tr><td>" + inputName + "</td><td>" + inputDestination + "</td><td>" + inputFreq + "</td><td>" + nArrive + "</td><td>" + minsTilArrive + "</td></tr>");
});
