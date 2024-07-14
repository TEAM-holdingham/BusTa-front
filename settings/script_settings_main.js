window.onload = function() {
    openNav(); // 초기에 사이드바가 열려있도록 설정
}

function toggleNav() {
    const sidenav = document.getElementById("mySidenav");
    const isOpen = sidenav.style.width === "250px";

    if (isOpen) {
        closeNav();
    } else {
        openNav();
    }
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.querySelector(".settings-container").style.marginLeft = "250px";
    document.querySelector(".settings-container").style.width = "calc(100% - 250px)";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
    document.querySelector(".settings-container").style.marginLeft = "50px";
    document.querySelector(".settings-container").style.width = "calc(100% - 0px)";
}

//여기서부터 settings_main_script

function showChat(settingsId) {
    const settingsMain = document.querySelector('.settings-container');
    const settingsKind = document.getElementById('settingskind');

    settingsMain.style.backgroundColor = "#F1F1F1";
    settingsKind.style.display = 'block';

    // 설정 목록에서 활성화 표시 변경
    const settingListItems = document.querySelectorAll('.settings-list-item');
    settingListItems.forEach(item => item.classList.remove('active'));
    settingListItems[settingsId - 1].classList.add('active');
}
