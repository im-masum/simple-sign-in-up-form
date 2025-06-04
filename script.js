// Signup
document.getElementById("signUpForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("signupUsername").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;

  if (username && email && password) {
    const user = { username, email, password };
    localStorage.setItem("user", JSON.stringify(user));

    document.getElementById("formMessage").style.color = "green";
    document.getElementById("formMessage").innerText =
      "Signup successful! Please login.";

    e.target.reset();
    setTimeout(() => {
      document.getElementById("switchToLogin").click();
      document.getElementById("formMessage").innerText = "";
    }, 2000);
  } else {
    document.getElementById("formMessage").style.color = "red";
    document.getElementById("formMessage").innerText =
      "Please fill all fields.";
  }
});

// Login
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const inputUsername = document.getElementById("loginUsername").value.trim();
  const inputPassword = document.getElementById("loginPassword").value;
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (
    storedUser &&
    inputUsername === storedUser.username &&
    inputPassword === storedUser.password
  ) {
    showWelcomeScreen(storedUser.username);
  } else {
    document.getElementById("formMessage").style.color = "red";
    document.getElementById("formMessage").innerText = "Invalid credentials.";
  }
});

// Show welcome screen
function showWelcomeScreen(username) {
  document.querySelector(".form-container").style.display = "none";
  document.getElementById("welcomeScreen").style.display = "block";
  document.getElementById("welcomeUser").innerText = username;
}

// Logout function
function logout() {
  document.querySelector(".form-container").style.display = "block";
  document.getElementById("welcomeScreen").style.display = "none";

  // Clear login form
  document.getElementById("loginForm").reset();

  // Reset title and subtitle
  document.getElementById("formTitle").innerText = "Welcome Back";
  document.getElementById("formSubtitle").innerText = "Login to continue";
  document.getElementById("loginForm").classList.add("active");
  document.getElementById("signUpForm").classList.remove("active");
}

// Password toggle
document.querySelectorAll(".toggle-password").forEach((icon) => {
  icon.addEventListener("click", () => {
    const target = document.getElementById(icon.dataset.target);
    target.type = target.type === "password" ? "text" : "password";
    icon.classList.toggle("fa-eye");
    icon.classList.toggle("fa-eye-slash");
  });
});

// Form switch buttons
document.getElementById("switchToSignUp").onclick = () => {
  document.getElementById("loginForm").classList.remove("active");
  document.getElementById("signUpForm").classList.add("active");
  document.getElementById("formTitle").innerText = "Welcome to Signup";
  document.getElementById("formSubtitle").innerText =
    "Create your free account below!";
  document.getElementById("formMessage").innerText = "";
};

document.getElementById("switchToLogin").onclick = () => {
  document.getElementById("signUpForm").classList.remove("active");
  document.getElementById("loginForm").classList.add("active");
  document.getElementById("formTitle").innerText = "Welcome Back";
  document.getElementById("formSubtitle").innerText = "Login to continue";
  document.getElementById("formMessage").innerText = "";
};
