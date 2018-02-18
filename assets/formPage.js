function checkerBoi(){
  if(sessionStorage.tokenEdit){
    eventHolder="";
    wsHolder="";
  }
  else if (sessionStorage.editProfile){
    initialSS=sessionStorage.SpandanSessionValue;
    checkFirebaseData();
  }
  else{
    window.location.href = "dashboard.html";
  }
}

function submit_spandan()
{
  writeUserData(document.getElementById('uid').value,
    document.getElementById('urlpic').value,
    document.getElementById('name').value,
    document.getElementById('email').value,
    document.getElementById('mobile').value,
    document.getElementById('college').value,
    document.getElementById('city').value,
    document.getElementById('year').value,
    document.getElementById('branch').value,
    document.getElementById('degree').value
  );
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

function facebookMain() {
    FB.api('/me','GET',{"fields":"id,name,picture.width(400).height(400),email,hometown"},
    function(response) {
      var uid=response.id;
      var urlpic=response.picture.data.url;
      var name=response.name;
      var email=response.email;
      sessionStorage.SpandanSessionValue=uid;
      readSPIDData();
      initialSS=uid;
      changeFormData(uid, urlpic, name, email);
    });
}

function changeFormData(uid, urlpic, name, email){
  document.getElementById('uid').value= uid;
  document.getElementById('urlpic').value= urlpic;
  document.getElementById('name').value= name;
  document.getElementById('email').value= email;
}

function readSPIDData(){
  var starRef = firebase.database().ref('spandanid/SPId');
  starRef.on('value', function(snapshot) {
  spandanId=snapshot.val();
  });
}

function writeUserData(userId, imageUrl, name, email, mobile, college, city, year, branch, degree) {
  firebase.database().ref('users/' + initialSS).update({
    spid: spandanId,
    fbid: userId,
    profile_picture : imageUrl,
    username: name,
    email: email,
    mobile: mobile,
    college: college,
    city: city,
    year: year,
    branch: branch,
    degree: degree,
    events: eventHolder,
    workshop: wsHolder
  });
  if(sessionStorage.tokenEdit){
  firebase.database().ref('spandanid/').update({
    SPId:spandanId+1
  });}
  sessionStorage.clear();
  sessionStorage.SpandanSessionValue=userId;
}

function editFormData(uid, urlpic, name, email, mobile,college,city,year,branch,degree){
  document.getElementById('uid').value= uid;
  document.getElementById('urlpic').value= urlpic;
  document.getElementById('name').value= name;
  document.getElementById('email').value= email;
  document.getElementById('mobile').value=mobile;
  document.getElementById('college').value=college;
  document.getElementById('city').value=city;
  document.getElementById('year').value=year;
  document.getElementById('branch').value=branch;
  document.getElementById('degree').value=degree;
}

function checkFirebaseData(){
  var leadsRef = database.ref('users/');
  leadsRef.on('value', function(snapshot) {
      if (snapshot.hasChild(initialSS)){
        var childData = snapshot.child(initialSS).val();
        spandanId=childData['spid'];
        eventHolder=childData['events'];
        wsHolder=childData['workshop'];
        var uid=childData['fbid'];
        var urlpic=childData['profile_picture'];
        editFormData(uid, urlpic, childData['username'],childData['email'],childData['mobile'],
                      childData['college'], childData['city'], childData['year'],
                    childData['branch'], childData['degree']);
      }
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
    if(sessionStorage.tokenEdit){
      checkLoginState();
    }
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
   var eventHolder;
   var wsHolder;
   var initialSS;
   checkerBoi();
