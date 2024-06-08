document.addEventListener('DOMContentLoaded', function() {
    const applicationTypeSelect = document.getElementById('applicationType');
    const applicationForm = document.getElementById('applicationForm');
    const submitApplicationButton = document.getElementById('submitApplicationButton');
    const applicationStatus = document.getElementById('applicationStatus');
    const managerControls = document.getElementById('managerControls');
    const applicationsTable = document.getElementById('applicationsTable').getElementsByTagName('tbody')[0];
    const confirmActionModal = document.getElementById('confirmActionModal');
    const modalActionTitle = document.getElementById('modalActionTitle');
    const modalActionMessage = document.getElementById('modalActionMessage');

    //  Пример  данных  (в  реальном  приложении  вы  будете  загружать  их  с  сервера)
    const applicationsData = [
        {
            "id": 1,
            "type": "повышение",
            "employeeId": 1,
            "date": "2024-08-05",
            "status": "в ожидании" 
        },
        {
            "id": 2,
            "type": "Служебная записка",
            "employeeId": 2,
            "date": "2024-08-08",
            "status": "одобренно" 
        },
        //  ...  другие  заявки
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
        //  ...  другие  сотрудники
    ];

    //  Проверяем  роль  пользователя  (в  реальном  приложении  вы  будете  использовать  localStorage  или  sessionStorage)
    const isManager = true; //  Изменить  на  false  для  обычного  пользователя

    //  Функция  для  генерации  формы  заявления
    function generateApplicationForm(applicationType) {
        applicationForm.innerHTML = '';
        submitApplicationButton.style.display = 'block'; 
        applicationStatus.textContent = '';

        switch (applicationType) {
            case 'promotion':
                //  Форма  заявления  на  повышение
                applicationForm.innerHTML = `
                    <form id="promotionForm">
                        <div class="form-group">
                            <label for="promotionPosition">Должность:</label>
                            <input type="text" id="promotionPosition" required>
                        </div>
                        <div class="form-group">
                            <label for="promotionMotivation">Мотивация:</label>
                            <textarea id="promotionMotivation" rows="5" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="promotionAdditionalInfo">Дополнительная информация:</label>
                            <textarea id="promotionAdditionalInfo" rows="3"></textarea>
                        </div>
                    </form>
                `;
                break;
            case 'memo':
                //  Форма  служебной  записки
                applicationForm.innerHTML = `
                    <form id="memoForm">
                        <div class="form-group">
                            <label for="memoSubject">Тема:</label>
                            <input type="text" id="memoSubject" required>
                        </div>
                        <div class="form-group">
                            <label for="memoContent">Содержание:</label>
                            <textarea id="memoContent" rows="10" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="memoRecipient">Адресат:</label>
                            <input type="text" id="memoRecipient" required>
                        </div>
                    </form>
                `;
                break;
            case 'resignation':
                //  Форма  заявления  на  увольнение
                applicationForm.innerHTML = `
                    <form id="resignationForm">
                        <div class="form-group">
                            <label for="resignationDate">Дата увольнения:</label>
                            <input type="date" id="resignationDate" required>
                        </div>
                        <div class="form-group">
                            <label for="resignationReason">Причина увольнения:</label>
                            <textarea id="resignationReason" rows="5" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="resignationAdditionalInfo">Дополнительная информация:</label>
                            <textarea id="resignationAdditionalInfo" rows="3"></textarea>
                        </div>
                    </form>
                `;
                break;
        }

        //  Обработчик  кнопки  "Отправить"
        submitApplicationButton.addEventListener('click', function(event) {
            event.preventDefault();

            const applicationType = applicationTypeSelect.value; 
            const userId = 1; //  Получите  userId  с  сервера  (в  реальном  приложении) 
            const currentDate = new Date().toISOString().slice(0, 10);

            let applicationData;

            switch (applicationType) {
                case 'promotion':
                    applicationData = {
                        "type": applicationType,
                        "employeeId": userId,
                        "date": currentDate, 
                        "position": document.getElementById('promotionPosition').value,
                        "motivation": document.getElementById('promotionMotivation').value,
                        "additionalInfo": document.getElementById('promotionAdditionalInfo').value,
                        "status": "pending"
                    };
                    break;
                case 'memo':
                    applicationData = {
                        "type": applicationType,
                        "employeeId": userId,
                        "date": currentDate, 
                        "subject": document.getElementById('memoSubject').value,
                        "content": document.getElementById('memoContent').value,
                        "recipient": document.getElementById('memoRecipient').value, 
                        "status": "pending"
                    };
                    break;
                case 'resignation':
                    applicationData = {
                        "type": applicationType,
                        "employeeId": userId,
                        "date": currentDate, 
                        "resignationDate": document.getElementById('resignationDate').value,
                        "reason": document.getElementById('resignationReason').value,
                        "additionalInfo": document.getElementById('resignationAdditionalInfo').value, 
                        "status": "pending"
                    };
                    break;
            }

            //  В  реальном  приложении  вы  отправите  запрос  на  сервер  с  помощью  AJAX
            console.log('Отправка  заявления:', applicationData);

            //  Обновляем  статус  заявки
            applicationStatus.textContent = 'Заявка отправлена на рассмотрение';

            //  Сбрасываем  форму
            applicationForm.innerHTML = ''; 
            submitApplicationButton.style.display = 'none';
        });
    }

    //  Отображение  списка  заявлений  (для  руководителя)
    function displayApplications() {
        applicationsTable.innerHTML = '';

        applicationsData.forEach(application => {
            const employee = employeesData.find(e => e.id === application.employeeId);
            const row = applicationsTable.insertRow();
            const typeCell = row.insertCell();
            const employeeCell = row.insertCell();
            const dateCell = row.insertCell();
            const statusCell = row.insertCell();
            const actionsCell = row.insertCell();

            typeCell.textContent = application.type;
            employeeCell.textContent = employee ? employee.name : 'Неизвестный сотрудник';
            dateCell.textContent = application.date;
            statusCell.textContent = application.status;
            actionsCell.innerHTML = `
                <button class="action-button approve-button" data-application-id="${application.id}">Утвердить</button>
                <button class="action-button reject-button" data-application-id="${application.id}">Отклонить</button>
            `;
        });
    }

    //  Функция  для  открытия  модального  окна  подтверждения
    function openConfirmActionModal(applicationId, actionType) {
        confirmActionModal.style.display = 'block';

        const application = applicationsData.find(a => a.id === applicationId); 
        modalActionTitle.textContent = actionType === 'approve' ? 'Подтверждение утверждения' : 'Подтверждение отклонения';
        modalActionMessage.textContent = actionType === 'approve' ? 
            `Вы уверены, что хотите утвердить заявление ${application.type} от ${application.employeeId}?` :
            `Вы уверены, что хотите отклонить заявление ${application.type} от ${application.employeeId}?`;
        document.getElementById('applicationId').value = applicationId; 
    }

    //  Функция  для  закрытия  модального  окна  подтверждения
    function closeConfirmActionModal() {
        confirmActionModal.style.display = 'none';
    }

    //  Функция  для  утверждения  заявки
    function approveApplication() {
        const applicationId = document.getElementById('applicationId').value;

        //  В  реальном  приложении  вы  отправите  запрос  на  сервер  с  помощью  AJAX
        console.log('Утверждение  заявки:', applicationId);

        //  Обновляем  статус  заявки  в  applicationsData
        const applicationIndex = applicationsData.findIndex(a => a.id === parseInt(applicationId));
        applicationsData[applicationIndex].status = 'approved';
        displayApplications();
        closeConfirmActionModal();
    }

    //  Функция  для  отклонения  заявки
    function rejectApplication() {
        const applicationId = document.getElementById('applicationId').value;

        //  В  реальном  приложении  вы  отправите  запрос  на  сервер  с  помощью  AJAX
        console.log('Отклонение  заявки:', applicationId);

        //  Обновляем  статус  заявки  в  applicationsData
        const applicationIndex = applicationsData.findIndex(a => a.id === parseInt(applicationId));
        applicationsData[applicationIndex].status = 'rejected';
        displayApplications();
        closeConfirmActionModal();
    }

    //  Инициализация  страницы  при  загрузке
    generateApplicationForm(applicationTypeSelect.value); 

    //  Проверяем  роль  пользователя  (в  реальном  приложении  вы  будете  использовать  localStorage  или  sessionStorage)
    if (isManager) {
        managerControls.style.display = 'block';
        displayApplications();
        applicationsTable.addEventListener('click', function(event) {
            if (event.target.classList.contains('approve-button')) {
                const applicationId = event.target.dataset.applicationId;
                openConfirmActionModal(applicationId, 'approve');
            } else if (event.target.classList.contains('reject-button')) {
                const applicationId = event.target.dataset.applicationId;
                openConfirmActionModal(applicationId, 'reject');
            }
        });
    } else {
        managerControls.style.display = 'none';
    }

    //  Обработчик  изменения  типа  заявки
    applicationTypeSelect.addEventListener('change', function() {
        generateApplicationForm(this.value);
    });
});