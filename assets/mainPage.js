function checkerBoi(){
  if(sessionStorage.SpandanSessionValue){
    window.location.href = "dashboard.html";
  }
  else{
    fb_login();
  }
}

function firebasekaAuth(){
  firebase.auth().signInAnonymously().catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
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
    else {}
  }
}
function checkFirebaseData(){
  var lRef = database.ref('users/');
  lRef.once('value', function(snapshot) {
      if(snapshot.hasChild(initialSS)){
          var childData = snapshot.child(initialSS).val();
          sessionStorage.SpandanSessionValue=initialSS;
          sessionStorage.SpandanIDValue=childData['spid'];
          window.location.href = "dashboard.html";
      }
      else{
        checkerSession();
      }
}, function(error){console.log(error);});
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
      initialSS=response.id;
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
   $(document).ready(function() {
     if(sessionStorage.SpandanSessionValue){
       document.getElementById("profileButton").innerHTML="Profile";
     }
  });
