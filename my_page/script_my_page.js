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
  const userSession = localStorage.getItem("userSession");

  if (userSession) {
    try {
      const userData = JSON.parse(userSession);
      if (userData && userData.user) {
        displayUserInfo(userData.user);
      } else {
        throw new Error("Invalid user data in session");
      }
    } catch (error) {
      console.error("Error parsing user session:", error);
      localStorage.removeItem("userSession");
      fetchFromServer();
    }
  } else {
    fetchFromServer();
  }
}

function fetchFromServer() {
  const apiUrl =
    "https://port-0-busta-lyumntwj5a7765e6.sel4.cloudtype.app/security-login/api/my-page";

  fetch(apiUrl, {
    method: "GET",
    credentials: "include", // 쿠키를 포함하여 요청
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("받아온 사용자 정보:", data);
      if (data.status === "success" && data.user) {
        displayUserInfo(data.user);
        localStorage.setItem("userSession", JSON.stringify(data));
      } else {
        throw new Error(
          data.message || "사용자 정보를 가져오는데 실패했습니다."
        );
      }
    })
    .catch((error) => {
      console.error("Error fetching user info:", error);
      alert(error.message || "사용자 정보를 가져오는데 실패했습니다.");
      if (error.message.includes("인증") || error.response?.status === 401) {
        window.location.href = "../login/login.html";
      }
    });
}

function displayUserInfo(userInfo) {
  if (!userInfo) {
    console.error("User info is null or undefined");
    return;
  }

  setElementValue("nickname", userInfo.nickname);
  setElementValue("email", userInfo.loginId);
  setElementValue("phone", userInfo.phoneNumber);
  setElementValue("dob", userInfo.birthDate);
  setElementValue("gender", userInfo.gender);

  // 태그라인(소개) 표시 수정
  const taglineElement = document.querySelector(".tagline");
  if (taglineElement) {
    taglineElement.textContent = userInfo.introduction || "";
  }

  const profileImage = document.querySelector(".profile-picture");
  if (profileImage && userInfo.profilePicture) {
    profileImage.src = userInfo.profilePicture;
  }
}

function setElementValue(id, value) {
  const element = document.getElementById(id);
  if (element) {
    if (element.tagName === "INPUT") {
      element.value = value || "";
    } else {
      element.textContent = value || "";
    }
  }
}

// 로그아웃 화면에 연결 필요

function logout() {
  localStorage.removeItem("userSession");
  window.location.href = "../login/login.html";
}
