

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

  var queue = 1;
  var roundToday = 0;
  //var runnerAllday = 0;

  /*    ------------------------------------------------------------------
  *     ---------------------- Records DB Section !! -----------------------
  *     ------------------------------------------------------------------
  */    

  var clock = new Date();
  var month = clock.getUTCMonth() + 1; //months from 1-12
  var day = clock.getUTCDate();
  var year = clock.getUTCFullYear();
  var dayMonthYear = day+'d'+month+'m'+year+'y';

  var recordsRef = database.ref('dailyUsersRecords/'+dayMonthYear).orderByChild('runningDistance').limitToLast(10);
  var limit = 10;
  var total = limit;

  /*
  var todayRec = database.ref('dailyUsersRecords/'+dayMonthYear);
  todayRec.once('value',function(snapshot){
    //roundToday = snapshot.numChildren();
    snapshot.forEach(function(item){
      roundToday += item.val().runningDistance;
    });
  });
*/
/*

$("#rankNav").on('click', function() {
  alert("inside onclick");
  window.location = "http://www.google.com";
});
*/
/*
  function indexClickRanking(){

    var activityLogsRef = firebase.database().ref('activityLogs/indexClickRanking/'+dayMonthYear);
    activityLogsRef.once('value',function(data){
      if(data.val()==null){
        firebase.database().ref('activityLogs/indexClickRanking/'+dayMonthYear).set({
          visitor: 1
        });
      }else{
        firebase.database().ref('activityLogs/indexClickRanking/'+dayMonthYear).set({
          visitor: data.val().visitor+1
        });
      }
      
    });
      alert("Ranking Click");
      return false;
  }
*/


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
            //console.log("xxx "+tableName+" table xxx");
            recTab.rows[rankRange].cells[1].innerHTML = item.val().displayName;
    //    }else{
    //       recTab.rows[rankRange].cells[1].innerHTML = item.val().id;
    //    }
            if(tableName=="daily-table"){    
            recTab.rows[rankRange].cells[2].innerHTML = item.val().runningDistance;
            //recTab.rows[rankRange].cells[3].innerHTML = parseInt((item.val().runningTime/item.val().runningDistance)/60)+':'+parseInt((item.val().runningTime/item.val().runningDistance)%60)+' min';
            recTab.rows[rankRange].cells[3].innerHTML = parseInt(item.val().runningTime/60);//+'.'+parseInt(item.val().runningTime%60);
            }else if(tableName=="users-table"){
                recTab.rows[rankRange].cells[2].innerHTML = item.val().totalDistance;
                //recTab.rows[rankRange].cells[3].innerHTML = parseInt((item.val().totalTime/item.val().totalDistance)/60)+':'+parseInt((item.val().totalTime/item.val().totalDistance)%60)+' min';
                recTab.rows[rankRange].cells[3].innerHTML = parseInt(item.val().totalTime/60);//+'.'+parseInt(item.val().totalTime%60);
            }
            
    rankRange--;
    //console.log("REWRITE !!!");
    //console.log(rankRange);
       // if(total<1){    total = limit};

        
    });

   // console.log("AAA");
    limit = snapshot.numChildren();
  });

}



  recordsRef.on('child_added', function(snapshot){
     
        //console.log("recordsRef - on - child_ADDED");
        rewriteTable(recordsRef, "daily-table", 10);
        
  });

  //var am = runner+" : Runners TODAY.";
  //document.getElementById("indexBarText").innerHTML = am;


  recordsRef.on('child_changed', function(snapshot){
      
       // console.log("child_CHANGED");
        rewriteTable(recordsRef, "daily-table", 10);
      });
      recordsRef.on('child_removed', function(snapshot){
            //console.log("child_REMOVED");
            rewriteTable(recordsRef, "daily-table", 10);
          });

 

  var totalRound = 0;
  var usersRef = database.ref().child('users').orderByChild('totalDistance').limitToLast(10);
  var usersDB = database.ref().child('users');
  usersDB.once('value', function(snapshot){

    snapshot.forEach(function(item){
      totalRound += item.val().totalDistance;
    });

      var announceMessage = "Runners - All : "+snapshot.numChildren()+" | ";
      var announceMessage2 = " reached "+totalRound+" rounds "; 
      document.getElementById("indexBarText1").innerHTML = announceMessage + announceMessage2;
      //document.getElementById("indexBarText2").innerHTML = announceMessage2;
  });
 
  usersRef.on('child_added', function(snapshot){
    //console.log("child_ADDED");
    rewriteTable(usersRef, "users-table", 10);
  });

  usersRef.on('child_changed', function(snapshot){
      
       // console.log("child_CHANGED");
        rewriteTable(usersRef, "users-table", 10);
      });
      usersRef.on('child_removed', function(snapshot){
           // console.log("child_REMOVED");
            rewriteTable(usersRef, "users-table", 10);
          });


  

          

          

