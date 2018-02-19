function checkerBoi(){
  if(sessionStorage.SpandanSessionValue){
    initialSS=sessionStorage.SpandanSessionValue;
    checkFirebaseData();
  }
  else{
    window.location.href="./index.html";
  }
}

function checkEvent(eName){
  if(sessionStorage.SpandanSessionValue){
    initialSS=sessionStorage.SpandanSessionValue;
    readFirebaseData();
    var eventName;
    var eventFBName;
  if(eName==1){
    var eventFBName="taal"
    writeUserEventData(eventFBName);
    jQuery("#modal-1").removeClass("md-show");
  }
  else if (eName==2) {
    var eventFBName="swaranjali"
    writeUserEventData(eventFBName);
    jQuery("#modal-2").removeClass("md-show");
  }
  else if (eName==3) {
    var eventFBName="ambriti"
    writeUserEventData(eventFBName);
    jQuery("#modal-3").removeClass("md-show");
  }
  else if (eName==4) {
    var eventFBName="navyata"
    writeUserEventData(eventFBName);
    jQuery("#modal-4").removeClass("md-show");
  }
  else if (eName==5) {
    var eventFBName="mime"
    writeUserEventData(eventFBName);
    jQuery("#modal-5").removeClass("md-show");
  }
  else if (eName==6) {
    var eventFBName="kavyanjali"
    writeUserEventData(eventFBName);
    jQuery("#modal-6").removeClass("md-show");
  }
  else if (eName==7) {
    var eventFBName="firelesscooking"
    writeUserEventData(eventFBName);
    jQuery("#modal-7").removeClass("md-show");
  }
  else if (eName==8) {
    var eventFBName="doodle"
    writeUserEventData(eventFBName);
    jQuery("#modal-8").removeClass("md-show");
  }
  else if (eName==9) {
    var eventFBName="rj"
    writeUserEventData(eventFBName);
    jQuery("#modal-9").removeClass("md-show");
  }
  else if (eName==10) {
    var eventFBName="kandal"
    writeUserEventData(eventFBName);
    jQuery("#modal-10").removeClass("md-show");
  }
  else if (eName==11) {
    var eventFBName="facepaint"
    writeUserEventData(eventFBName);
    jQuery("#modal-11").removeClass("md-show");
  }
  else if (eName==12) {
    var eventFBName="rachnakriti"
    writeUserEventData(eventFBName);
    jQuery("#modal-12").removeClass("md-show");
  }
  else if (eName==13) {
    var eventFBName="chitrang"
    writeUserEventData(eventFBName);
    jQuery("#modal-13").removeClass("md-show");
  }
  else if (eName==14) {
    var eventFBName="blog"
    writeUserEventData(eventFBName);
    jQuery("#modal-14").removeClass("md-show");
  }
  else if (eName==15) {
    var eventFBName="editor"
    writeUserEventData(eventFBName);
    jQuery("#modal-15").removeClass("md-show");
  }
  else if (eName==16) {
    var eventFBName="finearts"
    writeUserEventData(eventFBName);
    jQuery("#modal-16").removeClass("md-show");
  }
  else if (eName==17) {
    var eventFBName="shortfilm"
    writeUserEventData(eventFBName);
    jQuery("#modal-17").removeClass("md-show");
  }
  else if (eName==18) {
    var eventFBName="mrmsspandan"
    writeUserEventData(eventFBName);
    jQuery("#modal-18").removeClass("md-show");
  }
  else if (eName==19) {
    var eventFBName="treasurehunt"
    writeUserEventData(eventFBName);
    jQuery("#modal-19").removeClass("md-show");
  }
}
else{
  fb_login();
  }
}

function writeUserEventData(eventFBName){
  SPevents.push(eventFBName);
  firebase.database().ref('events/' + eventFBName+'/'+initialSS).update({
    spid:spandanId
  });
  firebase.database().ref('users/' + initialSS).update({
    events: SPevents
  });
  userFeedback();
}
var changerVar='<a onclick="" class="learn-more-btn btn-effect wow animated fadeIn" data-wow-duration="0.5s" data-wow-delay="1.5s">Registered<i class="fa fa-check"></i></a>';
function userFeedback(){
  var arrayLength = SPevents.length;
  for (var i = 0; i < arrayLength; i++) {
    if (SPevents[i]=="facepaint") {
      document.getElementById("event-11").innerHTML=changerVar;
      }
    }
}

function readFirebaseData(){
  var leadsRef = database.ref('users/');
  leadsRef.once('value', function(snapshot) {
    if (snapshot.hasChild(initialSS)){
      var childData = snapshot.child(initialSS).val();
        spandanId=childData['spid'];
        SPevents=childData['events'];
        if(SPevents==""){
          SPevents= SPevents.split("");
        }
        userFeedback();
      }
      else{
        window.location.href="./";
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
   console.log(response);
 });
  function statusChangeCallback(response) {
   if (response.status === 'connected') {
     facebookMain();
      } else {
    }
  }
}

function checkFirebaseData(){
  var leadsRef = database.ref('users/');
  leadsRef.once('value', function(snapshot) {
    if (snapshot.hasChild(initialSS)){
        sessionStorage.SpandanSessionValue=initialSS;
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
     window.location.href = "../form.html";
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
   checkerBoi();
   readFirebaseData();
