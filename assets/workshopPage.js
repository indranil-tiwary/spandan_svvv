
function checkEvent(eName){
  if(sessionStorage.SpandanSessionValue){
    initialSS=sessionStorage.SpandanSessionValue;
    readFirebaseData();
    var eventName;
    var eventFBName;
  if(eName==1){
    var eventFBName="culinary"
    writeUserEventData(eventFBName);
    jQuery("#modal-1").removeClass("md-show");
  }
  else if (eName==3) {
    var eventFBName="blogging"
    writeUserEventData(eventFBName);
    jQuery("#modal-3").removeClass("md-show");
  }
  else if (eName==4) {
    var eventFBName="photography"
    writeUserEventData(eventFBName);
    jQuery("#modal-4").removeClass("md-show");
  }
  else if (eName==5) {
    var eventFBName="filmtv"
    writeUserEventData(eventFBName);
    jQuery("#modal-5").removeClass("md-show");
  }
  else if (eName==6) {
    var eventFBName="finearts"
    writeUserEventData(eventFBName);
    jQuery("#modal-6").removeClass("md-show");
  }
}
else{
  fb_login();
  }
}

function writeUserEventData(eventFBName){
  SPevents.push(eventFBName);
  firebase.database().ref('workshops/' + eventFBName+'/'+initialSS).update({
    spid:spandanId
  });
  firebase.database().ref('users/' + initialSS).update({
    workshop: SPevents
  });
  userFeedback();
}

function userFeedback(){
  var arrayLength = SPevents.length;
  for (var i = 0; i < arrayLength; i++) {
    eventCompleted(SPevents[i]);
    }
}
var changerVar='<a onclick="" class="learn-more-btn btn-effect wow animated fadeIn" data-wow-duration="0.5s" data-wow-delay="1.5s">Registered<i class="fa fa-check"></i></a>';
function eventCompleted(marker){
  if(marker=="culinary"){
    document.getElementById("event-1").innerHTML=changerVar;
  }
  else if (marker=="blogging") {
    document.getElementById("event-3").innerHTML=changerVar;
  }
  else if (marker=="photography") {
    document.getElementById("event-4").innerHTML=changerVar;
  }
  else if (marker=="filmtv") {
    document.getElementById("event-5").innerHTML=changerVar;
  }
  else if (marker=="finearts") {
    document.getElementById("event-6").innerHTML=changerVar;
  }
}

function readFirebaseData(){
  var leadsRef = database.ref('users/');
  leadsRef.on('value', function(snapshot) {
    if (snapshot.hasChild(initialSS)){
      var childData = snapshot.child(initialSS).val();
        spandanId=childData['spid'];
        SPevents=childData['workshop'];
        if(SPevents==""){
          SPevents= SPevents.split("");
        }
        userFeedback();
      }
 },function(error){console.log(error);});
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
     // Logged into your app and Facebook.
     facebookMain();
      } else {
        // The person is not logged into your app or we are unable to tell.
      //document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';
    }
  }
}

function checkFirebaseData(){
  var leadsRef = database.ref('users/');
  leadsRef.once('value', function(snapshot) {
    if (snapshot.hasChild(initialSS)){
        sessionStorage.SpandanSessionValue=initialSS;
        window.location.href = "workshop.html";
      }
      else{
        checkerSession();
      }
 });
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
   initialSS=sessionStorage.SpandanSessionValue;
   readFirebaseData();
