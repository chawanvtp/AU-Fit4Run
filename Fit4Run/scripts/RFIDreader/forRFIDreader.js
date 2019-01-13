

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
    document.getElementById("tagID-Box").focus();

  });

  /*    ----------------------------------------------------------------------
  *     ---------------------- Events TO-DO on ENTER !! -----------------------
  *     ----------------------------------------------------------------------
  */ 

  
//var updateButton = document.getElementById("updateButton");
var tagID = document.getElementById("tagID-Box");
  //document.getElementById("tagID-Box")
  window.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    tagChecked(document.getElementById("tagID-Box").value);
    document.getElementById("tagID-Box").value = "";
  }
});

// interval delay for 10 second(s)
var delay = 1000*10;


function tagChecked(tagId){
    console.log(" ** CALLED ==> tagChecked("+tagId+")");
    var clock = new Date();
    var month = clock.getUTCMonth()+1; //months from 1-12
    var day = clock.getUTCDate();
    var year = clock.getUTCFullYear();
    var dayMonthYear = day+'d'+month+'m'+year+'y';
    var newDate = clock.getTime();

    //console.log(newDate);
    //console.log(tagId);
  console.log("CHECKING ... - TAG: "+tagId);
  var dailyTagDB = firebase.database().ref('dailyTagsMapUsers/'+dayMonthYear+'/'+ tagId);
  dailyTagDB.once('value',function(superSnapshot){
      if(superSnapshot.val()!=null)
      {
          updateDailyDB(superSnapshot.val().userID,tagId,newDate,dayMonthYear);
          console.log("Tag is Activated - OOO");
      }else{
          console.log("Tag is Inactivated - XXX");
          // console.log("Tag is NOT activated !!");
        }

  });

}


 /*    ----------------------------------------------------------------------
  *     ---------------------- 1 round update to DAILY-db !! -----------------------
  *     ----------------------------------------------------------------------
  */ 

  
  function updateDailyDB(tel,tagId,newDate,dayMonthYear){
    console.log(" ** CALLED ==> updateDailyDB("+tel+","+tagId+","+newDate+","+dayMonthYear+")");
    
    var userID = localStorage.getItem(tagId);
    //console.log(userData.displayName);
    var userLocal = JSON.parse(localStorage.getItem(userID));
    if(userLocal!=null){
      var prevClock = userLocal.lastCheck;
      var newTime = parseInt((newDate-prevClock)/1000);
      var oldTime = userLocal.lastRunningTime;
      if((prevClock+delay)>newDate&&userLocal.lastRunningTime!=-1){  console.log("$$ Delaying .. "); return;   }
      if(userLocal.lastRunningTime<0){
        var userData = {lastCheck:newDate, lastRunningTime:userLocal.lastRunningTime+1, runningDistance:userLocal.runningDistance, runningTime:userLocal.runningTime, displayName:userLocal.displayName, gender:userLocal.gender, faculty:userLocal.faculty};   
        console.log("Start running...");
      }else{
        console.log("Success !! - counting round.");
        var userData = {lastCheck:newDate, lastRunningTime:newTime, runningDistance:userLocal.runningDistance+1, runningTime:userLocal.runningTime+newTime, displayName:userLocal.displayName, gender:userLocal.gender, faculty:userLocal.faculty};
      }
       localStorage.setItem(userID, JSON.stringify(userData));

       // User information declare HERE ------------->
       var userInfo = JSON.parse(localStorage.getItem(userID+'Info'));
       //console.log(userInfo);
       //console.log(userInfo.gender);
       //console.log(userInfo.height);
       //console.log(userInfo.weight);
       //console.log(userInfo.birthday);

       // ------------------------------------------<



      var name = userData.displayName;
      var speed = (0.5*3600)/newTime //userData.lastRunningTime;
      var tempSpeed = speed.toFixed(2);
     // console.log(tempSpeed);
      var height = userInfo.height;
      var weight = userInfo.weight;
      var age = (2018 - userInfo.birthday.substr(0,4));
      var bmr = 0;
      var gender = userInfo.gender;
      var calBurn = 0;
      if(age>80){
        age = 20;
      }
      if(gender == "male"){
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;       
      }
      if(gender == 'female'){
        bmr = 10 * weight + 6.25 * height - 5 * age -161;
      }
      if (speed >= 10){       
        calBurn = (newTime * 11 * bmr)/(24*3600);
        tempCal = calBurn.toFixed(2);
        //console.log(calBurn);
      }
      if (speed < 10){
        calBurn = (newTime * 6 * bmr)/(24*3600);
        tempCal = calBurn.toFixed(2);
      }
      //console.log(calBurn);
      var announce =  parseInt(userData.lastRunningTime/60)+':'+(userData.lastRunningTime%60) + ' minute(s) => Burned : ' + tempCal + ' kcal. | Speed: '+ tempSpeed + 'km/hr  ' ;
     if(userData.lastRunningTime<=0){
       announce = 'Start Running at Round: '+ userData.runningDistance;
       localStorage.setItem("calBurn", tempCal); //////////////////////////////////////
     }
     for(var i=1;i<=3;i++){
        if(i<3){
          //console.log(announce);
            document.getElementById('localAnnounce-bar'+i).innerText = document.getElementById('localAnnounce-bar'+(i+1)).innerText;
           document.getElementById('localAnnounceDetail-bar'+i).innerText = document.getElementById('localAnnounceDetail-bar'+(i+1)).innerText;
           
            // console.log(document.getElementById('announce-bar'+(i+1)).innerText);
        }else{
          document.getElementById('localAnnounce-bar'+i).innerText = name + " - Round: "+userData.runningDistance;
          var oldSpeed = localStorage.getItem("oldSpeed");
          //var arrow = document.getElementById('arrow');
          var detail = document.getElementById('localAnnounceDetail-bar'+i);
          var bar = document.getElementById('localAnnounce-bar'+i);
          /*
          if (oldTime < 0){
           // arrow.innerHTML = ("<img src = " + "images/play-button.png" + ">" );
           arrow.innerHTML = ("<img src = " + "'images/play-button.png' height='100' width='100' " + ">" );
          }else if(oldTime > newTime||oldTime==0){
            //arrow.innerHTML = ("<img src = " + "images/arrow-up-on-a-black-circle-background.png" + ">" );
            arrow.innerHTML = ("<img src = " + "'images/arrow-up-on-a-black-circle-background.png' height='100' width='100' s" + ">" );
          }
          else if(oldTime < newTime){
            //arrow.innerHTML = ("<img src = " + "images/arrow-down-on-black-circular-background.png" + ">" );
            arrow.innerHTML = ("<img src = " + "'images/arrow-down-on-black-circular-background.png' height='100' width='100' " + ">" );
          }
          */
          document.getElementById('localAnnounceDetail-bar'+i).innerText = announce;

          if (oldTime < 0){
            // arrow.innerHTML = ("<img src = " + "images/play-button.png" + ">" );
            detail.innerHTML += (" | <img src = " + "'images/play-button.png' height='80' width='80' " + ">" );
           }else if(oldTime > newTime||oldTime==0){
             //arrow.innerHTML = ("<img src = " + "images/arrow-up-on-a-black-circle-background.png" + ">" );
             detail.innerHTML += (" | <img src = " + "'images/arrow-up-on-a-black-circle-background.png' height='80' width='80' s" + ">" );
           }
           else if(oldTime < newTime){
             //arrow.innerHTML = ("<img src = " + "images/arrow-down-on-black-circular-background.png" + ">" );
             detail.innerHTML += (" | <img src = " + "'images/arrow-down-on-black-circular-background.png' height='80' width='80' " + ">" );
           }

        }

      }
      
       /*
       var name = userData.displayName;
       var announce =  'Round: '+ userData.runningDistance +' - '+ parseInt(userData.lastRunningTime/60) + ' minute(s) ' + (userData.lastRunningTime%60) + ' seconds.';
       if(userData.lastRunningTime<=0){
         announce = 'Start Running at Round: '+ userData.runningDistance;
       }
       for(var i=1;i<=3;i++){
          if(i<3){
            //console.log(announce);
              document.getElementById('localAnnounce-bar'+i).innerText = document.getElementById('localAnnounce-bar'+(i+1)).innerText;
             document.getElementById('localAnnounceDetail-bar'+i).innerText = document.getElementById('localAnnounceDetail-bar'+(i+1)).innerText;
              // console.log(document.getElementById('announce-bar'+(i+1)).innerText);
          }else{
            document.getElementById('localAnnounce-bar'+i).innerText = name;
              document.getElementById('localAnnounceDetail-bar'+i).innerText = announce;
          }
        }*/

    }
    
    //------------------------------------------------------------------<


  //var test = JSON.parse(localStorage.getItem(userID));
    //console.log(userLocal);

    var dailyDB = firebase.database().ref('dailyUsersRecords/'+ dayMonthYear +'/'+ tel);
    dailyDB.once('value',function(snapshot){
    console.log('DB ::> dailyUsersRecords/'+dayMonthYear+'/'+tel+'  == Next line');
    //console.log(snapshot.val());
    if(snapshot.val()==null){
        // Tag is Inactivated.
        console.log('- TAG is Inactivated .. XXX');
    }else{

        //var prevClock = userData.lastCheck;
        if((prevClock+delay)>newDate&&userLocal>=0){  console.log("$$ Delaying .. "); return;   }
        var oldTime = snapshot.val().lastRunningTime;
        var oldSpeed = (0.5*3600)/oldTime;
        localStorage.setItem("oldSpeed", oldSpeed);
        //console.log("OldTime:" + oldTime);
        var newDistance = 1;
        //var newTime = parseInt((newDate-prevClock)/1000);
        var lastRunningTime = userLocal.lastRunningTime;
          if(lastRunningTime<0)
            {  
              newTime = 0;
              firebase.database().ref('dailyUsersRecords/'+ dayMonthYear +'/'+ tel).set({
                displayName: snapshot.val().displayName,
                lastCheck: newDate,
                runningDistance: userData.runningDistance,
                runningTime: userData.runningTime,
                lastRunningTime: newTime,
                gender: snapshot.val().gender,
                faculty: snapshot.val().faculty
            });
              console.log("Start Running - CHECKED");  
              
            }else{
              firebase.database().ref('dailyUsersRecords/'+ dayMonthYear +'/'+ tel).set({
                displayName: snapshot.val().displayName,
                lastCheck: newDate,
                runningDistance: userData.runningDistance,
                runningTime: userData.runningTime,
                lastRunningTime: newTime,
                gender: snapshot.val().gender,
                faculty: snapshot.val().faculty
            });
              updateUsersDB(tel,newTime);
            }

        console.log('Daily is updating...');
        
        

    /*
    firebase.database().ref('dailyUsersRecords/'+ dayMonthYear +'/'+ tel).update({
      lastCheck: newDate,
      runningDistance: snapshot.val().totalDistance+1,
      totalTime: snapshot.val().totalTime+newTime,
      lastRunningTime: newTime
  });
*/

        }
        
     });
}



 /*    ----------------------------------------------------------------------
  *     ---------------------- 1 round update to USERS-db !! -----------------------
  *     ----------------------------------------------------------------------
  */ 

