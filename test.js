const apiUrl =
  "https://port-0-busta-lyumntwj5a7765e6.sel4.cloudtype.app/security-login/join";

const userData = {
  loginId: "check4732@naver.com",
  password: "123",
  passwordCheck: "123",
  nickname: "newbie",
  username: "John Doe",
  phoneNumber: "01012345678",
  birthDate: "1990-01-01",
  gender: "Male",
  job: "Developer",
  home: "Seoul",
  school: "Korea University",
  profilePicture: "profile.jpg",
  introduction: "Hello World!",
};

fetch(apiUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(userData),
  redirect: "follow",
})
  .then((response) => {
    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);
    return response.text();
  })
  .then((text) => {
    console.log("Response body:", text);
    try {
      return JSON.parse(text);
    } catch (e) {
      console.log("응답이 JSON 형식이 아닙니다.");
      return text;
    }
  })
  .then((data) => {
    console.log("처리된 응답 데이터:", data);
  })
  .catch((error) => {
    console.error("오류 발생:", error);
  });
