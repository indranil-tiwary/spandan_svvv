var childData;
var urlpic;
var count;
function customBoi(){
  var leadsRef = database.ref('users').orderByChild('spid');
  leadsRef.on('value', function(snapshot) {
    count=0;
    document.getElementById('userTable').innerHTML='<thead><tr><th>S No.</th><th>SP-ID</th><th>Name</th><th>Mobile Number</th><th>E Mail</th><th>College Name</th><th>Branch</th><th>Year</th><th>Degree</th></tr></thead>';
    snapshot.forEach(function(childSnapshot) {
        count=count+1;
        childData = childSnapshot.val();
        urlpic=childData['profile_picture'];
        jQuery("#userTable").append('<tbody><tr>\
            <td>'+count+'.</td>\
            <td><a href="'+childData['fbid']+'" target="_blank">'+childData['spid']+'</a></td>\
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
