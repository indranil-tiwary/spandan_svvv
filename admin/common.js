
function logoutMain(){
  sessionStorage.clear();
  window.location.href="../";
}

function checkerBoi(){
  if(sessionStorage.SpandanSessionValue){
    spandanId=sessionStorage.SpandanIDValue;
    for(var i=0;i<allowedSPID.length;i++){
      if(allowedSPID[i]==spandanId){
        var ucanstay=true;
      }
    }
    if(ucanstay){customBoi();}
    else{
      window.location.href="http://spandan.svvv.edu.in";
    }
  }
  else{
    window.location.href="http://spandan.svvv.edu.in";
  }
}

function firebasekaAuth(){
  firebase.auth().signInAnonymously().catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
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
firebasekaAuth();
var database = firebase.database();
var allowedSPID=[99999,99119,99120,99116,99123,99141];
var spandanId;
checkerBoi();
