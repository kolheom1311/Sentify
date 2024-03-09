var firebaseConfig = {
    apiKey: "AIzaSyAtDR1uMypbur1SgItz6zVFeKP5ebRapY0",
    authDomain: "sentify-web.firebaseapp.com",
    databaseURL: "https://sentify-web-default-rtdb.firebaseio.com",
    projectId: "sentify-web",
    storageBucket: "sentify-web.appspot.com",
    messagingSenderId: "178179484502",
    appId: "1:178179484502:web:9e859074982c5a119604f7",
    measurementId: "G-N29DQTKBF7"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth();
// const auth = getAuth();
const database = firebase.database();

// Set up our register function
function register () {
  // Get all our input fields
  var email = document.getElementById('regmail').value; // Use correct ID for email field
  var password = document.getElementById('regpass').value; // Use correct ID for password field
  var full_name = document.getElementById('regname').value; // Use correct ID for full_name field

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!');
    return;
  }
  if (validate_field(full_name) == false) {
    alert('One or More Extra Fields is Outta Line!!');
    return;
  }
  
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser;

      // Add this user to Firebase Database
      var database_ref = database.ref();

      // Create User data
      var user_data = {
        email : email,
        full_name : full_name,
        last_login : Date.now()
      };

      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data);

      // Done
      alert('User Created!!');
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var errorCode = error.code;
      var errorMessage = error.message;

      alert(errorMessage);
    });
}

function login () {
    // Get all our input fields
    email = document.getElementById('logmail').value
    password = document.getElementById('logpass').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!')
      return
      // Don't continue running the code
    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)
  
      // DOne
      alert('User Logged In!!')
      window.location.href = "../index.html" 
  
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }

  // Google Sign-In function
function googleSignUp() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      // User signed in successfully
      var user = result.user;
      console.log('User signed in:', user);
      alert('Google Sign-up successful!');
    })
    .catch((error) => {
      // Handle errors
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error('Google Sign-up error:', errorMessage);
      alert('Google Sign-up failed. Please try again.');
    });
}

// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/;
  return expression.test(email);
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  return password.length >= 6;
}

function validate_field(field) {
  return field.trim() !== '';
}
