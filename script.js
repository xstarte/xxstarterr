const telegram = window.Telegram.WebApp;

function accept() {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('registration').style.display = 'block';
}

function decline() {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('goodbye').style.display = 'block';
}

function register() {
    const name = document.getElementById('name').value;
    const city = document.getElementById('city').value;
    const age = document.getElementById('age').value;

    if (name && city && age) {
        // Отправка данных на сервер для сохранения в базе данных
        // Например, через fetch:
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, city, age }),
        }).then(() => {
            document.getElementById('registration').style.display = 'none';
            document.getElementById('goalSelection').style.display = 'block';
        });
    }
}

function selectGoal(goal) {
    document.getElementById('goalSelection').style.display = 'none';
    document.getElementById('finalGoalSelection').style.display = 'block';
    document.getElementById('finalGoalTitle').innerText = `Вы выбрали: ${goal}`;
}

function finishGoalSelection(goal) {
    // Логика для обработки выбора цели
    document.getElementById('finalGoalSelection').style.display = 'none';
    document.getElementById('depositPage').style.display = 'block';
}

function finishDeposit() {
    // Логика для обработки внесения депозита
    document.getElementById('depositPage').style.display = 'none';
    document.getElementById('mainInterface').style.display = 'block';
    document.getElementById('info').innerText = 'Депозит внесён. Добро пожаловать в основной интерфейс!';
}

function showProfile() {
    // Логика для отображения профиля
}

function showQueue() {
    // Логика для отображения очереди
}

function showPromotions() {
    // Логика для отображения акций
}
