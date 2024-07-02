function confirmDelete(button) {
    const modal = document.getElementById('deleteModal');
    modal.style.display = 'flex';
    // Store the button to be deleted in the modal for later use
    modal.setAttribute('data-button', button);
}

function deleteFriend() {
    const modal = document.getElementById('deleteModal');
    const button = modal.getAttribute('data-button');
    const friendItem = button.closest('.friend-item');
    friendItem.remove();
    closeModal();
}

function closeModal() {
    const modal = document.getElementById('deleteModal');
    modal.style.display = 'none';
}

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
