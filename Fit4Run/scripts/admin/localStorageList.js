for (var i = 0; i < localStorage.length; i++){
    // do something with localStorage.getItem(localStorage.key(i));
    var data = localStorage.getItem(localStorage.key(i));
    console.log(data);
    $("#localStorage-div").append(data+"<br>");
}