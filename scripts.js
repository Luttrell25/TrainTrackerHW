var config = {
  apiKey: "AIzaSyAkkw1gPfSnKzN7eKCPRv7PYF9hJvZKBL4",
  authDomain: "train-scheduler-438d1.firebaseapp.com",
  databaseURL: "https://train-scheduler-438d1.firebaseio.com",
  projectId: "train-scheduler-438d1",
  storageBucket: "",
  messagingSenderId: "933261379515"
};
firebase.initializeApp(config);

var database = firebase.database();


$("#add-train-btn").on("click", function(event) {
  event.preventDefault();


  var empName = $("#train-name-input").val().trim();
  var empRole = $("#role-input").val().trim();
  var empStart = moment($("#start-input").val().trim(), "DD/MM/YY").format("X");
  var empRate = $("#rate-input").val().trim();


  var newEmp = {
    name: empName,
    role: empRole,
    start: empStart,
    rate: empRate
  };


  database.ref().push(newEmp);


  console.log(newEmp.name);
  console.log(newEmp.role);
  console.log(newEmp.start);
  console.log(newEmp.rate);


  alert("train successfully added");


  $("#train-name-input").val("");
  $("#role-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});


database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());


  var empName = childSnapshot.val().name;
  var empRole = childSnapshot.val().role;
  var empStart = childSnapshot.val().start;
  var empRate = childSnapshot.val().rate;


  console.log(empName);
  console.log(empRole);
  console.log(empStart);
  console.log(empRate);


  var empStartPretty = moment.unix(empStart).format("MM/DD/YY");



  var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
  console.log(empMonths);


  var empBilled = empMonths * empRate;
  console.log(empBilled);


  $("#train-table > tbody").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" +
  empStartPretty + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");
});
