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

  var database = firebase.database();


  /*    ----------------------------------------------------------------------
  *     ---------------------- Events TO-DO on LOAD !! -----------------------
  *     ----------------------------------------------------------------------
  */   
window.addEventListener('load', function() {
    // TO trigger the input box
    document.getElementById("usernameAct").focus();

})


  /*    ----------------------------------------------------------------------
  *     ---------------------- Events TO-DO on LOAD !! -----------------------
  *     ----------------------------------------------------------------------
  */ 
  //var updateButton = document.getElementById("updateButton");
  //var tagID = document.getElementById("tagID-Box");
    //document.getElementById("tagID-Box")
    /*
    window.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
     // tagChecked(document.getElementById("tagID-Box").value);
     //document.getElementById("telReg").value = ""; 
     //document.getElementById("tagReg").value = ""; 
    }
  });
  */
  // interval delay for 10 second(s)
  var delay = 1000*10;
  
  
  function activateButtonClicked(username,tagId){
      //alert(tagId);
      //alert(tel+" - "+tagId);
      console.log(" * activateButtonClicked !! ");
      var clock = new Date();
      var month = clock.getUTCMonth() + 1; //months from 1-12
      var day = clock.getUTCDate();
      var year = clock.getUTCFullYear();
      var dayMonthYear = day+'d'+month+'m'+year+'y';
      var newDate = clock.getTime();
      console.log(dayMonthYear);
      if(username==""){ alert("Empty username XXX"); return;}
      if(tagId==""){ alert("Empty tagID XXX"); return;}
      //var udbUsername = "";
    var userDB = firebase.database().ref('users/'+username);
    userDB.once('value',function(udb){
        if(udb.val()==null){    console.log("Incorrect Username XXX"); alert("Incorrect Username XXX"); return;}

        console.log(udb.val());
        updateDailyTags(username,tagId,dayMonthYear);
        updateDailyRecords(username,dayMonthYear,newDate,udb.val());
        //udbUsername = udb.val().username;
    });
   // console.log("DBBB");
    
    document.getElementById("usernameAct").value = ""; 
    document.getElementById("tagAct").value = ""; 
    
  }


  /**
   * Update Daily DB
   */ 
