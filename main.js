
  try{
      var initialSS = sessionStorage.SpandanSessionValue;
    }
  catch(err){}

  function checkerBoi() {
    checkLoginState();
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

function checkLoginState() {
 FB.getLoginStatus(function(response) {
   statusChangeCallback(response);
 });

  function statusChangeCallback(response) {
   console.log('statusChangeCallback');
   if (response.status === 'connected') {
     // Logged into your app and Facebook.
     facebookMain();
      } else {
        // The person is not logged into your app or we are unable to tell.
      document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';
    }
  }
}

//Firebase
var database = firebase.database();
var spandanId;

function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('users/' + userId).set({
    fbid:userId,
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}

function writeEventData(userId, name, email, imageUrl) {
  console.log(spandanId);
  firebase.database().ref('spandanid/').set({
    SPId:spandanId+1
  });
}

function func(){
   var leadsRef = database.ref('spandanid');
   leadsRef.on('value', function(snapshot) {
     snapshot.forEach(function(childSnapshot) {
       spandanId = childSnapshot.val();
       console.log(spandanId);
    });
  });
}

function func2(){
   var leadsRef = database.ref('users');
   leadsRef.on('value', function(snapshot) {
     snapshot.forEach(function(childSnapshot) {
       var childData = childSnapshot.val();
       if (initialSS==childData['fbid']){
         var uid=childData['fbid'];
         var urlpic=childData['profile_picture'];
         var name=childData['username'];
         var email=childData['email'];
         console.log(childData);
         console.log(">>>>>>>>>>>>>>>>")
       }
       else{
         console.log("homee");
       }
    });
  });
}

 function displayContent(uid,urlpic,name,email) {
   document.getElementById('status').innerHTML =
     'Thanks for logging in, ' + name + '!<br>'+
     '<img src='+urlpic+' width=200vw><br>'+
     'Email:'+email+'<br>'
     'user id:'+uid+
     '<br>';

 }

function facebookMain() {
  firebase.auth().signInAnonymously().catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });

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
      displayContent(uid,urlpic,name,email);
    });
}
