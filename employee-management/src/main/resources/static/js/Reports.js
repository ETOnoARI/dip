document.addEventListener('DOMContentLoaded', function() {
    const reportTypeSelect = document.getElementById('reportType');
    const reportFiltersContainer = document.getElementById('reportFilters');
    const generateReportButton = document.getElementById('generateReportButton');
    const reportContent = document.getElementById('reportContent');

    //  Пример  данных  (в  реальном  приложении  вы  будете  загружать  их  с  сервера)
    const employeesData = [
        {
            "id": 1,
            "name": "Иванов Иван Иванович",
            "position": "Менеджер",
            "department": "Отдел продаж",
            "hireDate": "2023-05-15"
        },
        {
            "id": 2,
            "name": "Петрова Анна Сергеевна",
            "position": "Разработчик",
            "department": "Отдел разработки",
            "hireDate": "2022-10-20"
        },
        // ... другие  сотрудники
    ];

    const vacationsData = [
        {
            "employeeId": 1,
            "startDate": "2024-08-01",
            "endDate": "2024-08-05",
            "type": "paid" 
        },
        // ... другие  отпуска
    ];

    const sickLeavesData = [
        {
            "employeeId": 2,
            "startDate": "2024-08-10",
            "endDate": "2024-08-14" 
        },
        // ... другие  больничные
    ];

    const payrollData = [
        {
            "employeeId": 1,
            "date": "2024-08",
            "salary": 30000,
            "workedHours": 160,
            "bonus": 5000,
            "deductions": 1000
        },
        // ... другие  зарплаты
    ];

    const tasksData = [
        {
            "id": 1,
            "title": "Подготовка отчета по маркетингу",
            "executor": "Сидоров Сергей Петрович",
            "deadline": "2024-08-20",
            "status": "inProgress" //  inProgress,  completed,  pending 
        },
        // ... другие  задачи
    ];

    const documentsData = [
        {
            "id": 1,
            "type": "ОРД",
            "date": "2024-08-05"
        },
        // ... другие  документы
    ];

     //  Функция  для  генерации  отчета  
     function generateReport(reportType, filters) {
        reportContent.innerHTML = '';

        let reportContentHTML = '';

        switch (reportType) {
            case 'employees':
                //  Генерация  отчета  по  сотрудникам
                const filteredEmployees = filterEmployees(employeesData, filters);
                reportContentHTML = `
                    <h2>Отчет по сотрудникам</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ФИО</th>
                                <th>Должность</th>
                                <th>Отдел</th>
                                <th>Дата приема</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${filteredEmployees.map(employee => `
                                <tr>
                                    <td>${employee.name}</td>
                                    <td>${employee.position}</td>
                                    <td>${employee.department}</td>
                                    <td>${employee.hireDate}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                `;
                break;
            case 'vacations':
                //  Генерация  отчета  по  отпускам
                const filteredVacations = filterVacations(vacationsData, filters);
                reportContentHTML = `
                    <h2>Отчет по отпускам</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ФИО</th>
                                <th>Тип отпуска</th>
                                <th>Дата начала</th>
                                <th>Дата окончания</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${filteredVacations.map(vacation => {
                                const employee = employeesData.find(e => e.id === vacation.employeeId);
                                return `
                                    <tr>
                                        <td>${employee ? employee.name : 'Неизвестный сотрудник'}</td>
                                        <td>${vacation.type}</td>
                                        <td>${vacation.startDate}</td>
                                        <td>${vacation.endDate}</td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                `;
                break;
            case 'sickLeaves':
                //  Генерация  отчета  по  больничным
                const filteredSickLeaves = filterSickLeaves(sickLeavesData, filters);
                reportContentHTML = `
                    <h2>Отчет по больничным</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ФИО</th>
                                <th>Дата начала</th>
                                <th>Дата окончания</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${filteredSickLeaves.map(sickLeave => {
                                const employee = employeesData.find(e => e.id === sickLeave.employeeId);
                                return `
                                    <tr>
                                        <td>${employee ? employee.name : 'Неизвестный сотрудник'}</td>
                                        <td>${sickLeave.startDate}</td>
                                        <td>${sickLeave.endDate}</td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                `;
                break;
            case 'payroll':
                //  Генерация  отчета  по  зарплате
                const filteredPayroll = filterPayroll(payrollData, filters);
                reportContentHTML = `
                    <h2>Отчет по зарплате</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ФИО</th>
                                <th>Оклад</th>
                                <th>Отработано часов</th>
                                <th>Премии</th>
                                <th>Удержания</th>
                                <th>Итого к выплате</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${filteredPayroll.map(payrollRecord => {
                                const employee = employeesData.find(e => e.id === payrollRecord.employeeId);
                                const totalSalary = calculateSalary(payrollRecord.salary, payrollRecord.workedHours, payrollRecord.bonus, payrollRecord.deductions);
                                return `
                                    <tr>
                                        <td>${employee ? employee.name : 'Неизвестный сотрудник'}</td>
                                        <td>${payrollRecord.salary} руб.</td>
                                        <td>${payrollRecord.workedHours} ч.</td>
                                        <td>${payrollRecord.bonus} руб.</td>
                                        <td>${payrollRecord.deductions} руб.</td>
                                        <td>${totalSalary} руб.</td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                `;
                break;
            case 'tasks':
                //  Генерация  отчета  по  задачам
                const filteredTasks = filterTasks(tasksData, filters);
                reportContentHTML = `
                    <h2>Отчет по задачам</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Задача</th>
                                <th>Исполнитель</th>
                                <th>Срок</th>
                                <th>Статус</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${filteredTasks.map(task => `
                                <tr>
                                    <td>${task.title}</td>
                                    <td>${task.executor}</td>
                                    <td>${task.deadline}</td>
                                    <td>${task.status}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                `;
                break;
            case 'documents':
                //  Генерация  отчета  по  документам
                const filteredDocuments = filterDocuments(documentsData, filters);
                reportContentHTML = `
                    <h2>Отчет по документам</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Тип документа</th>
                                <th>Дата создания</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${filteredDocuments.map(document => `
                                <tr>
                                    <td>${document.type}</td>
                                    <td>${document.date}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                `;
                break;
            default:
                //  Ошибка  (неизвестный  тип  отчета)
                reportContentHTML = 'Неверный тип отчета';
        }

        reportContent.innerHTML = reportContentHTML;
    }

    //  Функции  для  фильтрации  данных  (примеры)
    function filterEmployees(employees, filters) {
        return employees.filter(employee => {
            //  Проверяем  фильтры  (department,  position,  hireDate)  и  возвращаем  соответствующих  сотрудников
            //  ... 
        });
    }

    function filterVacations(vacations, filters) {
        return vacations.filter(vacation => {
            //  Проверяем  фильтры  (employeeId,  startDate,  endDate,  type)  и  возвращаем  соответствующие  отпуска
            //  ... 
        });
    }

    function filterSickLeaves(sickLeaves, filters) {
        return sickLeaves.filter(sickLeave => {
            //  Проверяем  фильтры  (employeeId,  startDate,  endDate)  и  возвращаем  соответствующие  больничные
            //  ... 
        });
    }

    function filterPayroll(payrollRecords, filters) {
        return payrollRecords.filter(payrollRecord => {
            //  Проверяем  фильтры  (employeeId,  date)  и  возвращаем  соответствующие  зарплаты
            //  ... 
        });
    }

    function filterTasks(tasks, filters) {
        return tasks.filter(task => {
            //  Проверяем  фильтры  (executor,  deadline,  status)  и  возвращаем  соответствующие  задачи
            //  ... 
        });
    }

    function filterDocuments(documents, filters) {
        return documents.filter(document => {
            //  Проверяем  фильтры  (type,  date)  и  возвращаем  соответствующие  документы
            //  ... 
        });
    }

    //  Функция  для  расчета  зарплаты
    function calculateSalary(salary, workedHours, bonus, deductions) {
        const totalSalary = salary + bonus - deductions;
        return totalSalary;
    }

    //  Обработчик  изменения  типа  отчета
    reportTypeSelect.addEventListener('change', function() {
        const selectedReportType = this.value;
        reportFiltersContainer.innerHTML = ''; 
        generateReportButton.style.display = 'block'; //  Отображаем  кнопку  генерации  отчета

        //  Добавляем  фильтры  в  зависимости  от  типа  отчета
        switch (selectedReportType) {
            case 'employees':
                //  Добавляем  фильтры  для  отчета  по  сотрудникам
                reportFiltersContainer.innerHTML += `
                    <div class="filter-group">
                        <label for="departmentFilter">Отдел:</label>
                        <select id="departmentFilter">
                            <option value="">Все отделы</option>
                            <option value="sales">Отдел продаж</option>
                            <option value="marketing">Отдел маркетинга</option>
                            <option value="hr">Отдел кадров</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label for="positionFilter">Должность:</label>
                        <select id="positionFilter">
                            <option value="">Все должности</option>
                            <option value="manager">Менеджер</option>
                            <option value="developer">Разработчик</option>
                            <option value="designer">Дизайнер</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label for="hireDateFilter">Дата приема:</label>
                        <input type="date" id="hireDateFilter">
                    </div>
                `;
                break;
            case 'vacations':
                //  Добавляем  фильтры  для  отчета  по  отпускам
                reportFiltersContainer.innerHTML += `
                    <div class="filter-group">
                        <label for="vacationEmployeeFilter">Сотрудник:</label>
                        <select id="vacationEmployeeFilter">
                            <option value="">Все сотрудники</option>
                            <option value="1">Иванов Иван Иванович</option>
                            <option value="2">Петрова Анна Сергеевна</option>
                            <option value="3">Сидоров Сергей Петрович</option>
                            <option value="4">Кузнецова Ольга Владимировна</option>
                            <option value="5">Смирнов Дмитрий Александрович</option>
                            <option value="6">Попова Екатерина Ивановна</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label for="vacationStartDateFilter">Дата начала:</label>
                        <input type="date" id="vacationStartDateFilter">
                    </div>
                    <div class="filter-group">
                        <label for="vacationEndDateFilter">Дата окончания:</label>
                        <input type="date" id="vacationEndDateFilter">
                    </div>
                    <div class="filter-group">
                        <label for="vacationTypeFilter">Тип отпуска:</label>
                        <select id="vacationTypeFilter">
                            <option value="">Все типы</option>
                            <option value="paid">Оплачиваемый</option>
                            <option value="unpaid">Неоплачиваемый</option>
                        </select>
                    </div>
                `;
                break;
            case 'sickLeaves':
                //  Добавляем  фильтры  для  отчета  по  больничным
                reportFiltersContainer.innerHTML += `
                    <div class="filter-group">
                        <label for="sickLeaveEmployeeFilter">Сотрудник:</label>
                        <select id="sickLeaveEmployeeFilter">
                            <option value="">Все сотрудники</option>
                            <option value="1">Иванов Иван Иванович</option>
                            <option value="2">Петрова Анна Сергеевна</option>
                            <option value="3">Сидоров Сергей Петрович</option>
                            <option value="4">Кузнецова Ольга Владимировна</option>
                            <option value="5">Смирнов Дмитрий Александрович</option>
                            <option value="6">Попова Екатерина Ивановна</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label for="sickLeaveStartDateFilter">Дата начала:</label>
                        <input type="date" id="sickLeaveStartDateFilter">
                    </div>
                    <div class="filter-group">
                        <label for="sickLeaveEndDateFilter">Дата окончания:</label>
                        <input type="date" id="sickLeaveEndDateFilter">
                    </div>
                `;
                break;
            case 'payroll':
                //  Добавляем  фильтры  для  отчета  по  зарплате
                reportFiltersContainer.innerHTML += `
                    <div class="filter-group">
                        <label for="payrollEmployeeFilter">Сотрудник:</label>
                        <select id="payrollEmployeeFilter">
                            <option value="">Все сотрудники</option>
                            <option value="1">Иванов Иван Иванович</option>
                            <option value="2">Петрова Анна Сергеевна</option>
                            <option value="3">Сидоров Сергей Петрович</option>
                            <option value="4">Кузнецова Ольга Владимировна</option>
                            <option value="5">Смирнов Дмитрий Александрович</option>
                            <option value="6">Попова Екатерина Ивановна</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label for="payrollDateFilter">Месяц:</label>
                        <input type="month" id="payrollDateFilter">
                    </div>
                `;
                break;
            case 'tasks':
                //  Добавляем  фильтры  для  отчета  по  задачам
                reportFiltersContainer.innerHTML += `
                    <div class="filter-group">
                        <label for="taskExecutorFilter">Исполнитель:</label>
                        <select id="taskExecutorFilter">
                            <option value="">Все исполнители</option>
                            <option value="1">Иванов Иван Иванович</option>
                            <option value="2">Петрова Анна Сергеевна</option>
                            <option value="3">Сидоров Сергей Петрович</option>
                            <option value="4">Кузнецова Ольга Владимировна</option>
                            <option value="5">Смирнов Дмитрий Александрович</option>
                            <option value="6">Попова Екатерина Ивановна</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label for="taskDeadlineFilter">Срок:</label>
                        <input type="date" id="taskDeadlineFilter">
                    </div>
                    <div class="filter-group">
                        <label for="taskStatusFilter">Статус:</label>
                        <select id="taskStatusFilter">
                            <option value="">Все статусы</option>
                            <option value="inProgress">В процессе</option>
                            <option value="completed">Выполнена</option>
                            <option value="pending">Ожидает</option>
                        </select>
                    </div>
                `;
                break;
            case 'documents':
                //  Добавляем  фильтры  для  отчета  по  документам
                reportFiltersContainer.innerHTML += `
                    <div class="filter-group">
                        <label for="documentTypeFilter">Тип документа:</label>
                        <select id="documentTypeFilter">
                            <option value="">Все типы</option>
                            <option value="ОРД">ОРД</option>
                            <option value="приказ">Приказ</option>
                            <option value="распоряжение">Распоряжение</option>
                            <option value="договор">Договор</option>
                            <option value="справка">Справка</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label for="documentDateFilter">Дата создания:</label>
                        <input type="date" id="documentDateFilter">
                    </div>
                `;
                break;
        }

        //  Добавляем  фильтры  в  HTML
        reportFiltersContainer.innerHTML += `
            <button id="applyFiltersButton">Применить фильтры</button>
        `;

        //  Обработчик  события  для  кнопки  "Применить  фильтры"
        document.getElementById('applyFiltersButton').addEventListener('click', function() {
            const filters = {
                //  Собираем  значения  из  фильтров
                //  ... 
            };
            generateReport(selectedReportType, filters);
        });
    });

    //  Обработчик  кнопки  "Сгенерировать  отчет"
    generateReportButton.addEventListener('click', function() {
        const selectedReportType = reportTypeSelect.value;
        const filters = {
            //  Собираем  значения  из  фильтров
            //  ... 
        };
        generateReport(selectedReportType, filters);
    });
});