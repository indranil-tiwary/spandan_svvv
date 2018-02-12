
function checkerBoi(){

  if(sessionStorage.SpandanSessionValue){
    initialSS=sessionStorage.SpandanSessionValue;
    checkFirebaseData();
  }
  else{
    dashChange();
    fb_login();
  }
}

function dashChange(){
  document.getElementById("mainChange").innerHTML = '<a class="fb" href="#" onclick="fb_login();"><i class="fa fa-facebook"></i><h1>connect via facebook</h1></a>';
}

function editProfileFun(){
  sessionStorage.editProfile=true;
  window.location.href="form.html";
}

function updateEventList(){
  var arrayLength = SPevents.length;
  var replaceName="";
  if(arrayLength==0){
      replaceName="NO EVENTS REGISTERED";
      jQuery("#listEvents").append('<li><h2>'+replaceName+'</h2></li>');
  }
  for (var i = 0; i < arrayLength; i++) {
    if(SPevents[i]=="taal"){
      replaceName="Taal - The Dance Battle";
    }
    else if (SPevents[i]=="swaranjali") {
      replaceName="Swaranjali - The Singing Face-off";
    }
    else if (SPevents[i]=="ambriti") {
      replaceName="Ambriti - The Fashion Show";
    }
    else if (SPevents[i]=="navyata") {
      replaceName="Navyata - Best Out Of Waste";
    }
    else if (SPevents[i]=="mime") {
      replaceName="Mime & Nukkad Naatak";
    }
    else if (SPevents[i]=="kavyanjali") {
      replaceName="Kavyanjali - Poetry Competition";
    }
    else if (SPevents[i]=="firelesscooking") {
      replaceName="Fireless Cooking";
    }
    else if (SPevents[i]=="doodle") {
      replaceName="Doodle & Graffiti";
    }
    else if (SPevents[i]=="rj") {
      replaceName="Radio Jockeying";
    }
    else if (SPevents[i]=="kandal") {
      replaceName="Kandal - Collage Making";
    }
    else if (SPevents[i]=="facepaint") {
      replaceName="Ukti - Face Painting";
    }
    else if (SPevents[i]=="rachnakriti") {
      replaceName="Rachnakriti - Card Making";
    }
    else if (SPevents[i]=="chitrang") {
      replaceName="Chitrang - Rangoli Making";
    }
    else if (SPevents[i]=="blog") {
      replaceName="Bloggin/Vlogging";
    }
    else if (SPevents[i]=="editor") {
      replaceName="The Editor - Make Your Own Magazine";
    }
    else if (SPevents[i]=="finearts") {
      replaceName="Fine Arts Marathon";
    }
    else if (SPevents[i]=="shortfilm") {
      replaceName="Short Film/Documentary Filmmaking";
    }
    else if (SPevents[i]=="mrmsspandan") {
      replaceName="Mr. & Ms. Spandan";
    }
    else if (SPevents[i]=="treasurehunt") {
      replaceName="Treasure Hunt";
    }
    jQuery("#listEvents").append('<li><h2>'+replaceName+'</h2></li>');
  }
}
function updateWorkshopList(){
  var arrayLength = SPws.length;
  var replaceName="";
  if(arrayLength==0){
      replaceName="NO WORKSHOP REGISTERED";
      jQuery("#listWorkshops").append('<li><h2>'+replaceName+'</h2></li>');
  }
  for (var i = 0; i < arrayLength; i++) {
    if(SPws[i]=="culinary"){
      replaceName="Culinary Arts";
    }
    else if (SPws[i]=="skateboarding") {
      replaceName="Skateboarding";
    }
    else if (SPws[i]=="blogging") {
      replaceName="Blogging/Vlogging";
    }
    else if (SPws[i]=="photography") {
      replaceName="Photography";
    }
    else if (SPws[i]=="filmtv") {
      replaceName="Film/TV/Play Writing ";
    }
    else if (SPws[i]=="finearts") {
      replaceName="Fine Arts";
    }
    jQuery("#listWorkshops").append('<li><h2>'+replaceName+'</h2></li>');
  }
}

function updateDisplay(urlpic, name, spid, email, college, city){
  document.getElementById("mainChange").innerHTML = '<img id="changeImg" style="width:20vh;" \
  src="" class="img-circle" alt="spandan profile pic">\
  <h1 style="padding-top:10px;text-transform: uppercase;" id="changeName">Your Name</h1>\
  <h2 style="color:#fff" id="changeSPId">SPID-here</h2>\
  <h2 style="color:#fff;font-weight:400;text-transform: lowercase;letter-spacing: 1px;" id="changeEmail">your email</h2>\
  <h2 style="color:#fff;font-weight:400;text-transform: capitalize;letter-spacing: 1px;" id="changeColl">your college</h2>\
  <a href="#" onclick="editProfileFun();" class="learn-more-btn btn-effect wow animated fadeIn">Edit Profile</a>';
  document.getElementById("changeImg").src = urlpic;
  document.getElementById("changeName").innerHTML = name;
  document.getElementById("changeSPId").innerHTML = "SPID-"+spid;
  document.getElementById("changeEmail").innerHTML = email;
  document.getElementById("changeColl").innerHTML = college+', '+city;
}

