document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const showPasswordButton = document.getElementById("showPassword");

  showPasswordButton.addEventListener("click", function () {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    const icon = showPasswordButton.querySelector("i");
    icon.classList.toggle("fa-eye");
    icon.classList.toggle("fa-eye-slash");
  });

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (validateForm()) {
      performLogin();
    }
  });
});

function validateForm() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
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

function performLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const apiUrl =
    "https://port-0-busta-lyumntwj5a7765e6.sel4.cloudtype.app/security-login/login";

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      loginId: email,
      password: password,
    }),
    credentials: "include",
    redirect: "manual", // 리다이렉트를 수동으로 처리
  })
    .then((response) => {
      if (response.type === "opaqueredirect") {
        // 리다이렉트 발생
        window.location.href =
          "https://port-0-busta-lyumntwj5a7765e6.sel4.cloudtype.app/security-login";
      } else if (response.ok) {
        return response.text();
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    })
    .then((text) => {
      if (
        text &&
        (text.includes("로그인 성공") || text.includes("환영합니다"))
      ) {
        console.log("로그인 성공");
        window.location.href = "../../home/home.html";
      } else {
        throw new Error("로그인 실패: 예상치 못한 응답");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
    });
}
