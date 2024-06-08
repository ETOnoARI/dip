document.addEventListener('DOMContentLoaded', function() {
    //  Пример  данных  (в  реальном  приложении  вы  будете  загружать  их  с  сервера)
    const employeesData = [
        {
            "id": 1,
            "photo": "src/user.png",
            "name": "Иванов Иван Иванович",
            "position": "Менеджер",
            "department": "Отдел продаж",
            "hireDate": "2023-05-15"
        },
        {
            "id": 2,
            "photo": "src/user.png",
            "name": "Петрова Анна Сергеевна",
            "position": "Разработчик",
            "department": "Отдел разработки",
            "hireDate": "2022-10-20"
        },
        {
            "id": 3,
            "photo": "src/user.png",
            "name": "Сидоров Сергей Петрович",
            "position": "Дизайнер",
            "department": "Отдел дизайна",
            "hireDate": "2023-02-01"
        },
        {
            "id": 4,
            "photo": "src/user.png",
            "name": "Кузнецова Ольга Владимировна",
            "position": "Менеджер по персоналу",
            "department": "Отдел кадров",
            "hireDate": "2022-08-10"
        },
        {
            "id": 5,
            "photo": "src/user.png",
            "name": "Смирнов Дмитрий Александрович",
            "position": "Старший разработчик",
            "department": "Отдел разработки",
            "hireDate": "2021-06-15"
        },
        {
            "id": 6,
            "photo": "src/user.png",
            "name": "Попова Екатерина Ивановна",
            "position": "Маркетолог",
            "department": "Отдел маркетинга",
            "hireDate": "2023-01-25"
        }
    ];

    const employeesTable = document.getElementById('employeesTable').getElementsByTagName('tbody')[0];
    const currentPageSpan = document.getElementById('currentPage');
    const totalPagesSpan = document.getElementById('totalPages');
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');
    const addEmployeeButton = document.getElementById('addEmployeeButton');
    const addEmployeeModal = document.getElementById('addEmployeeModal');
    const editEmployeeModal = document.getElementById('editEmployeeModal');
    const deleteEmployeeModal = document.getElementById('deleteEmployeeModal');
    const employeeDetailsModal = document.getElementById('employeeDetailsModal');
    const addEmployeeForm = document.getElementById('addEmployeeForm');
    const editEmployeeForm = document.getElementById('editEmployeeForm');
    const employeeDetailsContent = document.getElementById('employeeDetailsContent');

    let currentPage = 1;
    const itemsPerPage = 5; //  Количество  элементов  на  странице
    let totalPages = Math.ceil(employeesData.length / itemsPerPage);

    totalPagesSpan.textContent = totalPages;

    //  Проверяем  роль  пользователя  (в  реальном  приложении  вы  будете  использовать  localStorage  или  sessionStorage)
    const isManager = true; //  Изменить  на  false  для  обычного  пользователя

    function displayEmployees(data, page) {
        employeesTable.innerHTML = ''; //  Очищаем  таблицу  перед  заполнением

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const displayedEmployees = data.slice(startIndex, endIndex);

        displayedEmployees.forEach(employee => {
            const row = employeesTable.insertRow();
            const photoCell = row.insertCell();
            const nameCell = row.insertCell();
            const positionCell = row.insertCell();
            const departmentCell = row.insertCell();
            const hireDateCell = row.insertCell();
            const actionsCell = row.insertCell();

            photoCell.innerHTML = `<img src="${employee.photo}" alt="Фото сотрудника" width="40" height="40">`;
            nameCell.textContent = employee.name;
            positionCell.textContent = employee.position;
            departmentCell.textContent = employee.department;
            hireDateCell.textContent = employee.hireDate;

            //  Проверяем  роль  пользователя  (используем  уже  определенную  isManager)
            if (isManager) {
                actionsCell.innerHTML = `
                    <a href="#" class="action-button" id="detailsButton" data-employee-id="${employee.id}">Подробнее</a>
                    <a href="#" class="action-button edit-button" id="editButton" data-employee-id="${employee.id}">Редактировать</a>
                    <a href="#" class="action-button delete-button" id="deleteButton" data-employee-id="${employee.id}">Удалить</a>
                `;
            } else {
                actionsCell.innerHTML = `
                    <a href="#" class="action-button" id="detailsButton" data-employee-id="${employee.id}">Подробнее</a>
                `;
            }
        });
    }

    displayEmployees(employeesData, currentPage);

    //  Пагинация
    prevPageButton.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            currentPageSpan.textContent = currentPage;
            displayEmployees(employeesData, currentPage);
        }
        updatePaginationButtons();
    });

    nextPageButton.addEventListener('click', function() {
        if (currentPage < totalPages) {
            currentPage++;
            currentPageSpan.textContent = currentPage;
            displayEmployees(employeesData, currentPage);
        }
        updatePaginationButtons();
    });

    function updatePaginationButtons() {
        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = currentPage === totalPages;
    }

    //  Модальное окно для добавления сотрудника
    function openAddEmployeeModal() {
        addEmployeeModal.style.display = 'block';
    }

    function closeAddEmployeeModal() {
        addEmployeeModal.style.display = 'none';
    }

    function openEditEmployeeModal(employeeId) {
        editEmployeeModal.style.display = 'block';
        //  Заполняем  форму  данными  сотрудника
        const employee = employeesData.find(e => e.id === employeeId);
        document.getElementById('employeeId').value = employeeId; 
        document.getElementById('employeeName').value = employee.name;
        document.getElementById('employeePosition').value = employee.position;
        document.getElementById('employeeDepartment').value = employee.department;
        document.getElementById('employeeHireDate').value = employee.hireDate;
    }

    function closeEditEmployeeModal() {
        editEmployeeModal.style.display = 'none';
    }

    function openDeleteEmployeeModal(employeeId) {
        deleteEmployeeModal.style.display = 'block';
        document.getElementById('employeeId').value = employeeId; 
    }

    function closeDeleteEmployeeModal() {
        deleteEmployeeModal.style.display = 'none';
    }

    function deleteEmployee() {
        const employeeId = document.getElementById('employeeId').value;
        //  В  реальном  приложении  вы  отправите  запрос  на  сервер  с  помощью  AJAX
        console.log('Удаление  сотрудника:', employeeId);
        //  Обновляем  таблицу
        employeesData.splice(employeesData.findIndex(e => e.id === employeeId), 1);
        totalPages = Math.ceil(employeesData.length / itemsPerPage);
        totalPagesSpan.textContent = totalPages;
        displayEmployees(employeesData, currentPage);
        updatePaginationButtons();
        closeDeleteEmployeeModal();
    }

    function openEmployeeDetailsModal(employeeId) {
        employeeDetailsModal.style.display = 'block';

        const employee = employeesData.find(e => e.id === employeeId);
        employeeDetailsContent.innerHTML = `
            <div class="employee-details">
                <img src="${employee.photo}" alt="Фото сотрудника" class="employee-photo">
                <div class="employee-info">
                    <h3>${employee.name}</h3>
                    <p>Должность: ${employee.position}</p>
                    <p>Отдел: ${employee.department}</p>
                    <p>Дата приема: ${employee.hireDate}</p>
                </div>
            </div>
        `;
    }

    function closeEmployeeDetailsModal() {
        employeeDetailsModal.style.display = 'none';
    }

    //  Обработка  форм  модальных  окон
    addEmployeeForm.addEventListener('submit', function(event) {
        event.preventDefault();
        //  Получаем  данные  из  формы
        const employeeName = document.getElementById('employeeName').value;
        const employeePosition = document.getElementById('employeePosition').value;
        const employeeDepartment = document.getElementById('employeeDepartment').value;
        const employeeHireDate = document.getElementById('employeeHireDate').value;

        //  В  реальном  приложении  вы  отправите  запрос  на  сервер  с  помощью  AJAX
        console.log('Добавление  сотрудника:', employeeName, employeePosition, employeeDepartment, employeeHireDate);

        //  Закрываем  модальное  окно
        closeAddEmployeeModal();

        //  Обновляем  таблицу  (в  реальном  приложении  вы  получите  данные  с  сервера  и  обновите  таблицу)
        employeesData.push({
            "id": employeesData.length + 1, //  Генерируем  id  (в  реальном  приложении  id  будет  генерироваться  на  сервере)
            "photo": "src/user.png", 
            "name": employeeName,
            "position": employeePosition,
            "department": employeeDepartment,
            "hireDate": employeeHireDate
        });

        totalPages = Math.ceil(employeesData.length / itemsPerPage);
        totalPagesSpan.textContent = totalPages;
        displayEmployees(employeesData, currentPage);
        updatePaginationButtons();
    });

    editEmployeeForm.addEventListener('submit', function(event) {
        event.preventDefault();
        //  Получаем  данные  из  формы
        const employeeId = document.getElementById('employeeId').value;
        const employeeName = document.getElementById('employeeName').value;
        const employeePosition = document.getElementById('employeePosition').value;
        const employeeDepartment = document.getElementById('employeeDepartment').value;
        const employeeHireDate = document.getElementById('employeeHireDate').value;

        //  В  реальном  приложении  вы  отправите  запрос  на  сервер  с  помощью  AJAX
        console.log('Редактирование  сотрудника:', employeeId, employeeName, employeePosition, employeeDepartment, employeeHireDate);

        //  Закрываем  модальное  окно
        closeEditEmployeeModal();

        //  Обновляем  таблицу  (в  реальном  приложении  вы  получите  данные  с  сервера  и  обновите  таблицу)
        const employeeIndex = employeesData.findIndex(e => e.id === parseInt(employeeId));
        employeesData[employeeIndex].name = employeeName;
        employeesData[employeeIndex].position = employeePosition;
        employeesData[employeeIndex].department = employeeDepartment;
        employeesData[employeeIndex].hireDate = employeeHireDate;
        displayEmployees(employeesData, currentPage);
    });

    //  Проверяем  роль  пользователя  (используем  уже  определенную  isManager)
    if (isManager) {
        addEmployeeButton.style.display = 'inline-block'; //  Отображаем  кнопку
    } else {
        addEmployeeButton.style.display = 'none'; //  Скрываем  кнопку
    }

    //  Обработчики  событий  для  кнопок  "Редактировать"  и  "Удалить"
    employeesTable.addEventListener('click', function(event) {
        if (event.target.classList.contains('edit-button')) {
            const employeeId = event.target.dataset.employeeId;
            openEditEmployeeModal(employeeId);
        } else if (event.target.classList.contains('delete-button')) {
            const employeeId = event.target.dataset.employeeId;
            openDeleteEmployeeModal(employeeId);
        } else if (event.target.classList.contains('details-button')) {
            const employeeId = event.target.dataset.employeeId;
            openEmployeeDetailsModal(employeeId);
        }
    });

    //  Добавляем  кнопку  "Добавить  сотрудника"  в  HTML
    addEmployeeButton.addEventListener('click', openAddEmployeeModal);
});