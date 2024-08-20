window.onload = function () {
  if (document.getElementById("mySidenav")) {
    openNav();
  }
  checkSessionAndFetchUserInfo();
};

function checkSessionAndFetchUserInfo() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const jsessionid = localStorage.getItem("JSESSIONID");

  if (isLoggedIn !== "true" || !jsessionid) {
    window.location.href = "../login/login.html";
    return;
  }

  // JSESSIONID를 쿠키에 설정 (만약 쿠키가 삭제되었을 경우를 대비)
  document.cookie = `JSESSIONID=${jsessionid}; path=/; SameSite=None; Secure`;

  fetchUserInfo();
}

function fetchUserInfo() {
  const apiUrl =
    "https://port-0-busta-lyumntwj5a7765e6.sel4.cloudtype.app/security-login/api/my-page";

  fetchWithSession(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log("받아온 사용자 정보:", data);
      if (data.user) {
        displayUserInfo(data.user);
      } else {
        throw new Error("사용자 정보를 가져오는데 실패했습니다.");
      }
    })
    .catch((error) => {
      console.error("Error fetching user info:", error);
      alert(error.message || "사용자 정보를 가져오는데 실패했습니다.");
      if (error.message === "인증 실패" || error.response?.status === 401) {
        logout();
      }
    });
}

function fetchWithSession(url, options = {}) {
  const jsessionid = localStorage.getItem("JSESSIONID");
  if (!jsessionid) {
    throw new Error("세션이 유효하지 않습니다.");
  }

  const defaultOptions = {
    credentials: "include",
    headers: {
      ...options.headers,
      Accept: "application/json",
      "Content-Type": "application/json",
      Cookie: `JSESSIONID=${jsessionid}`,
    },
  };

  return fetch(url, { ...defaultOptions, ...options }).then((response) => {
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("인증 실패");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  });
}

function displayUserInfo(userInfo) {
  if (!userInfo) {
    console.error("User info is null or undefined");
    return;
  }

  setElementValue("nickname", userInfo.nickname);
  setElementValue("username", userInfo.loginId);
  setElementValue("email", userInfo.loginId);
  setElementValue("phone", userInfo.phoneNumber);
  setElementValue("dob", userInfo.birthDate);
  setElementValue("gender", userInfo.gender);

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

function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("JSESSIONID");
  localStorage.removeItem("userEmail");
  document.cookie =
    "JSESSIONID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.href = "../login/login.html";
}

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
