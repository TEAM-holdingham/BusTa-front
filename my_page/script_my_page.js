window.onload = function () {
  if (document.getElementById("mySidenav")) {
    openNav();
  }
  fetchUserInfo();
};

function toggleNav() {
  const sidenav = document.getElementById("mySidenav");
  if (sidenav) {
    const isOpen = sidenav.style.width === "250px";
    if (isOpen) {
      closeNav();
    } else {
      openNav();
    }
  }
}

function openNav() {
  const sidenav = document.getElementById("mySidenav");
  const main = document.getElementById("main");
  if (sidenav) sidenav.style.width = "250px";
  if (main) main.style.marginLeft = "250px";
}

function closeNav() {
  const sidenav = document.getElementById("mySidenav");
  const main = document.getElementById("main");
  if (sidenav) sidenav.style.width = "0px";
  if (main) main.style.marginLeft = "50px";
}

function toggleEdit(id) {
  const input = document.getElementById(id);
  if (input) {
    input.readOnly = !input.readOnly;
    input.style.border = input.readOnly ? "1px solid #ccc" : "1px solid #000";
  }
}

function fetchUserInfo() {
  const apiUrl =
    "https://port-0-busta-lyumntwj5a7765e6.sel4.cloudtype.app/profile";

  fetch(apiUrl, {
    method: "GET",
    credentials: "include", // 쿠키를 포함하여 요청
  })
    .then((response) => {
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("인증 실패: 다시 로그인해주세요.");
        }
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      displayUserInfo(data);
    })
    .catch((error) => {
      console.error("Error fetching user info:", error);
      alert(error.message || "사용자 정보를 가져오는데 실패했습니다.");
      if (error.message.includes("인증 실패")) {
        window.location.href = "../login/login.html";
      }
    });
}

function displayUserInfo(userInfo) {
  // 각 필드에 사용자 정보 표시
  setElementValue("nickname", userInfo.nickname);
  setElementValue("email", userInfo.loginId);
  setElementValue("phone", userInfo.phoneNumber);
  setElementValue("dob", userInfo.birthDate);
  setElementValue("gender", userInfo.gender);

  // 태그라인(소개) 표시
  const taglineElement = document.querySelector(".tagline");
  if (taglineElement) {
    taglineElement.textContent =
      userInfo.introduction || "온 세상의 다크서클을 모아 심연이 될 때까지";
  }

  // 프로필 이미지 표시 (만약 HTML에 이미지 요소가 있다면)
  const profileImage = document.querySelector(".profile-picture");
  if (profileImage && userInfo.profilePicture) {
    profileImage.src = userInfo.profilePicture;
  }
}

function setElementValue(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.value = value || "";
  }
}
