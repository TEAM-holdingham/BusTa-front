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
    "https://port-0-busta-lyumntwj5a7765e6.sel4.cloudtype.app/security-login/api/login";

  const formData = new URLSearchParams();
  formData.append("loginId", email);
  formData.append("password", password);

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then((data) => {
      if (data === "loginhome") {
        console.log("로그인 성공");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);
        // 세션 유지를 위해 JSESSIONID를 localStorage에 저장
        const jsessionid = getCookie("JSESSIONID");
        if (jsessionid) {
          localStorage.setItem("JSESSIONID", jsessionid);
        }
        window.location.href = "../my_page/my_page.html";
      } else {
        throw new Error("로그인 실패");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
    });
}

// 쿠키 값을 가져오는 함수
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
