

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA7FB9y6ej2xEHvsmphpaH8FBym-7LNU2c",
    authDomain: "johnpaul-fit4run.firebaseapp.com",
    databaseURL: "https://johnpaul-fit4run.firebaseio.com",
    projectId: "johnpaul-fit4run",
    storageBucket: "johnpaul-fit4run.appspot.com",
    messagingSenderId: "347215802581"
  };
  firebase.initializeApp(config);

  //var database = firebase.database();


  /*    ----------------------------------------------------------------------
  *     ---------------------- Events TO-DO on LOAD !! -----------------------
  *     ----------------------------------------------------------------------
  */   


  window.addEventListener('load', function() {
    console.log("Registration - Visitor ++");
    var clock = new Date();
    var month = clock.getUTCMonth() + 1; //months from 1-12
    var day = clock.getUTCDate();
    var year = clock.getUTCFullYear();
    var dayMonthYear = day+'d'+month+'m'+year+'y';
    var activityLogsRef = firebase.database().ref('activityLogs/visitedRegistration/'+dayMonthYear);
    activityLogsRef.once('value',function(data){
      if(data.val()==null){
        firebase.database().ref('activityLogs/visitedRegistration/'+dayMonthYear).set({
          visitor: 1
        });
      }else{
        firebase.database().ref('activityLogs/visitedRegistration/'+dayMonthYear).set({
          visitor: data.val().visitor+1
        });
      }
  
    });
  
  });

  String.prototype.Uncapitalize = function() {
    return this.charAt(0).toLowerCase() + this.slice(1);
}

  
  function signUpButtonClicked(){
      //alert(tagId);
      /*
      console.log(" * activateButtonClicked !! ");
      var clock = new Date();
      var month = clock.getUTCMonth() + 1; //months from 1-12
      var day = clock.getUTCDate();
      var year = clock.getUTCFullYear();
      var dayMonthYear = day+'d'+month+'m'+year+'y';
      var newDate = clock.getTime();
      console.log(dayMonthYear);
      */
      //var udbUsername = "";
      var birthdayCheckInput = document.getElementById('bdReg').value;
      var heightCheckInput = document.getElementById('heightReg').value;
      var weightCheckInput = document.getElementById('weightReg').value;
      var usernameCheckInput = document.getElementById('usernameReg').value;
      var facultyCheckInput = document.getElementById('facultyReg').value;
     
/*
      if(bd.substr(0,4)>2017){
        alert("Invalid Birthday XXX - requires 1994 A.D");
        return;
      }
     */
      usernameCheckInput = usernameCheckInput.Uncapitalize();
      //alert(usernameCheckInput);
     // CHECK - is Student ? | IF "Yes" then require 8char(s).
     if(facultyCheckInput=="Department / Position"){
        alert("Please, choose Department/Position !!");
        return;
     }

     if(["Science and Technology","Management and Economics","Engineering","Arts","Communication Arts","Architecture and Design","Music"].indexOf(facultyCheckInput)>-1){
         if(usernameCheckInput.substr(0,1)!="u"||usernameCheckInput.length!=8){
             alert("Invalid ID XXX - Ex. u5737444");
             return;
         }
     }


     // CHECK - HeightReg | 140 < x < 250
    if(heightCheckInput>250&&heightCheckInput<140){
        alert("Invalid Height XXX - Ex. 170 (cm)");
    }

    // CHECK - WeightReg | x < 450
    if(weightCheckInput>450){
        alert("Invalid Height XXX - Ex. 60 (kg)");
    }

    // CHECK - bdReg | x < 2018
    /*
      if(birthdayCheckInput.substr(0,4)>2017){
        alert("Invalid Birthday XXX - requires 1994 A.D");
        return;
      }
*/
    // CHECK - bdReg | IF x < 1500 then +543
    if(birthdayCheckInput.substr(0,4)<1500){
      console.log("Birthday LESS than 1500 +++++");
      var temp = parseInt(birthdayCheckInput.substr(0,4))+543;
      birthdayCheckInput = temp + birthdayCheckInput.substr(4,6);
    }

    // CHECK - bdReg | IF x > 2450 then -543
    if(birthdayCheckInput.substr(0,4)>2450){
      console.log("Birthday LESS than 1500 +++++");
      var temp = parseInt(birthdayCheckInput.substr(0,4))-543;
      birthdayCheckInput = temp + birthdayCheckInput.substr(4,6);
    }
    //alert(birthdayCheckInput);
    //return;

    var userDB = firebase.database().ref('users/'+document.getElementById('usernameReg').value);
    userDB.once('value',function(udb){
        /*
        if(udb.val()==null){    console.log("Wrong Telephone Number XXX"); return;}
        console.log(udb.val().username);
        //console.log(udb.val().email);
        updateDailyDB(tel,tagId,udb.val().username,dayMonthYear,newDate);
        //udbUsername = udb.val().username;
        */

        if(udb.val()!=null){ alert("Username is already used / Invalid. !!"); return; }


        var genderReg = "male";
        if(document.getElementById('femaleReg').checked){ genderReg = "female" }

        var displaynameReg = document.getElementById('displayNameReg').value;
        var facultyReg = document.getElementById('facultyReg').value;   
        var usernameReg = usernameCheckInput;
        var heightReg = document.getElementById('heightReg').value;
        var weightReg = document.getElementById('weightReg').value;
        var bdReg = birthdayCheckInput;
        
        

        firebase.database().ref('users/'+ usernameReg).set({
            displayName: displaynameReg,
            totalDistance: 0,
            gender: genderReg,
            faculty: facultyReg,
            totalTime: 0,
            height: heightReg,
            weight: weightReg,
            birthday: bdReg
        });
        alert("Registration Success !!");
        window.location.replace("registration.html");
    });
    
    
    
  }






  window.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        signUpButtonClicked();
    }
  });