function updateUsersDB(id,newTime){
    console.log(" ** CALLED ==> updateUserDB("+id+","+newTime+"sec)");

    var userDB = firebase.database().ref('users/'+ id);
    userDB.once('value',function(snapshot){
    if(snapshot.val()==null){
        // Write User DB
        console.log('xx NO !! USERs DB xx');
    }else{              
        var clock = new Date();

        firebase.database().ref('users/' + snapshot.key).set({
        birthday: snapshot.val().birthday,
        displayName: snapshot.val().displayName,
        height: snapshot.val().height,
        gender: snapshot.val().gender,
        totalDistance: snapshot.val().totalDistance+1,
        totalTime: snapshot.val().totalTime+newTime,
        weight: snapshot.val().weight,
        faculty: snapshot.val().faculty
    });

      /*
          firebase.database().ref('users/' + id).update({
          totalDistance: snapshot.val().totalDistance+1,
          totalTime: snapshot.val().totalTime+newTime
          });
        }
        **/
      
      }
      });
}

var clock = new Date();
var month = clock.getUTCMonth()+1; //months from 1-12
var day = clock.getUTCDate();
var year = clock.getUTCFullYear();
var dayMonthYear = day+'d'+month+'m'+year+'y';
var newDate = clock.getTime();

var dailyTagsList = firebase.database().ref("dailyTagsMapUsers/"+dayMonthYear);
dailyTagsList.on('child_added', function(snapshot){
      //var data = snapshot.val();
     //console.log(data.runningDistance);
   // console.log(snapshot.key);
    setLocalTag(snapshot.key,snapshot.val());
/*
     var userData = {lastCheck:snapshot.val().lastCheck, lastRunningTime:snapshot.val().lastRunningTime, runningDistance:snapshot.val().runningDistance, runningTime:snapshot.val().runningTime, displayName:snapshot.val().displayName, gender:snapshot.val().gender, faculty:snapshot.val().faculty};
     localStorage.setItem(userID, JSON.stringify(userData));
*/

});
dailyTagsList.on('child_changed', function(snapshot){
    setLocalTag(snapshot.key,snapshot.val());

});

