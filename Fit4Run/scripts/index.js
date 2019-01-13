

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

  /*    ------------------------------------------------------------------
  *     ---------------------- Records DB Section !! -----------------------
  *     ------------------------------------------------------------------
  */    

  var clock = new Date();
  var month = clock.getUTCMonth() + 1; //months from 1-12
  var day = clock.getUTCDate();
  var year = clock.getUTCFullYear();
  var dayMonthYear = day+'d'+month+'m'+year+'y';

  var recordsRef = database.ref('dailyUsersRecords/'+dayMonthYear).orderByChild('round').limitToLast(10);
  var limit = 10;
  var total = limit;

  function rewriteTable(dbRef, tableName, rankRange){
     // console.log(dbRef);

  dbRef.once('value', function(snapshot){
    
    limit = snapshot.numChildren();
    if(limit>10){
        limit = 10;
    }
   
    snapshot.forEach(function(item){
    
          
      var recTab = document.getElementById(tableName);
    //    if(tableName=='users-table'){
            console.log("xxx USERs table xxx");
            recTab.rows[rankRange].cells[1].innerHTML = item.val().displayName;
    //    }else{
    //       recTab.rows[rankRange].cells[1].innerHTML = item.val().id;
    //    }
            if(tableName=="daily-table"){    
            recTab.rows[rankRange].cells[2].innerHTML = item.val().runningDistance;
            recTab.rows[rankRange].cells[3].innerHTML = parseInt(item.val().runningTime/item.val().runningDistance);
            }else if(tableName=="users-table"){
                recTab.rows[rankRange].cells[2].innerHTML = item.val().totalDistance;
                recTab.rows[rankRange].cells[3].innerHTML = parseInt(item.val().totalTime/item.val().totalDistance);
            }
            
    rankRange--;
    console.log("REWRITE !!!");
    console.log(rankRange);
       // if(total<1){    total = limit};

        
    });

   // console.log("AAA");
    limit = snapshot.numChildren();
  });

}

  recordsRef.on('child_added', function(snapshot){
     
        console.log("recordsRef - on - child_ADDED");
        rewriteTable(recordsRef, "daily-table", 10);
        
  });

  

  recordsRef.on('child_changed', function(snapshot){
      
        console.log("child_CHANGED");
        rewriteTable(recordsRef, "daily-table", 10);
        console.log(snapshot.val());
        var rec = snapshot.val();
        var announceMessage = rec.displayName + ' take ' + rec.lastRunningTime + ' for round : '+ rec.runningDistance +' - Today Avg.time = '+ parseInt(rec.runningTime/rec.runningDistance);
        document.getElementById('announce-bar').innerHTML = announceMessage;
      });
      recordsRef.on('child_removed', function(snapshot){
            console.log("child_REMOVED");
            rewriteTable(recordsRef, "daily-table", 10);
          });

 

  var usersRef = database.ref().child('users').orderByChild('round').limitToLast(10);
  
 
  usersRef.on('child_added', function(snapshot){
    console.log("child_ADDED");
    rewriteTable(usersRef, "users-table", 10);
  });

  usersRef.on('child_changed', function(snapshot){
      
        console.log("child_CHANGED");
        rewriteTable(usersRef, "users-table", 10);
      });
      usersRef.on('child_removed', function(snapshot){
            console.log("child_REMOVED");
            rewriteTable(usersRef, "users-table", 10);
          });


  


