
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA39yFx4qroYYY7HiYef9zcQkVfz1ucAiE",
  authDomain: "dados-motor-dc.firebaseapp.com",
  databaseURL: "https://dados-motor-dc-default-rtdb.firebaseio.com",
  projectId: "dados-motor-dc",
  storageBucket: "dados-motor-dc.firebasestorage.app",
  messagingSenderId: "469754758101",
  appId: "1:469754758101:web:de6e62db264a31f8b3f35c",
  measurementId: "G-ERQ86KQSG4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.login = function() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      errorMessage.textContent = "Email ou senha inválidos.";
      console.error(error);
    });
};
