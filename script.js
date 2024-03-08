const imageInput = document.getElementById("imageInput");
const imageContainer = document.getElementById("imageContainer");

function redirectToLoginPage() {
  window.location.href = "Login-signup/login-signup.html";
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