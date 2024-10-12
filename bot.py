import sqlite3
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes

# Функция для подключения к базе данных
def db_connect():
    conn = sqlite3.connect('app.db')
    return conn

# Функция для добавления пользователя в базу данных
def add_user_to_db(user_id: int, name: str):
    conn = db_connect()
    cursor = conn.cursor()
    cursor.execute('INSERT OR IGNORE INTO users (user_id, name) VALUES (?, ?)', (user_id, name))
    conn.commit()
    conn.close()

# Обработчик команды /start
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user_id = update.message.from_user.id
    user_name = update.message.from_user.first_name

    # Добавляем пользователя в базу данных
    add_user_to_db(user_id, user_name)

    keyboard = [
        [
            InlineKeyboardButton("Открыть приложение", web_app=dict(url="https://xstarte.github.io/xxstarterr/"))
        ]
    ]

    reply_markup = InlineKeyboardMarkup(keyboard)

    await update.message.reply_text("Привет! Нажмите кнопку ниже, чтобы открыть приложение.", reply_markup=reply_markup)

if __name__ == "__main__":
    application = ApplicationBuilder().token("7913588189:AAEBcihvf0vvtCLS4sW16ZHD372NucDuWgg").build()

    application.add_handler(CommandHandler("start", start))

    application.run_polling()