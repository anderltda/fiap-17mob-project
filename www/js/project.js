var db;
var storage;
var storageRef;
$(document).ready(function() {

    $("#go_back").click(function() {
        window.history.back();
    });

    // Initialize Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyA-IkyIQVL9bdLAPyDQL2KKxzEGbySvMok",
        authDomain: "messenger-32489.firebaseapp.com",
        databaseURL: "https://messenger-32489.firebaseio.com",
        projectId: "messenger-32489",
        storageBucket: "messenger-32489.appspot.com",
        messagingSenderId: "662383105600",
        appId: "1:662383105600:web:83cd95e840b796ff"
    };

    var app = firebase.initializeApp(firebaseConfig);
    db = firebase.firestore(app);
    storage = firebase.storage();
    storageRef = storage.ref();

});

function logar(email, password, page) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function() {
            window.location = page;
        })
        .catch(function(error) {
            console.error(error);
            alert("Anderson " + error);
        });
}

function singin(name, phone, email, password, page) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function() {

            db.collection("APP_USER_DEFAULT").doc(firebase.auth().currentUser.uid).set({
                    id: firebase.auth().currentUser.uid,
                    name: name,
                    phone: phone,
                    email: email,
                    avatar: "",
                    create: new Date,
                    update: new Date
                })
                .then(function(docRef) {
                    window.location = page;
                })
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    alert(error);
                    // ...
                });
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(error);
            // ...
        });
}