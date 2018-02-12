
function checkerBoi(){

  if(sessionStorage.SpandanSessionValue){
    console.log("session h yaha"+sessionStorage.SpandanSessionValue);
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

function updateEventList(){
  var arrayLength = SPevents.length;
  var replaceName="";
  for (var i = 0; i < arrayLength; i++) {
    if(SPevents[i]=="taal"){
      replaceName="Taal - The Dance Competition";
    }
    else if (SPevents[i]=="swaranjali") {
      replaceName="Swaranjali - The Singing Competition";
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
    jQuery("#listEvents").append('<li><h1>'+replaceName+'</h1></li>');
  }
}

function updateDisplay(urlpic, name, spid, email){
  document.getElementById("mainChange").innerHTML = '<img id="changeImg" style="width:20vh;" src="" class="img-circle" alt="spandan profile"><h1 id="changeName">Your Name</h1><h2 style="color:#fff" id="changeSPId">SPID-here</h2><h2 style="color:#fff;font-weight:400;" id="changeEmail">your email</h2><a href="#" class="learn-more-btn btn-effect wow animated fadeIn">Edit Profile</a>';
  console.log("change wala");
  document.getElementById("changeImg").src = urlpic;
  document.getElementById("changeName").innerHTML = name;
  document.getElementById("changeSPId").innerHTML = "SPID-"+spid;
  document.getElementById("changeEmail").innerHTML = email;

}

function checkFirebaseData(){
  var leadsRef = database.ref('users');
  leadsRef.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      if (initialSS==childData['fbid']){
        sessionStorage.SpandanSessionValue=childData['fbid'];
        spandanId=childData['spid'];
        var urlpic=childData['profile_picture'];
        var name=childData['username'];
        var email=childData['email'];
        SPevents=childData['events'];
        updateDisplay(urlpic, name, spandanId, email);
        updateEventList();
      }
   });
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
      }
      else {
        console.log("Please log into Facebook");
    }
  }
}

function checkerSession(){
  if(sessionStorage.SpandanSessionValue){}
  else{
     console.log("form pe ja");
     sessionStorage.tokenEdit=true;
     window.location.href = "form.html";
  }
}

function facebookMain() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me','GET',{"fields":"id,name,picture.width(400).height(400),email,hometown"},
    function(response) {
      console.log('Successful login for: ' + response.name);
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
   checkerBoi();
