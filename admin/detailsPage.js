function figureOut(name){
  var rName;
  if(name=="taal"){
    rName="Taal - The Dance Battle";
  }
  else if (name=="swaranjali") {
    rName="Swaranjali - The Singing Face-off";
  }
  else if (name=="ambriti") {
    rName="Ambriti - The Fashion Show";
  }
  else if (name=="navyata") {
    rName="Navyata - Best Out Of Waste";
  }
  else if (name=="mime") {
    rName="Mime & Nukkad Naatak";
  }
  else if (name=="kavyanjali") {
    rName="Kavyanjali - Poetry Competition";
  }
  else if (name=="firelesscooking") {
    rName="Fireless Cooking";
  }
  else if (name=="doodle") {
    rName="Doodle & Graffiti";
  }
  else if (name=="rj") {
    rName="Radio Jockeying";
  }
  else if (name=="kandal") {
    rName="Kandal - Collage Making";
  }
  else if (name=="facepaint") {
    rName="Ukti - Face Painting";
  }
  else if (name=="rachnakriti") {
    rName="Rachnakriti - Card Making";
  }
  else if (name=="chitrang") {
    rName="Chitrang - Rangoli Making";
  }
  else if (name=="blog") {
    rName="Bloggin/Vlogging";
  }
  else if (name=="editor") {
    rName="The Editor - Make Your Own Magazine";
  }
  else if (name=="finearts") {
    rName="Fine Arts Marathon";
  }
  else if (name=="shortfilm") {
    rName="Short Film/Documentary Filmmaking";
  }
  else if (name=="mrmsspandan") {
    rName="Mr. & Ms. Spandan";
  }
  else if (name=="treasurehunt") {
    rName="Treasure Hunt";
  }
  else if(name=="culinary"){
    rName="Culinary Arts";
  }
  else if (name=="skateboarding") {
    rName="Skateboarding";
  }
  else if (name=="blogging") {
    rName="Blogging/Vlogging";
  }
  else if (name=="photography") {
    rName="Photography";
  }
  else if (name=="filmtv") {
    rName="Film/TV/Play Writing";
  }
  return rName;
}
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
  document.getElementById('mainHeading').innerHTML=figureOut(actionName);
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
