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
    document.querySelector(".chat-container").style.marginLeft = "250px";
    document.querySelector(".chat-container").style.width = "calc(100% - 250px)";
    document.querySelector(".input-container").style.width = "calc(75% - 250px)";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
    document.querySelector(".chat-container").style.marginLeft = "50px";
    document.querySelector(".chat-container").style.width = "calc(100% - 0px)";
    document.querySelector(".input-container").style.width = "calc(75% - 50px)";
}

//여기서부터 dm_script

// WebSocket 연결 설정
const socket = new WebSocket('ws://yourserver.com/socket');

socket.onopen = function(event) {
    console.log('WebSocket connection established');
};

socket.onmessage = function(event) {
    const message = JSON.parse(event.data);
    receiveMessage(message);
};

socket.onclose = function(event) {
    console.log('WebSocket connection closed');
};

socket.onerror = function(error) {
    console.error('WebSocket error:', error);
};

// 채팅 메시지를 보여주는 함수
function showChat(chatId) {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = '';

    messages[chatId].forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', message.type);
        messageElement.textContent = message.content;
        chatMessages.appendChild(messageElement);
    });

    // 채팅 목록에서 활성화 표시 변경
    const chatListItems = document.querySelectorAll('.chat-list-item');
    chatListItems.forEach(item => item.classList.remove('active'));
    chatListItems[chatId - 1].classList.add('active');
}

// 메시지 수신 함수
function receiveMessage(message) {
    const activeChatId = document.querySelector('.chat-list-item.active').innerText.trim();
    const chatId = parseInt(activeChatId.charAt(activeChatId.length - 1));
    if (message.chatId === chatId) {
        const chatMessages = document.getElementById('chatMessages');
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'received');
        messageElement.textContent = message.content;
        chatMessages.appendChild(messageElement);
    }

    // 메시지 데이터를 업데이트
    if (messages[chatId]) {
        messages[chatId].push({ type: 'received', content: message.content });
    } else {
        messages[chatId] = [{ type: 'received', content: message.content }];
    }
}


// 메시지 전송 함수
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (message === '') {
        return; // 빈 메시지는 전송하지 않음
    }

    const activeChatId = document.querySelector('.chat-list-item.active').innerText.trim();
    const chatId = parseInt(activeChatId.charAt(activeChatId.length - 1));
    
    // 서버로 메시지 전송
    const messageData = {
        chatId: chatId,
        content: message,
        type: 'sent'
    };
    socket.send(JSON.stringify(messageData));

    // UI 업데이트
    const chatMessages = document.getElementById('chatMessages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'sent');
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);

    // 메시지 전송 후 입력창 초기화
    messageInput.value = '';

    // 메시지 데이터를 업데이트
    if (messages[chatId]) {
        messages[chatId].push({ type: 'sent', content: message });
    } else {
        messages[chatId] = [{ type: 'sent', content: message }];
    }
}