function checkFirebaseData(){
  var leadsRef = database.ref('users');
  leadsRef.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      if (initialSS==childData['fbid']){
        sessionStorage.SpandanSessionValue=childData['fbid'];
        spandanId=childData['spid'];
        var urlpic=childData['profile_picture'];
        SPevents=childData['events'];
        SPws=childData['workshop'];
        updateDisplay(urlpic, childData['username'], spandanId, childData['email'], childData['college'], childData['city']);
        updateEventList();
        updateWorkshopList();
      }
   });
 },function(error){console.log(error);});
}

function logoutMain(){
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
   function statusChangeCallback(response) {
    if (response.status === 'connected') {
      FB.logout(function(response) {});
      sessionStorage.clear();
      window.location.href="index.html";
       }
    else{
      sessionStorage.clear();
      window.location.href="index.html";
      }
   }

}

function unregWork(){
  var arrayLength = SPws.length;
  var replaceName="";
  if(arrayLength==0){
      replaceName="NO WORKSHOP REGISTERED";
      jQuery("#listWorkshops").append('<li><h2>'+replaceName+'</h2></li>');
  }
  else{
    document.getElementById("listWorkshops").innerHTML ="";
  for (var i = 0; i < arrayLength; i++) {
    if(SPws[i]=="culinary"){
      replaceName="Culinary Arts";
    }
    else if (SPws[i]=="skateboarding") {
      replaceName="Skateboarding";
    }
    else if (SPws[i]=="blogging") {
      replaceName="Blogging/Vlogging";
    }
    else if (SPws[i]=="photography") {
      replaceName="Photography";
    }
    else if (SPws[i]=="filmtv") {
      replaceName="Film/TV/Play Writing ";
    }
    else if (SPws[i]=="finearts") {
      replaceName="Fine Arts";
    }
    jQuery("#listWorkshops").append('<li><h2 style="padding-bottom:10px;">'+replaceName+'<input type="checkbox" style="width: 20px;height: 20px;cursor: pointer;" class="workCheck" value="'+SPws[i]+'"></h2></li>');
  }
  document.getElementById("butUnregWorkshop").innerHTML ='<a href="#/" onclick="confirmedUnregWork();" class="learn-more-btn btn-effect wow animated fadeIn">Confirm Unregister</a>';
}
}

function confirmedUnregWork(){
  var checks = document.getElementsByClassName('workCheck');
  for ( i = 0; i < checks.length; i++) {
    if ( checks[i].checked === true ) {
        removeWorkshop(checks[i].value);
      }
    }
}
function removeWorkshop(wName){
  var leadsRef = database.ref('users');
  leadsRef.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      if (initialSS==childData['fbid']){
        SPws=childData['workshop'];
        var index = SPws.indexOf(wName);
        if (index !== -1){ SPws.splice(index, 1);}
        if(SPws.length==0){SPws="";}
        database.ref('users/' + initialSS).update({workshop: SPws});
        updateWorkshopList();
      }
   });
 },function(error){console.log(error);});
 database.ref('workshops/'+wName+'/'+initialSS).remove();
 document.getElementById("listWorkshops").innerHTML ="";
 document.getElementById("butUnregWorkshop").innerHTML ='<a href="#/" onclick="unregWork();" class="learn-more-btn btn-effect wow animated fadeIn">Unregister Workshops?</a>';
}

function firebasekaAuth(){
  firebase.auth().signInAnonymously().catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}

function fb_login(){
     FB.login( function(response) {checkLoginState();}, { scope: 'public_profile,email' } );
 }
function checkLoginState() {
 FB.getLoginStatus(function(response) {
   statusChangeCallback(response);
 });
  function statusChangeCallback(response) {
   if (response.status === 'connected') {
     facebookMain();
      }
      else {
    }
  }
}

function checkerSession(){
  if(sessionStorage.SpandanSessionValue){}
  else{
     sessionStorage.tokenEdit=true;
     window.location.href = "form.html";
  }
}

function facebookMain() {
    FB.api('/me','GET',{"fields":"id,name,picture.width(400).height(400),email,hometown"},
    function(response) {
      var uid=response.id;
      initialSS=uid;
      checkFirebaseData();
      setTimeout(function() {checkerSession();}, 3000);
    });
}


// Initialize Firebase
var config = {
  apiKey: "AIzaSyAiOppk8kOawDGEp5QJ8vk4y5mOFwRKqzU",
  authDomain: "spandan-3f863.firebaseapp.com",
  databaseURL: "https://spandan-3f863.firebaseio.com",
  projectId: "spandan-3f863",
  storageBucket: "spandan-3f863.appspot.com",
  messagingSenderId: "285489957582"
};
firebase.initializeApp(config);

//FACEBOOK
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1771257743178792',
      cookie     : true,
      xfbml      : true,
      version    : 'v2.11'
    });
    FB.AppEvents.logPageView();
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

   //ENDS INITIALIZATION
   firebasekaAuth();
   var database = firebase.database();
   var spandanId;
   var initialSS;
   var SPevents;
   var SPws;
   checkerBoi();
