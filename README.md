# Mini Todo API 🚀

Простое REST API для управления задачами (todo), написанное на Node.js с использованием Express и MongoDB.

## 📌 Возможности

- **CRUD операций для задач** (создание, чтение, обновление, удаление)
- Защищенные маршруты с JWT

## 🛠 Технологии

- **Node.js** (среда выполнения)
- **Express.js** (веб-фреймворк)
- **MongoDB** (база данных)
- **Mongoose** (ODM для MongoDB)

## ⚙️ Установка

1. Клонируйте репозиторий:
   ```sh
   git clone https://github.com/atabekdeveloper/mini-todo-api.git
   cd mini-todo-api
   ```

2. Установите зависимости:
   ```sh
   npm install
   ```

3. Создайте файл `.env` в корне проекта и укажите настройки:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Запустите сервер:
   ```sh
   npm start
   ```

   Для разработки с hot-reload:
   ```sh
   npm run dev
   ```

## 📡 API Endpoints

### Задачи (требуют аутентификации)

| Метод | Эндпоинт     | Описание                |
|-------|--------------|------------------------|
| GET   | `/todos`     | Получить все задачи    |
| GET   | `/todos/:id` | Получить задачу по ID  |
| POST  | `/todos/create`    | Создать новую задачу   |
| PUT   | `/todos/:id` | Обновить задачу        |
| DELETE| `/todos/:id` | Удалить задачу         |

## 📂 Структура проекта

```
mini-todo-api/
├── config/          # Конфигурации
├── controllers/     # Логика обработки запросов
├── middlewares/     # Промежуточное ПО
├── models/          # Модели MongoDB
├── routes/          # Маршруты API
└── server.js        # Точка входа
```