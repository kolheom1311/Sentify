const imageInput = document.getElementById("imageInput");
const imageContainer = document.getElementById("imageContainer");
//firebase
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

function redirectToLoginPage() {
  window.location.href = "Login-signup/login-signup.html";
}

function logout() {
    // Sign out the user
    // firebase.auth().signOut().then(function() {
      // Sign-out successful.
      alert('Logout successful!');
      // Redirect the user to the login page or any other desired page
      window.location.href = "Login-signup/login-signup.html"; // Change 'login.html' to the desired page
    // }).catch(function(error) {
    //   // An error happened.
    //   console.error('Logout error:', error);
    //   alert('Logout failed. Please try again.');
    // });
  }

imageInput.addEventListener("change", function() {
  imageContainer.innerHTML = "";
  const files = imageInput.files;
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();
    reader.onload = function(event) {
      const image = document.createElement("div");
      image.classList.add("image");
      const img = document.createElement("img");
      img.src = event.target.result;
      image.appendChild(img);
      imageContainer.appendChild(image);
    };
    reader.readAsDataURL(file);
  }
});