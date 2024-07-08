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
    document.querySelector(".notification_main").style.marginLeft = "250px";
    document.querySelector(".notification_main").style.width = "calc(100% - 250px)";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
    document.querySelector(".notification_main").style.marginLeft = "50px";
    document.querySelector(".notification_main").style.width = "calc(100% - 0px)";
}

//여기서부터 notification_script

// 알림 데이터 (실제로는 서버에서 가져와야함.)
const notifications = [
    { date: '2024.03.11 (월)', time: '15:15:00', content: '시애기님이 친구 신청을 요청했습니다.' },
    { date: '2024.03.11 (월)', time: '13:30:30', content: '공지사항 쓸 말이 없어요...' },
    { date: '2024.03.11 (월)', time: '11:15:00', content: '채욘님이 친구 신청을 요청했습니다.' },
    { date: '2024.03.11 (월)', time: '10:30:00', content: '허찐따님이 친구 신청을 신청을 요청했습니다.' },
    { date: '2024.03.10 (일)', time: '18:25:05', content: '계정 도용과 관련해 안내드립니다.' },
    { date: '2024.03.10 (일)', time: '12:10:30', content: '공지사항 쓸 말이 없어요...' },
    { date: '2024.03.10 (일)', time: '11:15:00', content: '예언님이 친구 신청을 요청했습니다.' },
];

// 알림 목록을 동적으로 생성하는 함수
function renderNotifications() {
    const notificationList = document.querySelector('.notification-list');
    notificationList.innerHTML = '';

    let currentDate = '';
    let currentDateBox = null;

    notifications.forEach(notification => {
        if (notification.date !== currentDate) {
            currentDate = notification.date;
            currentDateBox = document.createElement('div');
            currentDateBox.className = 'notification-date-box';
            
            const dateElement = document.createElement('div');
            dateElement.className = 'notification-date';
            dateElement.textContent = currentDate;
            currentDateBox.appendChild(dateElement);
            
            notificationList.appendChild(currentDateBox);
        }

        const notificationItem = document.createElement('div');
        notificationItem.className = 'notification-item';
        notificationItem.innerHTML = `
            <span class="notification-time">${notification.time}</span>
            <span class="notification-content">${notification.content}</span>
            ${notification.content.includes('친구 신청') ? 
                `<button class="accept-btn">수락</button>
                 <button class="reject-btn">거절</button>` : ''}
        `;
        currentDateBox.appendChild(notificationItem);
    });
}

// 페이지 로드 시 알림 목록 렌더링
window.addEventListener('load', renderNotifications);

// 수락 및 거절 버튼 이벤트 리스너 (예시)
document.querySelector('.notification-list').addEventListener('click', function(e) {
    if (e.target.classList.contains('accept-btn')) {
        console.log('친구 신청 수락');
        // 수락 로직 구현
    } else if (e.target.classList.contains('reject-btn')) {
        console.log('친구 신청 거절');
        // 거절 로직 구현
    }
});