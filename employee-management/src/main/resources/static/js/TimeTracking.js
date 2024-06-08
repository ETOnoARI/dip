document.addEventListener('DOMContentLoaded', function() {
    const timeRecordsTable = document.getElementById('timeRecordsTable').getElementsByTagName('tbody')[0];
    const dateInput = document.getElementById('dateInput');
    const addTimeRecordButton = document.getElementById('addTimeRecordButton');
    const addTimeRecordModal = document.getElementById('addTimeRecordModal');
    const addTimeRecordForm = document.getElementById('addTimeRecordForm');
    const managerControls = document.getElementById('managerControls');
    const userActions = document.getElementById('userActions');
    const addMyTimeRecordButton = document.getElementById('addMyTimeRecordButton');
    const addMyTimeRecordModal = document.getElementById('addMyTimeRecordModal');
    const addMyTimeRecordForm = document.getElementById('addMyTimeRecordForm');
    const myStartTimeInput = document.getElementById('myStartTimeInput');
    const myEndTimeInput = document.getElementById('myEndTimeInput');

    //  Пример  данных  (в  реальном  приложении  вы  будете  загружать  их  с  сервера)
    const timeRecordsData = [
        {
            "id": 1,
            "employeeId": 1,
            "date": "2024-08-06",
            "startTime": "09:00",
            "endTime": "18:00"
        },
        {
            "id": 2,
            "employeeId": 2,
            "date": "2024-08-06",
            "startTime": "10:00",
            "endTime": "19:00"
        },
        {
            "id": 3,
            "employeeId": 3,
            "date": "2024-08-06",
            "startTime": "08:00",
            "endTime": "17:00"
        },
        {
            "id": 4,
            "employeeId": 4,
            "date": "2024-08-06",
            "startTime": "09:30",
            "endTime": "18:30"
        },
        {
            "id": 5,
            "employeeId": 5,
            "date": "2024-08-06",
            "startTime": "10:00",
            "endTime": "19:00"
        }
    ];

    //  Пример  данных  о  сотрудниках  (в  реальном  приложении  вы  будете  загружать  их  с  сервера)
    const employeesData = [
        {
            "id": 1,
            "name": "Иванов Иван Иванович"
        },
        {
            "id": 2,
            "name": "Петрова Анна Сергеевна"
        },
        {
            "id": 3,
            "name": "Сидоров Сергей Петрович"
        },
        {
            "id": 4,
            "name": "Кузнецова Ольга Владимировна"
        },
        {
            "id": 5,
            "name": "Смирнов Дмитрий Александрович"
        }
    ];

    //  Проверяем  роль  пользователя  (в  реальном  приложении  вы  будете  использовать  localStorage  или  sessionStorage)
    const isManager = false; //  Изменить  на  false  для  обычного  пользователя

    //  Отображение  данных  в  таблице
    function displayTimeRecords(date) {
        timeRecordsTable.innerHTML = ''; 

        const filteredRecords = timeRecordsData.filter(record => record.date === date);

        filteredRecords.forEach(record => {
            const employee = employeesData.find(e => e.id === record.employeeId);
            const row = timeRecordsTable.insertRow();
            const employeeCell = row.insertCell();
            const startTimeCell = row.insertCell();
            const endTimeCell = row.insertCell();
            const workedHoursCell = row.insertCell();
            const actionsCell = row.insertCell();

            employeeCell.textContent = employee.name;
            startTimeCell.textContent = record.startTime;
            endTimeCell.textContent = record.endTime;
            workedHoursCell.textContent = calculateWorkedHours(record.startTime, record.endTime);

            if (isManager) {
                actionsCell.innerHTML = `
                    <a href="#" class="action-button edit-button" data-record-id="${record.id}">Редактировать</a>
                    <a href="#" class="action-button delete-button" data-record-id="${record.id}">Удалить</a>
                `;
            }
        });
    }

    //  Функция  для  открытия  модального  окна  "Добавить  запись"
    function openAddTimeRecordModal() {
        addTimeRecordModal.style.display = 'block';
    }

    //  Функция  для  закрытия  модального  окна  "Добавить  запись"
    function closeAddTimeRecordModal() {
        addTimeRecordModal.style.display = 'none';
    }

    //  Функция  для  открытия  модального  окна  "Добавить  свою  запись"
    function openAddMyTimeRecordModal() {
        addMyTimeRecordModal.style.display = 'block';
    }

    //  Функция  для  закрытия  модального  окна  "Добавить  свою  запись"
    function closeAddMyTimeRecordModal() {
        addMyTimeRecordModal.style.display = 'none';
    }

    //  Функция  для  расчета  отработанных  часов
    function calculateWorkedHours(startTime, endTime) {
        const startHours = parseInt(startTime.slice(0, 2));
        const startMinutes = parseInt(startTime.slice(3, 5));
        const endHours = parseInt(endTime.slice(0, 2));
        const endMinutes = parseInt(endTime.slice(3, 5));

        let workedHours = endHours - startHours;
        let workedMinutes = endMinutes - startMinutes;

        if (workedMinutes < 0) {
            workedHours--;
            workedMinutes += 60;
        }

        return `${workedHours}:${workedMinutes.toString().padStart(2, '0')}`;
    }

    //  Функция  для  открытия  модального  окна  "Редактировать  запись"
    function openEditTimeRecordModal(recordId) {
        editTimeRecordModal.style.display = 'block';
        //  Заполняем  форму  данными  записи
        const record = timeRecordsData.find(r => r.id === recordId);
        document.getElementById('timeRecordId').value = recordId; 
        document.getElementById('employeeSelect').value = record.employeeId;
        document.getElementById('startTimeInput').value = record.startTime;
        document.getElementById('endTimeInput').value = record.endTime;
    }

    //  Функция  для  закрытия  модального  окна  "Редактировать  запись"
    function closeEditTimeRecordModal() {
        editTimeRecordModal.style.display = 'none';
    }

    //  Инициализация  страницы  при  загрузке
    displayTimeRecords(dateInput.value);

    //  Обработчик  изменения  даты
    dateInput.addEventListener('change', function() {
        displayTimeRecords(this.value);
    });

    //  Проверка  роли  пользователя  (в  реальном  приложении  вы  будете  использовать  localStorage  или  sessionStorage)
    if (isManager) {
        managerControls.style.display = 'block'; 
        addTimeRecordButton.addEventListener('click', openAddTimeRecordModal);
    } else {
        userActions.style.display = 'block';
        addMyTimeRecordButton.addEventListener('click', openAddMyTimeRecordModal); 
    }

    //  Обработка  формы  "Добавить  запись"
    addTimeRecordForm.addEventListener('submit', function(event) {
        event.preventDefault();

        //  Получаем  данные  из  формы
        const employeeId = document.getElementById('employeeSelect').value;
        const startTime = document.getElementById('startTimeInput').value;
        const endTime = document.getElementById('endTimeInput').value;
        const selectedDate = dateInput.value;

        //  В  реальном  приложении  вы  отправите  запрос  на  сервер  с  помощью  AJAX
        console.log('Добавление  записи  о  рабочем  времени:', employeeId, startTime, endTime, selectedDate);

        //  Закрываем  модальное  окно
        closeAddTimeRecordModal();

        //  Обновляем  таблицу  (в  реальном  приложении  вы  получите  данные  с  сервера  и  обновите  таблицу)
        timeRecordsData.push({
            "id": timeRecordsData.length + 1, //  Генерируем  id  (в  реальном  приложении  id  будет  генерироваться  на  сервере)
            "employeeId": parseInt(employeeId),
            "date": selectedDate,
            "startTime": startTime,
            "endTime": endTime
        });

        displayTimeRecords(selectedDate);
    });

    //  Обработка  формы  "Добавить  свою  запись"
    addMyTimeRecordForm.addEventListener('submit', function(event) {
        event.preventDefault();
        //  Получаем  данные  из  формы
        const myStartTime = myStartTimeInput.value;
        const myEndTime = myEndTimeInput.value;
        const selectedDate = dateInput.value;
        const userId = 1; //  Идентификатор  текущего  пользователя  (в  реальном  приложении  получайте  его  с  сервера)

        //  В  реальном  приложении  вы  отправите  запрос  на  сервер  с  помощью  AJAX
        console.log('Добавление  записи  о  рабочем  времени:', userId, myStartTime, myEndTime, selectedDate);

        //  Закрываем  модальное  окно
        closeAddMyTimeRecordModal();

        //  Обновляем  таблицу  (в  реальном  приложении  вы  получите  данные  с  сервера  и  обновите  таблицу)
        timeRecordsData.push({
            "id": timeRecordsData.length + 1, //  Генерируем  id  (в  реальном  приложении  id  будет  генерироваться  на  сервере)
            "employeeId": userId,
            "date": selectedDate,
            "startTime": myStartTime,
            "endTime": myEndTime
        });

        displayTimeRecords(selectedDate);
    });

    //  Обработчик  события  для  таблицы  (редактирование  и  удаление)
    timeRecordsTable.addEventListener('click', function(event) {
        if (event.target.classList.contains('edit-button')) {
            const recordId = event.target.dataset.recordId;
            openEditTimeRecordModal(recordId);
        } else if (event.target.classList.contains('delete-button')) {
            const recordId = event.target.dataset.recordId;
            //  В  реальном  приложении  вы  отправите  запрос  на  сервер  с  помощью  AJAX
            console.log('Удаление  записи  о  рабочем  времени:', recordId);
            //  Обновляем  таблицу
            timeRecordsData.splice(timeRecordsData.findIndex(r => r.id === recordId), 1);
            displayTimeRecords(dateInput.value);
        }
    });

    //  Обработка  формы  "Редактировать  запись"
    editTimeRecordForm.addEventListener('submit', function(event) {
        event.preventDefault();
        //  Получаем  данные  из  формы
        const timeRecordId = document.getElementById('timeRecordId').value;
        const employeeId = document.getElementById('employeeSelect').value;
        const startTime = document.getElementById('startTimeInput').value;
        const endTime = document.getElementById('endTimeInput').value;
        const selectedDate = dateInput.value;

        //  В  реальном  приложении  вы  отправите  запрос  на  сервер  с  помощью  AJAX
        console.log('Редактирование  записи  о  рабочем  времени:', timeRecordId, employeeId, startTime, endTime, selectedDate);

        //  Закрываем  модальное  окно
        closeEditTimeRecordModal();

        //  Обновляем  таблицу  (в  реальном  приложении  вы  получите  данные  с  сервера  и  обновите  таблицу)
        const recordIndex = timeRecordsData.findIndex(r => r.id === parseInt(timeRecordId));
        timeRecordsData[recordIndex].employeeId = parseInt(employeeId);
        timeRecordsData[recordIndex].startTime = startTime;
        timeRecordsData[recordIndex].endTime = endTime;
        displayTimeRecords(selectedDate);
    });
});