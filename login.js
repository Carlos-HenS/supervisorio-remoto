
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "TCC_CJ" && password === "CJ_IFPB") {
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("login-error").textContent = "Usuário ou senha incorretos.";
    }
}
