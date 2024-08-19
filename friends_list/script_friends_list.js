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
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
    document.getElementById("main").style.marginLeft = "50px";
}




//친구 추가 신청 알림 창 기능
document.getElementById('friendNotificationIcon').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'block';
});

document.getElementById('closeBtn').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
});

document.querySelectorAll('.reject-btn').forEach(button => {
    button.addEventListener('click', function() {
        alert('친구 요청을 거절했습니다.');
    });
});

document.querySelectorAll('.accept-btn').forEach(button => {
    button.addEventListener('click', function() {
        alert('친구 요청을 수락했습니다.');
    });
});






//검색 기능
function searchFriend() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const friendList = document.getElementById('friendList');
    const friends = friendList.getElementsByClassName('friend-item');

    Array.from(friends).forEach(friend => {
        const nickname = friend.getElementsByClassName('nickname')[0].textContent.toLowerCase();
        if (nickname.includes(input)) {
            friend.style.display = '';
        } else {
            friend.style.display = 'none';
        }
    });
}
/*
document.getElementById('searchButton').addEventListener('click', function() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const friends = document.querySelectorAll('.friend-item');
    
    friends.forEach(friend => {
        const friendName = friend.querySelector('span').textContent.toLowerCase();
        if (friendName.includes(searchValue)) {
            friend.style.display = '';
        } else {
            friend.style.display = 'none';
        }
    });
});

*/

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('toggleButton');
    let isHidden = true;

    button.addEventListener('click', () => {
        const img = button.querySelector('img');
        if (isHidden) {
            img.src = 'eye_open.svg';
        } else {
            img.src = 'eye_close.svg';
        }
        isHidden = !isHidden;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('favorite-button');
    let isHidden = false;

    button.addEventListener('click', () => {
        const img = button.querySelector('img');
        if (isHidden) {
            img.src = 'star.svg';
        } else {
            img.src = 'xstar.svg';
        }
        isHidden = !isHidden;
    });
});





//삭제 기능
function confirmDelete(button) {
    if (confirm("정말로 삭제하시겠습니까?")) {
        // 삭제 로직
    }
}