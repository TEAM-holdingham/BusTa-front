document.addEventListener('DOMContentLoaded', function() {
    const nextButton = document.querySelector('.nextbutton');
    const phoneInput = document.querySelector('input[name="phonenum"]');
    const checkInput = document.querySelector('input[name="checknum"]');

    // 다음 버튼 클릭 시 처리 함수
    nextButton.addEventListener('click', function() {
        // 입력값 가져오기
        const phoneValue = phoneInput.value.trim();
        const checkValue = checkInput.value.trim();

        // 입력값이 비어있는지 체크
        if (phoneValue === '') {
            alert('전화번호를 입력하세요.');
            return;
        } 
        
        if (checkValue === '') {
            alert('인증번호를 입력하세요.');
            return;
        }

        // 모든 입력값이 채워져 있으면 다음 페이지로 이동
        location.href = 'find_email-2.html';
    });
});