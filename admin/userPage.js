var childData;
var urlpic;
function checkFirebaseData(){
  var leadsRef = database.ref('users');
  leadsRef.on('value', function(snapshot) {
    document.getElementById('userTable').innerHTML='<thead><tr><th>SP-ID</th><th>Name</th><th>Mobile Number</th><th>E Mail</th><th>College Name</th><th>Branch</th><th>Year</th><th>Degree</th></tr></thead>';
    snapshot.forEach(function(childSnapshot) {
        childData = childSnapshot.val();
        urlpic=childData['profile_picture'];
        jQuery("#userTable").append('<tbody><tr>\
            <td>'+childData['spid']+'</td>\
            <td><a href="'+urlpic+'" target="_blank">'+childData['username']+'</a></td>\
            <td>'+childData['mobile']+'</td>\
            <td>'+childData['email']+'</td>\
            <td>'+childData['college']+'</td>\
            <td>'+childData['branch']+'</td>\
            <td>'+childData['year']+'</td>\
            <td>'+childData['degree']+'</td>\
            </tr></tbody>');
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
var spandanId;
var initialSS;
checkFirebaseData();
