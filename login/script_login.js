document.addEventListener("DOMContentLoaded", function() {
    const passwordInput = document.getElementById("password");
    const showPasswordButton = document.getElementById("showPassword");

    showPasswordButton.addEventListener("click", function () {
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);

        const icon = showPasswordButton.querySelector("i");
        icon.classList.toggle("fa-eye");
        icon.classList.toggle("fa-eye-slash");
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm()) {
            window.location.href = 'home-time_reset.html';
        }
    });
});

function validateForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "" || password === "") {
        alert("이메일과 비밀번호를 모두 입력해주세요.");
        return false;
    }

    if (!emailRegex.test(email)) {
        alert("올바른 이메일 형식이 아닙니다.");
        return false;
    }

    return true;
}