function updateDailyTags(username,tagId,dayMonthYear){
  // var dailyTagDB = firebase.database().ref('daily/tags/'+dayMonthYear+'/'+ tagId);
        localStorage.setItem(tagId, username);
        //var test = localStorage.getItem(tagId);
        //console.log(test);

  var dailyTagDB = firebase.database().ref('dailyTagsMapUsers/'+dayMonthYear);
  dailyTagDB.once('value',function(snapshot){
      if(snapshot.val()!=null)
      {
          //updateUsersDB(superSnapshot.val().id,newTime);
         // updateDailyDB(tel,tagId,dayMonthYear);
         firebase.database().ref('dailyTagsMapUsers/'+ dayMonthYear +'/'+ tagId).set({
          userID: username
      });
          
          
      }else{
         // firebase.database().ref().child('daily').child('tags').setValue(dayMonthYear);
          firebase.database().ref('dailyTagsMapUsers/'+ dayMonthYear +'/'+ tagId).set({
              userID: username
          });

           console.log("* daily/tags - just created -> /dayMonth/Year!!");

        }

  });

}




  window.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
     // tagChecked(document.getElementById("tagID-Box").value);
     //var telActBox = document.getElementById("telAct");
     //var tagActBox = document.getElementById("tagAct");

     //alert(document.getElementById("telAct").value);
      activateButtonClicked(document.getElementById("usernameAct").value,document.getElementById("tagAct").value);
      document.getElementById("usernameAct").value = "";
      document.getElementById("tagAct").value = "";
      document.getElementById("usernameAct").focus();
    }
  });

  /*    ----------------------------------------------------------------------------------------------------------
  *     ---------------------- TO Update Firebase - daily/records/dayMonthYear/(newData) ] -----------------------
  *     ----------------------------------------------------------------------------------------------------------
  */ 

  function updateDailyRecords(username,dayMonthYear,newDate,udb){
    
   // console.log(udb);
        var displayName = udb.displayName;
        var gender = udb.gender;
        var faculty = udb.faculty;
        //var temp = 0;
        //var temp1 = -1;
        
        var userLocal = JSON.parse(localStorage.getItem(username));
        if(userLocal==null){
            var userData = {lastCheck:newDate, lastRunningTime:-1 , runningDistance:0, runningTime:0, displayName:displayName, gender:gender, faculty:faculty};
            localStorage.setItem(username, JSON.stringify(userData));
        }else{
            var userData = {lastCheck:newDate, lastRunningTime:-1, runningDistance:userLocal.runningDistance, runningTime:userLocal.runningTime, displayName:displayName, gender:gender, faculty:faculty};
            localStorage.setItem(username, JSON.stringify(userData));
        }
        //var userLocal = JSON.parse(localStorage.getItem(tel));
        console.log(userLocal);

        var dailyTagDB = firebase.database().ref('dailyUsersRecords/'+dayMonthYear+'/'+ username);
        dailyTagDB.once('value',function(snapshot){
            if(snapshot.val()!=null)
            {
                firebase.database().ref('dailyUsersRecords/'+ dayMonthYear +'/'+ username).set({
                    lastCheck: newDate,
                    lastRunningTime: -1,
                    runningDistance: snapshot.val().runningDistance,
                    runningTime: snapshot.val().runningTime,
                    displayName: udb.displayName,
                    gender: udb.gender,
                    faculty: udb.faculty
                });    
            }else{
                localStorage.removeItem(username);
                var userData = {lastCheck:newDate, lastRunningTime:-1 , runningDistance:0, runningTime:0, displayName:displayName, gender:gender, faculty:faculty};
                localStorage.setItem(username, JSON.stringify(userData));
               // firebase.database().ref().child('daily').child('tags').setValue(dayMonthYear);
               firebase.database().ref('dailyUsersRecords/'+ dayMonthYear +'/'+ username).set({
                lastCheck: newDate,
                lastRunningTime: -1,
                runningDistance: 0,
                runningTime: 0,
                displayName: udb.displayName,
                gender: udb.gender,
                faculty: udb.faculty
            });
                 console.log("* dailyUsersRecords - just created -> /dayMonthYear/(new record) !!");
                 
              
              }
              alert(username+"\nActivate Success !!");
        });


        

  }

  /*    ----------------------------------------------------------------------
  *     ---------------------- XXXXXX !! -----------------------
  *     ----------------------------------------------------------------------
  */ 


  // interval delay for 10 second(s)
  //var delay = 1000*10;
  var clock = new Date();
  var month = clock.getUTCMonth() + 1; //months from 1-12
  var day = clock.getUTCDate();
  var year = clock.getUTCFullYear();
  var dayMonthYear = day+'d'+month+'m'+year+'y';
  var newDate = clock.getTime();
  console.log(dayMonthYear);
  var tagActList = firebase.database().ref().child('dailyTagsMapUsers').child(dayMonthYear);

tagActList.on('child_added', function(snapshot){
    console.log(snapshot.val().userID+" is using a Tag + ADDED");
    //var temp = "";
    var userDB = firebase.database().ref('users/'+snapshot.val().userID);
    userDB.once('value',function(udb){
        var temp = udb.val().displayName+" : "+udb.val().totalDistance+" rounds";
        var htmlMes = "<p id="+snapshot.key+">"+snapshot.val().userID+" - "+temp+"</p>";
        $("#tagActList").append(htmlMes);
    });
    //var htmlMes = "<p id="+snapshot.key+">"+snapshot.val().userID+" - "+temp+"</p>";
    //$("#tagActList").append(htmlMes);
  });
  tagActList.on('child_changed', function(snapshot){
    console.log(snapshot.val().userID+" is using a Tag = CHANGED");
    //var target = document.getElementById(snapshot.key);
    document.getElementById(snapshot.key).innerHTML = snapshot.val().userID;
  });
  tagActList.on('child_removed', function(snapshot){
    console.log(snapshot.val().userID+" has returned a TAG - REMOVED");
    $("#tagActList").remove(snapshot.key);
  });