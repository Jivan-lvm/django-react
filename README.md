# django-react биржа

Инструкция по запуску:

открыть командную строку и скопировать: git clone https://github.com/Jivan-lvm/django-react.git

перейти в директорию django-react: cd django-react

активировать виртуальное окружение: venv\Scipts\activate

перейти в директорию frontend: cd frontend

установить yarn: npm install yarn

выполнить команду: yarn install

в файле package_json.txt указано что скопировать в scripts для запуска

выполнить команды: yarn build и yarn start для запуска фронтенда

открыть второй терминал и перейти в директорию django-react: cd django-react

активировать виртуальное окружение: venv\Scipts\activate

перейти в директорию backend: cd backend

установить зависимости: pip install requirements.txt

скопироать команду: python manage.py runserver для запуска бэкенда

для запуска через docker

перейти в директорию django-react: cd django-react

активировать виртуальное окружение: venv\Scipts\activate

скопироать команду docker compose up --build
