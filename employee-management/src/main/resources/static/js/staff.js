document.addEventListener('DOMContentLoaded', function() {
    const employeeId = 1; //  Получите  employeeId  с  URL  или  из  другого  источника

    const employeePhoto = document.getElementById('employeePhoto');
    const employeeName = document.getElementById('employeeName');
    const employeePosition = document.getElementById('employeePosition');
    const employeeDepartment = document.getElementById('employeeDepartment');
    const employeeHireDate = document.getElementById('employeeHireDate');
    const employeeStatus = document.getElementById('employeeStatus');
    const employeePhone = document.getElementById('employeePhone');
    const employeeEmail = document.getElementById('employeeEmail');
    const employeeBirthDate = document.getElementById('employeeBirthDate');
    const employeeAddress = document.getElementById('employeeAddress');
    const employeeSalary = document.getElementById('employeeSalary');

    const vacationRequestsTable = document.getElementById('vacationRequestsTable').getElementsByTagName('tbody')[0];
    const sickLeavesTable = document.getElementById('sickLeavesTable').getElementsByTagName('tbody')[0];
    const tasksTable = document.getElementById('tasksTable').getElementsByTagName('tbody')[0];
    const projectsTable = document.getElementById('projectsTable').getElementsByTagName('tbody')[0]; 

    const editEmployeeButton = document.getElementById('editEmployeeButton');
    const deleteEmployeeButton = document.getElementById('deleteEmployeeButton');
    const editEmployeeModal = document.getElementById('editEmployeeModal');
    const deleteEmployeeModal = document.getElementById('deleteEmployeeModal');
    const editEmployeeForm = document.getElementById('editEmployeeForm');

    //  Пример  данных  (в  реальном  приложении  вы  будете  загружать  их  с  сервера)
    const employeesData = [
        {
            "id": 1,
            "photo": "src/user.png",
            "name": "Иванов Иван Иванович",
            "position": "Frontend разработчик",
            "department": "Отдел разработки",
            "hireDate": "2023-05-15",
            "status": "Работает", 
            "phone": "+7 (123) 456-78-90",
            "email": "ivanov@example.com", 
            "birthDate": "1990-01-01",
            "address": "г. Москва, ул. Ленина, д. 1", 
            "salary": 60000, 
            "projects": [
                {
                    "name": "Проект Аврора",
                    "description": "Разработка веб-сайта для компании Аврора",
                    "role": "Frontend разработчик"
                },
                {
                    "name": "Проект Бета",
                    "description": "Редизайн мобильного приложения",
                    "role": "Frontend разработчик"
                },
                {
                    "name": "Проект Гамма",
                    "description": "Создание лендинга для нового продукта",
                    "role": "Frontend разработчик"
                }
            ],
            "tasks": [
                {
                    "id": 1,
                    "title": "Разработка компонента Header",
                    "deadline": "2024-08-20",
                    "status": "completed" 
                },
                {
                    "id": 2,
                    "title": "Рефакторинг кода модуля Login",
                    "deadline": "2024-08-25",
                    "status": "inProgress" 
                },
                {
                    "id": 3,
                    "title": "Доработка функционала Checkout",
                    "deadline": "2024-08-30",
                    "status": "pending" 
                }
            ]
        },
        //  ...  другие  сотрудники
    ];

    const vacationRequestsData = [
        {
            "employeeId": 1, 
            "startDate": "2024-08-01",
            "endDate": "2024-08-05",
            "type": "paid", 
            "status": "approved" //  approved,  pending,  rejected 
        },
        //  ...  другие  заявки  на  отпуск
    ];
    
    const sickLeavesData = [
        {
            "employeeId": 1, 
            "startDate": "2024-08-10",
            "endDate": "2024-08-14", 
            "status": "approved" 
        },
        //  ...  другие  больничные
    ];
    
    const tasksData = [
        {
            "id": 1,
            "employeeId": 1,  //  Добавьте  employeeId  в  массив  задач
            "title": "Разработка компонента Header",
            "deadline": "2024-08-20",
            "status": "completed" 
        },
        {
            "id": 2,
            "employeeId": 1,  //  Добавьте  employeeId  в  массив  задач
            "title": "Рефакторинг кода модуля Login",
            "deadline": "2024-08-25",
            "status": "inProgress" 
        },
        {
            "id": 3,
            "employeeId": 1, //  Добавьте  employeeId  в  массив  задач
            "title": "Доработка функционала Checkout",
            "deadline": "2024-08-30",
            "status": "pending" 
        },
        //  ...  другие  задачи
    ];

    //  Проверяем  роль  пользователя  (в  реальном  приложении  вы  будете  использовать  localStorage  или  sessionStorage)
    const isManager = true; //  Изменить  на  false  для  обычного  пользователя
    const managerControls = document.getElementById('managerControls');

    //  Функция  для  отображения  информации  о  сотруднике
    function displayEmployeeInfo(employeeId) {
        const employee = employeesData.find(e => e.id === employeeId);
        if (employee) {
            employeePhoto.src = employee.photo;
            employeeName.textContent = employee.name;
            employeePosition.textContent = employee.position;
            employeeDepartment.textContent = employee.department;
            employeeHireDate.textContent = employee.hireDate;
            employeeStatus.textContent = employee.status;
            employeePhone.textContent = employee.phone;
            employeeEmail.textContent = employee.email;
            employeeBirthDate.textContent = employee.birthDate; 
            employeeAddress.textContent = employee.address; 
            employeeSalary.textContent = employee.salary + ' руб.'; 
        }
    }

    //  Функция  для  отображения  заявок  на  отпуск
    function displayVacationRequests(employeeId) {
        vacationRequestsTable.innerHTML = ''; 

        const filteredVacationRequests = vacationRequestsData.filter(request => request.employeeId === employeeId);

        filteredVacationRequests.forEach(request => {
            const row = vacationRequestsTable.insertRow();
            const startDateCell = row.insertCell();
            const endDateCell = row.insertCell();
            const typeCell = row.insertCell();
            const statusCell = row.insertCell();

            startDateCell.textContent = request.startDate;
            endDateCell.textContent = request.endDate;
            typeCell.textContent = request.type;
            statusCell.textContent = request.status;
        });
    }

    //  Функция  для  отображения  больничных
    function displaySickLeaves(employeeId) {
        sickLeavesTable.innerHTML = '';

        const filteredSickLeaves = sickLeavesData.filter(sickLeave => sickLeave.employeeId === employeeId);

        filteredSickLeaves.forEach(sickLeave => {
            const row = sickLeavesTable.insertRow();
            const startDateCell = row.insertCell();
            const endDateCell = row.insertCell();
            const statusCell = row.insertCell();

            startDateCell.textContent = sickLeave.startDate;
            endDateCell.textContent = sickLeave.endDate;
            statusCell.textContent = sickLeave.status; 
        });
    }

    //  Функция  для  отображения  задач
    function displayTasks(employeeId) {
        tasksTable.innerHTML = ''; 

        const filteredTasks = tasksData.filter(task => task.employeeId === employeeId); 

        filteredTasks.forEach(task => {
            const row = tasksTable.insertRow();
            const titleCell = row.insertCell();
            const deadlineCell = row.insertCell();
            const statusCell = row.insertCell();

            titleCell.textContent = task.title;
            deadlineCell.textContent = task.deadline;
            statusCell.textContent = task.status;
        });
    }

    //  Функция  для  отображения  проектов
    function displayProjects(employeeId) {
        projectsTable.innerHTML = '';

        const employee = employeesData.find(e => e.id === employeeId);

        if (employee && employee.projects) {
            employee.projects.forEach(project => {
                const row = projectsTable.insertRow();
                const nameCell = row.insertCell();
                const descriptionCell = row.insertCell();
                const roleCell = row.insertCell();

                nameCell.textContent = project.name;
                descriptionCell.textContent = project.description;
                roleCell.textContent = project.role;
            });
        }
    }

    //  Функция  для  открытия  модального  окна  "Редактировать  сотрудника"
    function openEditEmployeeModal() {
        editEmployeeModal.style.display = 'block';
        //  Заполняем  форму  данными  сотрудника
        const employee = employeesData.find(e => e.id === employeeId);
        if (employee) {
            document.getElementById('employeeId').value = employeeId; 
            document.getElementById('employeeName').value = employee.name;
            document.getElementById('employeePosition').value = employee.position;
            document.getElementById('employeeDepartment').value = employee.department;
            document.getElementById('employeeHireDate').value = employee.hireDate;
            document.getElementById('employeePhone').value = employee.phone; 
            document.getElementById('employeeEmail').value = employee.email;
            document.getElementById('employeeBirthDate').value = employee.birthDate; 
            document.getElementById('employeeAddress').value = employee.address; 
            document.getElementById('employeeSalary').value = employee.salary; 
        }
    }

    //  Функция  для  закрытия  модального  окна  "Редактировать  сотрудника"
    function closeEditEmployeeModal() {
        editEmployeeModal.style.display = 'none';
    }

    //  Функция  для  открытия  модального  окна  "Удалить  сотрудника"
    function openDeleteEmployeeModal() {
        deleteEmployeeModal.style.display = 'block';
        document.getElementById('employeeId').value = employeeId; 
    }

    //  Функция  для  закрытия  модального  окна  "Удалить  сотрудника"
    function closeDeleteEmployeeModal() {
        deleteEmployeeModal.style.display = 'none';
    }

    //  Функция  для  удаления  сотрудника
    function deleteEmployee() {
        const employeeId = document.getElementById('employeeId').value;
        //  В  реальном  приложении  вы  отправите  запрос  на  сервер  с  помощью  AJAX
        console.log('Удаление  сотрудника:', employeeId);
        //  Обновляем  страничку (в  реальном  приложении  перенаправьте  на  другую  страничку) 
        // window.location.href = 'employees.html';
    }

    //  Инициализация  страницы  при  загрузке
    displayEmployeeInfo(employeeId);
    displayVacationRequests(employeeId);
    displaySickLeaves(employeeId);
    displayTasks(employeeId);
    displayProjects(employeeId);

    //  Проверяем  роль  пользователя  (в  реальном  приложении  вы  будете  использовать  localStorage  или  sessionStorage)
    if (isManager) {
        editEmployeeButton.style.display = 'inline-block'; 
        deleteEmployeeButton.style.display = 'inline-block';
        managerControls.style.display = 'block'; 

        //  Обработчик  события  для  кнопки  "Редактировать  сотрудника"
        editEmployeeButton.addEventListener('click', openEditEmployeeModal);

        //  Обработчик  события  для  кнопки  "Удалить  сотрудника"
        deleteEmployeeButton.addEventListener('click', openDeleteEmployeeModal);

        //  Обработка  формы  "Редактировать  сотрудника"
        editEmployeeForm.addEventListener('submit', function(event) {
            event.preventDefault();
            //  Получаем  данные  из  формы
            const employeeId = document.getElementById('employeeId').value;
            const employeeName = document.getElementById('employeeName').value;
            const employeePosition = document.getElementById('employeePosition').value;
            const employeeDepartment = document.getElementById('employeeDepartment').value;
            const employeeHireDate = document.getElementById('employeeHireDate').value;
            const employeePhone = document.getElementById('employeePhone').value; 
            const employeeEmail = document.getElementById('employeeEmail').value;
            const employeeBirthDate = document.getElementById('employeeBirthDate').value; 
            const employeeAddress = document.getElementById('employeeAddress').value; 
            const employeeSalary = document.getElementById('employeeSalary').value; 

            //  В  реальном  приложении  вы  отправите  запрос  на  сервер  с  помощью  AJAX
            console.log('Редактирование  сотрудника:', employeeId, employeeName, employeePosition, employeeDepartment, employeeHireDate, employeePhone, employeeEmail, employeeBirthDate, employeeAddress, employeeSalary);

            //  Закрываем  модальное  окно
            closeEditEmployeeModal();

            //  Обновляем  страничку  (в  реальном  приложении  вы  получите  данные  с  сервера  и  обновите  страничку)
            const employeeIndex = employeesData.findIndex(e => e.id === parseInt(employeeId));
            employeesData[employeeIndex].name = employeeName;
            employeesData[employeeIndex].position = employeePosition;
            employeesData[employeeIndex].department = employeeDepartment;
            employeesData[employeeIndex].hireDate = employeeHireDate;
            employeesData[employeeIndex].phone = employeePhone; 
            employeesData[employeeIndex].email = employeeEmail;
            employeesData[employeeIndex].birthDate = employeeBirthDate; 
            employeesData[employeeIndex].address = employeeAddress; 
            employeesData[employeeIndex].salary = employeeSalary; 

            displayEmployeeInfo(employeeId); 
        });
    } else {
        editEmployeeButton.style.display = 'none';
        deleteEmployeeButton.style.display = 'none';
        managerControls.style.display = 'none'; 
    }
});