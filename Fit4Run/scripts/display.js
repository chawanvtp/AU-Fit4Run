//<script src="https://www.gstatic.com/firebasejs/4.9.0/firebase.js"></script>
    
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA7FB9y6ej2xEHvsmphpaH8FBym-7LNU2c",
    authDomain: "johnpaul-fit4run.firebaseapp.com",
    databaseURL: "https://johnpaul-fit4run.firebaseio.com",
    projectId: "johnpaul-fit4run",
    storageBucket: "johnpaul-fit4run.appspot.com",
    messagingSenderId: "347215802581"
  };
  //firebase.initializeApp(config);
console.log("Connected");

  function updateEdit(){
    //firebase.initializeApp(config);
    var database = firebase.database();
 
    var submit = document.getElementsByName('editButton');
    var username = localStorage.getItem("username");

   // console.log("Initialized");
    //console.log("Start");
    var Name = $('#runnerName').val();
    var Height = $('#height').val();
    var Weight = $('#weight').val();
    var Faculty = $('#faculty').val();
    var uDB = database.ref('users/'+username);
    var gender = "male";
    if(document.getElementById('female').checked){ gender = "female" }
    console.log("declared");
   
    uDB.on('value', function(snapshot){
      firebase.database().ref('users/'+username).set({
        displayName: Name,
        height: Height,
        weight: Weight,
        faculty: Faculty,
        gender: gender,
        birthday: snapshot.val().birthday,
        totalDistance: snapshot.val().totalDistance,
        totalTime: snapshot.val().totalTime});
        //evt.prevetDefault();
        //console.log("updated");
      });     
  }