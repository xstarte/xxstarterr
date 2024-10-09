document.addEventListener('DOMContentLoaded', function() {
    // Проверка, есть ли пользователь в localStorage
    if (localStorage.getItem('userId')) {
        showMainScreen();
        getQueueInfo(); // Получение информации о пользователе
    } else {
        showIntro1();
    }

    const continueBtn = document.getElementById('continueBtn');
    const nameInput = document.getElementById('name');
    const cityInput = document.getElementById('city');
    const ageInput = document.getElementById('age');

    // Включаем кнопку "Продолжить", когда все поля заполнены
    nameInput.addEventListener('input', checkInputs);
    cityInput.addEventListener('input', checkInputs);
    ageInput.addEventListener('input', checkInputs);
    
    function checkInputs() {
        if (nameInput.value && cityInput.value && ageInput.value) {
            continueBtn.disabled = false;
        } else {
            continueBtn.disabled = true;
        }
    }
});

function showIntro1() {
    document.getElementById('intro1').style.display = 'block';
    document.getElementById('intro2').style.display = 'none';
    document.getElementById('intro3').style.display = 'none';
}

function showMainScreen() {
    document.getElementById('mainScreen').style.display = 'block';
    document.getElementById('goalSelection').style.display = 'none';
}

function nextScreen(currentId, nextId) {
    document.getElementById(currentId).style.display
