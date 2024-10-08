const telegram = window.Telegram.WebApp;

// Получаем информацию о пользователе
const userId = telegram.initDataUnsafe.user.id;
document.getElementById('user-id').innerText = userId;

// Отображаем приветственное сообщение
document.getElementById('welcome-message').innerText = `Добро пожаловать, пользователь ${userId}!`;
document.getElementById('user-info').style.display = 'block';

// Внесение депозита
document.getElementById('deposit-button').onclick = () => {
    const depositAmount = document.getElementById('deposit-input').value;
    if (depositAmount) {
        fetch('/add_deposit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: userId,
                deposit: depositAmount,
            }),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch((error) => {
            console.error('Ошибка:', error);
        });
    } else {
        alert('Пожалуйста, введите сумму депозита.');
    }
};

// Выбор цели
document.querySelectorAll('.goal-button').forEach(button => {
    button.onclick = () => {
        const selectedGoal = button.getAttribute('data-goal');
        fetch('/select_goal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: userId,
                goal: selectedGoal,
            }),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch((error) => {
            console.error('Ошибка:', error);
        });
    };
});
