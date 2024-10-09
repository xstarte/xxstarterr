// Функция для переключения между экранами
function nextScreen(current, next) {
    document.getElementById(current).classList.remove('active');
    document.getElementById(next).classList.add('active');
}

// Функция при нажатии кнопки "Принять"
function accept() {
    nextScreen('intro3', 'user-info'); // Переход на экран ввода данных
}

// Функция при нажатии кнопки "Отклонить"
function decline() {
    alert("До свидания!");
    window.Telegram.WebApp.close(); // Закрываем приложение
}

// Функция отправки данных пользователя
document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const city = document.getElementById('city').value;
    const age = document.getElementById('age').value;

    if (name && city && age) {
        // Отправка данных на сервер (например, через fetch)
        const userData = { name, city, age };

        // Пример отправки данных через fetch
        fetch('/submit_user_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('User data submitted:', data);
            nextScreen('user-info', 'goal-selection'); // Переход на выбор цели
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
});

// Функция для выбора цели
function selectGoal(goal) {
    if (goal === 'iPhone 15') {
        nextScreen('goal-selection', 'iphone15-selection');
    } else {
        // Пример отправки выбранной цели на сервер
        fetch('/select_goal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ goal }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Goal selected:', data);
            nextScreen('goal-selection', 'deposit-screen'); // Переход на экран депозита
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
}

// Функция для подтверждения депозита
function confirmDeposit() {
    // Пример отправки информации о депозите на сервер
    fetch('/add_deposit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deposit: 10000, user_id: 1 }), // Пример данных
    })
    .then(response => response.json())
    .then(data => {
        console.log('Deposit confirmed:', data);
        nextScreen('deposit-screen', 'main-interface'); // Переход на основной интерфейс
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
