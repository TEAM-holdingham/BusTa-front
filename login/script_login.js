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
    credentials: "include", // 중요: 쿠키를 포함하여 요청
  })
    .then((response) => {
      if (response.ok) {
        if (response.redirected) {
          // 리다이렉션이 발생한 경우 (로그인 성공)
          console.log("로그인 성공");
          window.location.href = response.url; // 서버가 지정한 URL로 리다이렉트
        } else {
          // 리다이렉션이 없는 경우 응답 내용 확인
          return response.text().then((text) => {
            if (text.includes("로그인 성공") || text.includes("환영합니다")) {
              console.log("로그인 성공");
              window.location.href = "../../home/home.html";
            } else {
              throw new Error("로그인 실패: 예상치 못한 응답");
            }
          });
        }
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
    });
}
