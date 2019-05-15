var tblUsers = document.getElementById('tbl_users_list');
//console.log(tblUsers.value);
var databaseRef = firebase.database().ref('users/'); //A Firebase reference represents a particular location in your Database and can be used for reading or writing data to that Database location.
//create a reference to our user’s collection.
var rowIndex = 1;

// The value event is called every time data is changed at the specified database reference, including changes to children. 
databaseRef.once('value', function (snapshot) {
    // On vs Once :In some cases you may want a snapshot of your data without listening for changes, such as when initializing a UI element that you don't expect to change.
    //As Soon as Windows Reload tblUsers is initiliaze and we  want the snapshot of FireBase in Tbale

    // The listener receives a snapshot that contains the data at the specified location in the database at the time of the event.
    snapshot.forEach(function (childSnapshot) {
        var childKey = childSnapshot.key;
        var chilData = childSnapshot.val();

        var row = tblUsers.insertRow(rowIndex);
        var cellId = row.insertCell(0);
        var cellName = row.insertCell(1);

        cellId.appendChild(document.createTextNode(childKey)); //-LeuF7vc8B-TRRO8mtB2
        cellName.appendChild(document.createTextNode(chilData.user_name)); //test 1 update

        rowIndex = rowIndex + 1;

    });
});


function save_user() {
    var user_name = document.getElementById('user_name').value;

    // Get a key for a new Post.
    var uid = firebase.database().ref().child('users').push().key; //push the key

    var data = {
        user_id: uid,
        user_name: user_name
    }

    // Write the new post's data simultaneously in the users list 
    var updates = {};
    updates['/users/' + uid] = data;
    firebase.database().ref().update(updates);

    alert('The user is created Succesfully'); //Ok 
    reload_page(); // databaseRef.once('value', function (snapshot)  is Called 

    // //Error 1;firebase-auth.js:206 Uncaught TypeError: firebase.INTERNAL.registerAppHook is not a function
    // at firebase - auth.js: 206   solve it  --Removed it BY Commenting  
    // at firebase - auth.js: 206
    // at firebase - auth.js: 206 


}


function update_user() {
    var user_name = document.getElementById('user_name').value;
    var user_id = document.getElementById('user_id').value;

    var data = {
        user_id: user_id,
        user_name: user_name
    }

    var updates = {};
    updates['/users/' + user_id] = data;
    firebase.database().ref().update(updates);

    alert('The user is updated successfully!');

    reload_page();
}

function delete_user() {
    var user_id = document.getElementById('user_id').value;

    //The simplest way to delete data is to call remove() on a reference to the location of that data.
    firebase.database().ref().child('/users/' + user_id).remove();
    alert('The user is deleted successfully!');
    reload_page();
}

function reload_page() {
    window.location.reload();
}