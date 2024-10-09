document.addEventListener('DOMContentLoaded', function() {
    // Проверка, есть ли пользователь в localStorage
    if (localStorage.getItem('userId')) {
        showMainScreen();
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
    displayUserInfo(); // Отображаем информацию о пользователе
}

function nextScreen(currentId, nextId) {
    document.getElementById(currentId).style.display = 'none';
    document.getElementById(nextId).style.display = 'block';
}

function accept() {
    nextScreen('intro3', 'auth');
}

function decline() {
    alert('До свидания!');
}

function submitAuth() {
    const name = document.getElementById('name').value;
    const city = document.getElementById('city').value;
    const age = document.getElementById('age').value;

    // Отправка данных на сервер
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, city, age }),
    })
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('userId', data.userId); // Сохранение ID пользователя
        localStorage.setItem('groupId', data.groupId); // Сохранение group ID
        showGoalSelection();
    });
}

function showGoalSelection() {
    document.getElementById('auth').style.display = 'none';
    document.getElementById('goalSelection').style.display = 'block';
}

function selectGoal(goal) {
    // Отправка выбранной цели на сервер
    fetch('/select_goal', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: localStorage.getItem('userId'), goal }),
    })
    .then(() => {
        showMainScreen();
    });
}

function displayUserInfo() {
    const userId = localStorage.getItem('userId');
    const groupId = localStorage.getItem('groupId');
    document.getElementById('queueContent').innerHTML = `
        <h2>Очередь пользователя ${userId} в группе ${groupId}</h2>
        <p>Здесь будет информация о вашей очереди...</p>
    `;
    // Вы можете также добавить информацию о пользователе, например, имя, город и возраст
}