dailyTagsList.on('child_removed', function(snapshot){
  localStorage.removeItem(snapshot.key);
  console.log("Local Tag: "+snapshot.key+" DELETED !!");
//setLocalTag(snapshot.key,snapshot.val());

});


var dailyUsersList = firebase.database().ref("dailyUsersRecords/"+dayMonthYear);
dailyUsersList.on('child_added', function(snapshot){
      //var data = snapshot.val();
     //console.log(data.runningDistance);
   // console.log(snapshot.key);
    setLocalUser(snapshot.key,snapshot.val());
/*
     var userData = {lastCheck:snapshot.val().lastCheck, lastRunningTime:snapshot.val().lastRunningTime, runningDistance:snapshot.val().runningDistance, runningTime:snapshot.val().runningTime, displayName:snapshot.val().displayName, gender:snapshot.val().gender, faculty:snapshot.val().faculty};
     localStorage.setItem(userID, JSON.stringify(userData));
*/
  // Users FIREBASE DB called HERE ---->
  var userDB = firebase.database().ref('users/'+snapshot.key);
  //var height = 0;
  //var weight = 0;
  //var birthday = "";
  userDB.once('value',function(udb){
     var userInfo = localStorage.getItem(snapshot.key+'Info');
     if(userInfo==null){
       var userInfo = {weight:udb.val().weight , height:udb.val().height , gender:udb.val().gender , birthday:udb.val().birthday};
     localStorage.setItem(snapshot.key+'Info', JSON.stringify(userInfo));
   }
  });
  var userInfo = JSON.parse(localStorage.getItem(snapshot.key+'Info'));
  console.log('Local ADD (INFO) -> ID: '+snapshot.key+'Info');
  console.log('-------------------------');
  //console.log(userInfo);
  //height = userInfo.height;
  //weight = userInfo.weight;
  //birthday = userInfo.birthday;
  // --------------------------------------<
});
dailyUsersList.on('child_changed', function(snapshot){
    setLocalUser(snapshot.key,snapshot.val());

});

dailyUsersList.on('child_removed', function(snapshot){
  localStorage.removeItem(snapshot.key);
  console.log("Local Users: "+snapshot.key+" DELETED !!");
//setLocalTag(snapshot.key,snapshot.val());

});





function setLocalTag(key,data){
 // console.log(newDate);
  console.log("Activate Tag: "+key+" to userID: "+data.userID);
  console.log("------------------------------------------------");
  localStorage.setItem(key, data.userID);
  //console.log(data.runningDistance);
}



function setLocalUser(key,data){
  //console.log(newDate);
  var userData = {lastCheck:data.lastCheck, lastRunningTime:data.lastRunningTime, runningDistance:data.runningDistance, runningTime:data.runningTime, displayName:data.displayName, gender:data.gender, faculty:data.faculty};
  localStorage.setItem(key, JSON.stringify(userData));
  console.log("Local ADD (User) -> ID: "+key);
  //console.log(userData);
}


//