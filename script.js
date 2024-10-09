// Переход между экранами
function nextScreen(currentId, nextId) {
    document.getElementById(currentId).style.display = 'none';
    document.getElementById(nextId).style.display = 'block';
}

// Принять условия и перейти на выбор цели
function accept() {
    nextScreen('intro3', 'goalSelection');
}

// Отклонить условия
function decline() {
    alert('До свидания!');
}

// Выбор цели
function chooseGoal(goal) {
    alert('Вы выбрали цель: ' + goal);
    nextScreen('goalSelection', 'nextStep');
}

// Отключение/включение кнопки на этапе авторизации
document.getElementById('authForm').addEventListener('input', function() {
    const name = document.getElementById('name').value;
    const city = document.getElementById('city').value;
    const age = document.getElementById('age').value;

    const continueButton = document.getElementById('continueButton');
    if (name && city && age) {
        continueButton.disabled = false;
        continueButton.classList.remove('disabled-button');
        continueButton.classList.add('black-button');
    } else {
        continueButton.disabled = true;
        continueButton.classList.remove('black-button');
        continueButton.classList.add('disabled-button');
    }
});

// Показ экрана профиля, очереди или акций
function showScreen(screenId) {
    const screens = ['profile', 'queue', 'promotions'];
    screens.forEach(function(id) {
        document.getElementById(id).style.display = id === screenId ? 'block' : 'none';
    });
}

// Сохранение данных пользователя
document.getElementById('authForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const city = document.getElementById('city').value;
    const age = document.getElementById('age').value;

    // Сохранение в интерфейсе
    document.getElementById('userName').textContent = name;
    document.getElementById('userCity').textContent = city;
    document.getElementById('userAge').textContent = age;

    nextScreen('nextStep', 'mainInterface');
});
