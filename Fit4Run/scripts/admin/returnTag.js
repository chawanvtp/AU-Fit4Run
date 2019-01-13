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
    document.getElementById("tagReturn").focus();

})


  /*    ----------------------------------------------------------------------
  *     ---------------------- Events TO-DO on LOAD !! -----------------------
  *     ----------------------------------------------------------------------
  */ 
  //var updateButton = document.getElementById("updateButton");
  //var tagID = document.getElementById("tagID-Box");
    //document.getElementById("tagID-Box")
   
    window.addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        
        //console.log(document.getElementById("tagReturn").value);

        
        
        returnButtonClicked(document.getElementById('tagReturn').value);
      }
    });
  

  // interval delay for 10 second(s)
  var delay = 1000*10;
  var clock = new Date();
  var month = clock.getUTCMonth() + 1; //months from 1-12
  var day = clock.getUTCDate();
  var year = clock.getUTCFullYear();
  var dayMonthYear = day+'d'+month+'m'+year+'y';
  var newDate = clock.getTime();
  console.log(dayMonthYear);
  
  function returnButtonClicked(tagId){
      //alert(tagId);
     // alert(tel+" - "+tagId);
     // console.log(" * activateButtonClicked !! ");
      if(tagId==""){alert("Empty TagID XXX "); return;}
    
      //var udbUsername = "";
      /*
    var userDB = firebase.database().ref('users/'+tel);
    userDB.once('value',function(udb){
        if(udb.val()==null){    alert("Wrong Telephone Number XXX"); return;}
        
        console.log(udb.val());
        deleteDailyTags(tel,tagId,dayMonthYear);
        //updateDailyRecords(tel,dayMonthYear,newDate,udb.val());
        //udbUsername = udb.val().username;
    });
    */
   // console.log("DBBB");
   deleteDailyTags(tagId,dayMonthYear);
    //document.getElementById("telReturn").value = ""; 
   
    
  }


  function remove(id) {
    var elem = document.getElementById(id);
    return elem.parentNode.removeChild(elem);
}

// Display TagList
var tagList = firebase.database().ref().child('dailyTagsMapUsers').child(dayMonthYear);

/*
tagList.once('value', function(snapshot){
  snapshot.forEach(function(item){
    var htmlMes = "<p>"+item.val().userID+"</p>";
    $("#tagList").append(htmlMes);
  });
});

*/

tagList.on('child_added', function(snapshot){
  console.log(snapshot.val().userID+" is using a Tag + ADDED");
  var userDB = firebase.database().ref('users/'+snapshot.val().userID);
  userDB.once('value',function(udb){
      var temp = udb.val().displayName+" : "+udb.val().totalDistance+" rounds";
      var htmlMes = "<p id="+snapshot.key+">"+snapshot.val().userID+" - "+temp+"</p>";
      $("#tagList").append(htmlMes);
  });
 // var htmlMes = "<p id="+snapshot.key+">"+snapshot.val().userID+"</p>";
  //$("#tagList").append(htmlMes);
});
tagList.on('child_changed', function(snapshot){
  console.log(snapshot.val().userID+" is using a Tag = CHANGED");
  //var target = document.getElementById(snapshot.key);
  document.getElementById(snapshot.key).innerHTML = snapshot.val().userID;
});
tagList.on('child_removed', function(snapshot){
  console.log(snapshot.val().userID+" has returned a TAG - REMOVED");
  $("#tagList").remove(snapshot.key);
});

/*
tagList.on('child_added', function(snapshot){
  
  snapshot.forEach(function(item){
    var a = item.val();
  console(a);
  });
  
  
 // console.log(snapshot.val());
  //var htmlMes = "<p id="+snapshot.key+">"+item.val().userID+"</p>";
  //$("#tagList").append(htmlMes);
  //$("#tagList").append()
});
tagList.on("child_CHANGED", function(snapshot){
  var elem = document.getElementById(snapshot.key);
  elem.innerHTML = snapshot.val().userID;
});
tagList.on("child_REMOVED", function(snapshot){
    remove(snapshot.key);
});
*/
  /**
   * Update Daily DB
   */ 
function deleteDailyTags(tagId,dayMonthYear){
  localStorage.removeItem(tagId);
  // var dailyTagDB = firebase.database().ref('daily/tags/'+dayMonthYear+'/'+ tagId);
  var dailyTagDB = firebase.database().ref('dailyTagsMapUsers/'+dayMonthYear+'/'+tagId);//.child("dailyTagsMapUsers").child(dayMonthYear).child(tagId);//
  dailyTagDB.once('value',function(snapshot){
      if(snapshot.val()!=null)
      {
        console.log(snapshot.val());
          //updateUsersDB(superSnapshot.val().id,newTime);
         // updateDailyDB(tel,tagId,dayMonthYear);
         localStorage.removeItem(snapshot.val().userID+'Info');
         dailyTagDB.remove(function(error) {
            alert(error ? "Failed XXX" : "Delete TAG Success !!");
          });
          
      }else{
         // firebase.database().ref().child('daily').child('tags').setValue(dayMonthYear);

         /*
          firebase.database().ref('dailyTagsMapUsers/'+ dayMonthYear +'/'+ tagId).set({
              userID: tel
          });

           console.log("* daily/tags - just created -> /dayMonth/Year!!");
*/          alert("Invalid Tag Number XXX");
        }

  });

  document.getElementById("tagReturn").value = ""; 

}


  /*    ----------------------------------------------------------------------------------------------------------
  *     ---------------------- TO Update Firebase - daily/records/dayMonthYear/(newData) ] -----------------------
  *     ----------------------------------------------------------------------------------------------------------
  */ 
/*
  function updateDailyRecords(tel,dayMonthYear,newDate,udb){
    
   // console.log(udb);
    
        var dailyTagDB = firebase.database().ref('dailyUsersRecords/'+dayMonthYear+'/'+ tel);
        dailyTagDB.once('value',function(snapshot){
            if(snapshot.val()!=null)
            {
                firebase.database().ref('dailyUsersRecords/'+ dayMonthYear +'/'+ tel).set({
                    lastCheck: newDate,
                    lastRunningTime: 0,
                    runningDistance: snapshot.val().runningDistance,
                    runningTime: snapshot.val().runningTime,
                    displayName: udb.displayName,
                    gender: udb.gender,
                    faculty: udb.faculty
                });    
            }else{
               // firebase.database().ref().child('daily').child('tags').setValue(dayMonthYear);
               firebase.database().ref('dailyUsersRecords/'+ dayMonthYear +'/'+ tel).set({
                lastCheck: newDate,
                lastRunningTime: 0,
                runningDistance: -1,
                runningTime: 0,
                displayName: udb.displayName,
                gender: udb.gender,
                faculty: udb.faculty
            });
                 console.log("* dailyUsersRecords - just created -> /dayMonthYear/(new record) !!");
      
              }
      
        });

  }
*/
  /*    ----------------------------------------------------------------------
  *     ---------------------- XXXXXX !! -----------------------
  *     ----------------------------------------------------------------------
  */ 
