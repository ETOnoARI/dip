document.addEventListener('DOMContentLoaded', function() {
    const payrollTable = document.getElementById('payrollTable').getElementsByTagName('tbody')[0];
    const employeePayrollTable = document.getElementById('employeePayrollTable').getElementsByTagName('tbody')[0];
    const monthSelect = document.getElementById('monthSelect');
    const totalSalarySpan = document.getElementById('totalSalary');
    const averageSalarySpan = document.getElementById('averageSalary');
    const employeeCountSpan = document.getElementById('employeeCount');
    const updatePayrollButton = document.getElementById('updatePayrollButton');
    const editSalaryModal = document.getElementById('editSalaryModal');
    const editSalaryForm = document.getElementById('editSalaryForm');
    const departmentStats = document.getElementById('departmentStats');
    const employeeCountStats = document.getElementById('employeeCountStats');
    const payrollDetails = document.getElementById('payrollDetails');
    const employeePayrollDetails = document.getElementById('employeePayrollDetails');
    const generatePayslipButton = document.getElementById('generatePayslipButton');
    const payslipModal = document.getElementById('payslipModal');
    const payslipContent = document.getElementById('payslipContent');

    //  Пример  данных  (в  реальном  приложении  вы  будете  загружать  их  с  сервера)
    const payrollData = [
        {
            "id": 1,
            "employeeId": 1,
            "date": "2024-08",
            "salary": 30000,
            "workedHours": 160,
            "bonus": 5000,
            "deductions": 1000
        },
        {
            "id": 2,
            "employeeId": 2,
            "date": "2024-08",
            "salary": 25000,
            "workedHours": 168,
            "bonus": 3000,
            "deductions": 500
        },
        {
            "id": 3,
            "employeeId": 3,
            "date": "2024-08",
            "salary": 35000,
            "workedHours": 176,
            "bonus": 7000,
            "deductions": 1500
        },
        {
            "id": 4,
            "employeeId": 4,
            "date": "2024-08",
            "salary": 28000,
            "workedHours": 160,
            "bonus": 4000,
            "deductions": 800
        },
        {
            "id": 5,
            "employeeId": 5,
            "date": "2024-08",
            "salary": 32000,
            "workedHours": 170,
            "bonus": 6000,
            "deductions": 1200
        },
        {
            "id": 6,
            "employeeId": 6,
            "date": "2024-08",
            "salary": 25000,
            "workedHours": 155,
            "bonus": 2000,
            "deductions": 600
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
        },
        {
            "id": 6,
            "name": "Попова Екатерина Ивановна"
        }
    ];

    //  Проверяем  роль  пользователя  (в  реальном  приложении  вы  будете  использовать  localStorage  или  sessionStorage)
    const isManager = false; //  Изменить  на  false  для  обычного  пользователя

    //  Функция  для  расчета  зарплаты
    function calculateSalary(salary, workedHours, bonus, deductions) {
        const totalSalary = salary + bonus - deductions;
        return totalSalary;
    }

    //  Отображение  данных  о  зарплате
    function displayPayroll(month) {
        payrollTable.innerHTML = ''; 
        employeePayrollTable.innerHTML = '';

        const filteredPayroll = payrollData.filter(record => record.date === month);
        let totalSalary = 0;
        let totalWorkedHours = 0; 
        let averageSalary = 0;
        let employeeCount = 0; 

        filteredPayroll.forEach(record => {
            const employee = employeesData.find(e => e.id === record.employeeId);
            const row = payrollTable.insertRow();
            const nameCell = row.insertCell();
            const salaryCell = row.insertCell();
            const workedHoursCell = row.insertCell();
            const bonusCell = row.insertCell();
            const deductionsCell = row.insertCell();
            const totalSalaryCell = row.insertCell();
            const actionsCell = row.insertCell();

            nameCell.textContent = employee.name;
            salaryCell.textContent = `${record.salary} руб.`;
            workedHoursCell.textContent = `${record.workedHours} ч.`;
            bonusCell.textContent = `${record.bonus} руб.`;
            deductionsCell.textContent = `${record.deductions} руб.`;
            const totalSalaryValue = calculateSalary(record.salary, record.workedHours, record.bonus, record.deductions);
            totalSalaryCell.textContent = `${totalSalaryValue} руб.`;

            totalSalary += totalSalaryValue;
            totalWorkedHours += record.workedHours;
            employeeCount++;

            if (isManager) {
                actionsCell.innerHTML = `
                    <button class="action-button edit-button" data-employee-id="${record.employeeId}">Редактировать</button>
                `;
            }
        });

        if (isManager) {
            averageSalary = totalSalary / employeeCount;
            averageSalarySpan.textContent = `${averageSalary.toFixed(0)} руб.`;
            employeeCountSpan.textContent = `${employeeCount} чел.`;
        } else {
            departmentStats.style.display = 'none';
            employeeCountStats.style.display = 'none';
        }

        totalSalarySpan.textContent = `${totalSalary.toFixed(0)} руб.`;

        //  Отображение  зарплаты  текущего  пользователя
        if (!isManager) {
            const userId = 1; //  Идентификатор  текущего  пользователя  (в  реальном  приложении  получайте  его  с  сервера)
            const employeePayroll = filteredPayroll.find(record => record.employeeId === userId);
            if (employeePayroll) {
                const row = employeePayrollTable.insertRow();
                const salaryCell = row.insertCell();
                const workedHoursCell = row.insertCell();
                const bonusCell = row.insertCell();
                const deductionsCell = row.insertCell();
                const totalSalaryCell = row.insertCell();

                salaryCell.textContent = `${employeePayroll.salary} руб.`;
                workedHoursCell.textContent = `${employeePayroll.workedHours} ч.`;
                bonusCell.textContent = `${employeePayroll.bonus} руб.`;
                deductionsCell.textContent = `${employeePayroll.deductions} руб.`;
                const totalSalaryValue = calculateSalary(employeePayroll.salary, employeePayroll.workedHours, employeePayroll.bonus, employeePayroll.deductions);
                totalSalaryCell.textContent = `${totalSalaryValue} руб.`;
            }
        }
    }

    //  Функция  для  открытия  модального  окна  "Редактировать  зарплату"
    function openEditSalaryModal() {
        editSalaryModal.style.display = 'block';
    }

    //  Функция  для  закрытия  модального  окна  "Редактировать  зарплату"
    function closeEditSalaryModal() {
        editSalaryModal.style.display = 'none';
    }

    //  Функция  для  открытия  модального  окна  "Расчетный  лист"
    function openPayslipModal() {
        payslipModal.style.display = 'block';
    }

    //  Функция  для  закрытия  модального  окна  "Расчетный  лист"
    function closePayslipModal() {
        payslipModal.style.display = 'none';
    }

    //  Функция  для  генерации  контента  расчетного  листа
    function generatePayslipContent(employeeId) {
        const employee = employeesData.find(e => e.id === employeeId);
        const payrollRecord = payrollData.find(r => r.employeeId === employeeId);
        if (employee && payrollRecord) {
            const totalSalary = calculateSalary(payrollRecord.salary, payrollRecord.workedHours, payrollRecord.bonus, payrollRecord.deductions);
            payslipContent.innerHTML = `
                <h2>Расчетный лист</h2>
                <p>Сотрудник: ${employee.name}</p>
                <p>Месяц: Август 2024</p>
                <table id="payslipTable">
                    <tr>
                        <td>Оклад</td>
                        <td>${payrollRecord.salary} руб.</td>
                    </tr>
                    <tr>
                        <td>Отработано часов</td>
                        <td>${payrollRecord.workedHours} ч.</td>
                    </tr>
                    <tr>
                        <td>Премии</td>
                        <td>${payrollRecord.bonus} руб.</td>
                    </tr>
                    <tr>
                        <td>Удержания</td>
                        <td>${payrollRecord.deductions} руб.</td>
                    </tr>
                    <tr>
                        <td>Итого к выплате</td>
                        <td>${totalSalary} руб.</td>
                    </tr>
                </table>
                <div class="payslip-actions">
                    <button onclick="printPayslip()">Печать</button> 
                    <button onclick="downloadPayslip()">Скачать</button> 
                    <div class="checkbox-container">
                        <input type="checkbox" id="payslipRead" />
                        <label for="payslipRead">Ознакомлен</label>
                    </div>
                </div>
            `;
        }
    }

    //  Инициализация  страницы  при  загрузке
    displayPayroll(monthSelect.value);

    //  Обработчик  изменения  месяца
    monthSelect.addEventListener('change', function() {
        displayPayroll(this.value);
    });

    //  Проверяем  роль  пользователя  (в  реальном  приложении  вы  будете  использовать  localStorage  или  sessionStorage)
    if (isManager) {
        updatePayrollButton.style.display = 'block';
        payrollDetails.style.display = 'block'; 
        employeePayrollDetails.style.display = 'none'; 
        generatePayslipButton.style.display = 'none';

        //  Обработчик  события  для  кнопки  "Обновить  зарплату"
        updatePayrollButton.addEventListener('click', function() {
            //  В  реальном  приложении  вы  отправите  запрос  на  сервер  с  помощью  AJAX
            console.log('Обновление  данных  о  зарплате...');
            //  Обновляем  таблицу  (в  реальном  приложении  вы  получите  данные  с  сервера  и  обновите  таблицу)
            displayPayroll(monthSelect.value);
        });

        //  Обработка  формы  "Редактировать  зарплату"
        editSalaryForm.addEventListener('submit', function(event) {
            event.preventDefault();
            //  Получаем  данные  из  формы
            const employeeId = document.getElementById('employeeId').value;
            const salary = parseInt(document.getElementById('salaryInput').value);
            const workedHours = parseInt(document.getElementById('workedHoursInput').value);
            const bonus = parseInt(document.getElementById('bonusInput').value);
            const deductions = parseInt(document.getElementById('deductionsInput').value);

            //  В  реальном  приложении  вы  отправите  запрос  на  сервер  с  помощью  AJAX
            console.log('Редактирование  зарплаты:', employeeId, salary, workedHours, bonus, deductions);

            //  Закрываем  модальное  окно
            closeEditSalaryModal();

            //  Обновляем  таблицу  (в  реальном  приложении  вы  получите  данные  с  сервера  и  обновите  таблицу)
            const payrollIndex = payrollData.findIndex(r => r.employeeId === parseInt(employeeId));
            payrollData[payrollIndex].salary = salary;
            payrollData[payrollIndex].workedHours = workedHours;
            payrollData[payrollIndex].bonus = bonus;
            payrollData[payrollIndex].deductions = deductions;
            displayPayroll(monthSelect.value);
        });

        //  Обработчик  события  для  таблицы  (редактирование)
        payrollTable.addEventListener('click', function(event) {
            if (event.target.classList.contains('edit-button')) {
                const employeeId = event.target.dataset.employeeId;
                openEditSalaryModal(employeeId);
                //  Заполняем  форму  данными  сотрудника
                const employee = employeesData.find(e => e.id === employeeId);
                document.getElementById('employeeId').value = employeeId; 
                document.getElementById('employeeName').value = employee.name;
                //  Заполните  остальные  поля  формы  (salaryInput,  workedHoursInput  и  т.д.)  данными  из  payrollData  
            }
        });
    } else {
        departmentStats.style.display = 'none';
        employeeCountStats.style.display = 'none';
        payrollDetails.style.display = 'none'; 
        updatePayrollButton.style.display = 'none'; 
        employeePayrollDetails.style.display = 'block'; 
        generatePayslipButton.style.display = 'block';

        //  Обработчик  кнопки  "Сформировать  расчетный  лист"
        generatePayslipButton.addEventListener('click', function() {
            const userId = 1; //  Идентификатор  текущего  пользователя  (в  реальном  приложении  получайте  его  с  сервера)
            openPayslipModal();
            generatePayslipContent(userId); 
        });
    }
});

//  Функция  для  печати  расчетного  листа
function printPayslip() {
    window.print();
}

//  Функция  для  скачивания  расчетного  листа
function downloadPayslip() {
    const payslipHTML = payslipContent.innerHTML;
    const payslipBlob = new Blob([payslipHTML], { type: "text/html" });
    const payslipURL = window.URL.createObjectURL(payslipBlob);
    const link = document.createElement('a');
    link.href = payslipURL;
    link.download = "payslip.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}