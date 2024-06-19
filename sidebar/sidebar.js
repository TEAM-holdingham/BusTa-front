window.onload = function() {
    closeNav(); // 초기에 사이드바를 닫도록 수정
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
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}
