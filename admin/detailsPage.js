
function customBoi(){
  if(sessionStorage.EventSP){
    checkFirebaseData(sessionStorage.kyahaiye,sessionStorage.EventSP);
  }
  else{
    window.location.href="./";
  }
}

function checkFirebaseData(kyahai,actionName){
  var childData;
  var childData1;
  var leadsRef;
  var starRef = firebase.database().ref(kyahai+actionName);
  starRef.on('value', function(snapshot2) {
  document.getElementById('mainHeading').innerHTML=actionName;
  document.getElementById('userTable').innerHTML='<thead><tr><th>SP-ID</th><th>Name</th><th>Mobile Number</th><th>E Mail</th><th>College Name</th><th>Branch</th><th>Year</th><th>Degree</th></tr></thead>';
  if(snapshot2.val()==null){document.getElementById('userTable').innerHTML='<h4>No registrations yet!</h4>';}
  snapshot2.forEach(function(childSnapshot) {
      childData1 = childSnapshot.key;
      leadsRef = database.ref('users/'+childData1);
      leadsRef.on('value', function(snapshot) {
            childData = snapshot.val();
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
     },function(error){console.log(error);});
   });
  });
}
