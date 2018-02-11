
function checkerBoi(){

  if(sessionStorage.SpandanSessionValue){
    console.log("session h yaha");
    initialSS=sessionStorage.SpandanSessionValue;
    checkFirebaseData();
  }
  else{
    dashChange();
    console.log("no value found");
    fb_login();
  }
}

function dashChange(){
  document.getElementById("mainChange").innerHTML = '<a class="fb" href="#" onclick="fb_login();"><i class="fa fa-facebook"></i><h1>connect via facebook</h1></a>';
}

function updateDisplay(urlpic, name, spid, email){
  document.getElementById("mainChange").innerHTML = '<img id="changeImg" style="width:20vh;" src="" class="img-circle" alt="spandan profile"><h1 id="changeName">Aakash Mehta</h1><h2 id="changeSPId">SP-0018101</h2><h2 id="changeEmail">abcd</h2><a href="#" class="learn-more-btn btn-effect wow animated fadeIn">Edit Profile</a>';
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
      console.log(childData['fbid']);
      if (initialSS==childData['fbid']){
        var spid=childData['spid'];
        var urlpic=childData['profile_picture'];
        var name=childData['username'];
        var email=childData['email'];
        updateDisplay(urlpic, name, spid, email);
      }
      else{
        console.log(">>>>>>>>>>>>>>>>");
      }
   });
 });
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
     FB.login( function(response) {}, { scope: 'public_profile,email' } );
     checkLoginState();
 }

function checkLoginState() {
 FB.getLoginStatus(function(response) {
   statusChangeCallback(response);
   console.log(response);
 });
  function statusChangeCallback(response) {
   if (response.status === 'connected') {
     // Logged into your app and Facebook.
     facebookMain();
      } else {
        console.log("Please log into Facebook");
        // The person is not logged into your app or we are unable to tell.
      //document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';
    }
  }
}

function facebookMain() {
    firebasekaAuth();
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me','GET',{"fields":"id,name,picture.width(400).height(400),email,hometown"},
    function(response) {
      console.log('Successful login for: ' + response.name);
      var uid=response.id;
      var urlpic=response.picture.data.url;
      var name=response.name;
      var email=response.email;
      sessionStorage.SpandanSessionValue=uid;
      console.log(sessionStorage.SpandanSessionValue);
      window.location.href = "dashboard.html";
      //window.open("localhost:8000/dashboard.html", "_self")
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
   var database = firebase.database();
   var spandanId;
   var initialSS;
checkerBoi();
