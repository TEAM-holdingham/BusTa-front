function checkAll(source) {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(function (checkbox) {
    if (checkbox.id !== "checkbox1") {
      checkbox.checked = source.checked;
    }
  });
}

function goBack() {
  window.history.back();
}

document.addEventListener("DOMContentLoaded", function () {
  const nicknameInput = document.getElementById("nickname");
  const checkNicknameBtn = document.getElementById("checkNicknameBtn");

  if (nicknameInput && checkNicknameBtn) {
    // 초기에 중복 확인 버튼 비활성화
    checkNicknameBtn.disabled = true;

    // 닉네임 입력 시 버튼 활성화/비활성화 처리
    nicknameInput.addEventListener("input", function () {
      if (nicknameInput.value.trim() !== "") {
        checkNicknameBtn.disabled = false;
      } else {
        checkNicknameBtn.disabled = true;
      }
    });

    // 중복 확인 버튼 클릭 이벤트
    checkNicknameBtn.addEventListener("click", function () {
      // 여기에 중복 확인 로직을 추가할 수 있습니다.
      // 실제로는 서버와 연결하여 닉네임 중복을 확인하고, 결과에 따라 팝업을 표시할 수 있습니다.
      alert("사용할 수 있는 닉네임입니다.");
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById("password");
  const showPasswordBtn = document.getElementById("showPassword");

  if (passwordInput && showPasswordBtn) {
    showPasswordBtn.addEventListener("click", function () {
      const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);

      // FontAwesome 아이콘 변경 (보이기/감추기 토글)
      const icon = showPasswordBtn.querySelector("i");
      if (type === "text") {
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
      } else {
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
      }
    });
  }
});
