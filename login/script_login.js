document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById("password");
  const showPasswordButton = document.getElementById("showPassword");
  const loginForm = document.getElementById("loginForm");

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

  const formData = new URLSearchParams();
  formData.append("loginId", email);
  formData.append("password", password);

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
    redirect: "follow",
  })
    .then((response) => {
      console.log("Response URL:", response.url);
      if (response.url.endsWith("/security-login")) {
        console.log("로그인 성공");
        // 로그인 성공 처리
        window.location.href = "../../home/home.html";
      } else if (response.url.endsWith("/security-login/login")) {
        throw new Error("로그인 실패: 아이디 또는 비밀번호가 잘못되었습니다.");
      } else {
        throw new Error("예상치 못한 응답");
      }
      return response.text();
    })
    .then((html) => {
      console.log("서버 응답:", html);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(
        error.message ||
          "로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요."
      );
    });
}
