var childData;
var urlpic;
function customBoi(){
  var leadsRef = database.ref('users').orderByChild('spid');
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
