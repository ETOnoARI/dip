document.addEventListener('DOMContentLoaded', function() {
    //  Собираем  данные  из  форм
    const companyName = document.getElementById('companyName').value;
    const companyEmail = document.getElementById('companyEmail').value;
    const companyPhone = document.getElementById('companyPhone').value;
    const companyAddress = document.getElementById('companyAddress').value;

    const vacationNotifications = document.getElementById('vacationNotifications').checked;
    const sickLeaveNotifications = document.getElementById('sickLeaveNotifications').checked;
    const taskNotifications = document.getElementById('taskNotifications').checked;
    const birthdayNotifications = document.getElementById('birthdayNotifications').checked;

    const language = document.getElementById('languageSelect').value;
    const theme = document.getElementById('themeSelect').value;

    const defaultReportFormat = document.getElementById('defaultReportFormat').value;

    const passwordComplexity = document.getElementById('passwordComplexity').value;
    const twoFactorAuth = document.getElementById('twoFactorAuth').checked;

    const defaultCalendarView = document.getElementById('defaultCalendarView').value;
    const defaultTaskStatus = document.getElementById('defaultTaskStatus').value;
    const defaultVacationType = document.getElementById('defaultVacationType').value;
    const defaultSickLeaveDays = document.getElementById('defaultSickLeaveDays').value;

    //  В  реальном  приложении  вы  отправите  запрос  на  сервер  с  помощью  AJAX,  передав  все  данные
    console.log('Сохранение  всех  настроек:', companyName, companyEmail, companyPhone, companyAddress,
                                        vacationNotifications, sickLeaveNotifications, taskNotifications, birthdayNotifications,
                                        language, theme, defaultReportFormat, passwordComplexity, twoFactorAuth,
                                        defaultCalendarView, defaultTaskStatus, defaultVacationType, defaultSickLeaveDays);

    //  Пример  данных  (в  реальном  приложении  вы  будете  загружать  их  с  сервера)
    const companyData = {
        "name": "Название компании",
        "email": "company@example.com",
        "phone": "+7 (123) 456-78-90",
        "address": "г. Москва, ул. Ленина, д. 1" 
    };

    const notificationSettings = {
        "vacationNotifications": true,
        "sickLeaveNotifications": true,
        "taskNotifications": true,
        "birthdayNotifications": true
    };

    const interfaceSettings = {
        "language": "ru",
        "theme": "light"
    };

    const reportSettings = {
        "defaultReportFormat": "pdf"
    };

    const securitySettings = {
        "passwordComplexity": "medium",
        "twoFactorAuth": false
    };

    const calendarSettings = {
        "defaultCalendarView": "dayGridMonth"
    };

    const taskSettings = {
        "defaultTaskStatus": "pending"
    };

    const vacationSettings = {
        "defaultVacationType": "paid"
    };

    const sickLeaveSettings = {
        "defaultSickLeaveDays": 14 
    };

    //  Функция  для  отображения  данных  о  компании
    function displayCompanySettings() {
        document.getElementById('companyName').value = companyData.name;
        document.getElementById('companyEmail').value = companyData.email;
        document.getElementById('companyPhone').value = companyData.phone;
        document.getElementById('companyAddress').value = companyData.address;
    }

    //  Функция  для  отображения  настроек  уведомлений
    function displayNotificationSettings() {
        document.getElementById('vacationNotifications').checked = notificationSettings.vacationNotifications;
        document.getElementById('sickLeaveNotifications').checked = notificationSettings.sickLeaveNotifications;
        document.getElementById('taskNotifications').checked = notificationSettings.taskNotifications;
        document.getElementById('birthdayNotifications').checked = notificationSettings.birthdayNotifications;
    }

    //  Функция  для  отображения  настроек  интерфейса
    function displayInterfaceSettings() {
        document.getElementById('languageSelect').value = interfaceSettings.language;
        document.getElementById('themeSelect').value = interfaceSettings.theme;
    }

    //  Функция  для  отображения  настроек  отчетности
    function displayReportSettings() {
        document.getElementById('defaultReportFormat').value = reportSettings.defaultReportFormat;
    }

    //  Функция  для  отображения  настроек  безопасности
    function displaySecuritySettings() {
        document.getElementById('passwordComplexity').value = securitySettings.passwordComplexity;
        document.getElementById('twoFactorAuth').checked = securitySettings.twoFactorAuth;
    }

    //  Функция  для  отображения  настроек  календаря
    function displayCalendarSettings() {
        document.getElementById('defaultCalendarView').value = calendarSettings.defaultCalendarView;
    }

    //  Функция  для  отображения  настроек  задач
    function displayTaskSettings() {
        document.getElementById('defaultTaskStatus').value = taskSettings.defaultTaskStatus;
    }

    //  Функция  для  отображения  настроек  отпусков
    function displayVacationSettings() {
        document.getElementById('defaultVacationType').value = vacationSettings.defaultVacationType;
    }

    //  Функция  для  отображения  настроек  больничных
    function displaySickLeaveSettings() {
        document.getElementById('defaultSickLeaveDays').value = sickLeaveSettings.defaultSickLeaveDays;
    }

    //  Функция  для  открытия  модального  окна  "Настройки  календаря"
    function openCalendarSettingsModal() {
        calendarSettingsModal.style.display = 'block';
        displayCalendarSettings();
    }

    //  Функция  для  закрытия  модального  окна  "Настройки  календаря"
    function closeCalendarSettingsModal() {
        calendarSettingsModal.style.display = 'none';
    }

    //  Функция  для  открытия  модального  окна  "Настройки  задач"
    function openTaskSettingsModal() {
        taskSettingsModal.style.display = 'block';
        displayTaskSettings();
    }

    //  Функция  для  закрытия  модального  окна  "Настройки  задач"
    function closeTaskSettingsModal() {
        taskSettingsModal.style.display = 'none';
    }

    //  Функция  для  открытия  модального  окна  "Настройки  отпусков"
    function openVacationSettingsModal() {
        vacationSettingsModal.style.display = 'block';
        displayVacationSettings();
    }

    //  Функция  для  закрытия  модального  окна  "Настройки  отпусков"
    function closeVacationSettingsModal() {
        vacationSettingsModal.style.display = 'none';
    }

    //  Функция  для  открытия  модального  окна  "Настройки  больничных"
    function openSickLeaveSettingsModal() {
        sickLeaveSettingsModal.style.display = 'block';
        displaySickLeaveSettings();
    }

    //  Функция  для  закрытия  модального  окна  "Настройки  больничных"
    function closeSickLeaveSettingsModal() {
        sickLeaveSettingsModal.style.display = 'none';
    }

    //  Инициализация  страницы  при  загрузке
    displayCompanySettings();
    displayNotificationSettings();
    displayInterfaceSettings();
    displayReportSettings();
    displaySecuritySettings();

    //  Обработка  формы  "Настройки  компании"
    companySettingsForm.addEventListener('submit', function(event) {
        event.preventDefault();
        //  Получаем  данные  из  формы
        const companyName = document.getElementById('companyName').value;
        const companyEmail = document.getElementById('companyEmail').value;
        const companyPhone = document.getElementById('companyPhone').value;
        const companyAddress = document.getElementById('companyAddress').value;

        //  В  реальном  приложении  вы  отправите  запрос  на  сервер  с  помощью  AJAX
        console.log('Сохранение  настроек  компании:', companyName, companyEmail, companyPhone, companyAddress);
    });

    //  Обработка  формы  "Настройки  уведомлений"
    notificationSettingsForm.addEventListener('submit', function(event) {
        event.preventDefault();
        //  Получаем  данные  из  формы
        const vacationNotifications = document.getElementById('vacationNotifications').checked;
        const sickLeaveNotifications = document.getElementById('sickLeaveNotifications').checked;
        const taskNotifications = document.getElementById('taskNotifications').checked;
        const birthdayNotifications = document.getElementById('birthdayNotifications').checked;

        //  В  реальном  приложении  вы  отправите  запрос  на  сервер  с  помощью  AJAX
        console.log('Сохранение  настроек  уведомлений:', vacationNotifications, sickLeaveNotifications, taskNotifications, birthdayNotifications);
    });

    //  Обработка  формы  "Настройки  интерфейса"
    interfaceSettingsForm.addEventListener('submit', function(event) {
        event.preventDefault();
        //  Получаем  данные  из  формы
        const language = document.getElementById('languageSelect').value;
        const theme = document.getElementById('themeSelect').value;

        //  В  реальном  приложении  вы  отправите  запрос  на  сервер  с  помощью  AJAX
        console.log('Сохранение  настроек  интерфейса:', language, theme);
    });

    //  Обработка  формы  "Настройки  отчетности"
    reportSettingsForm.addEventListener('submit', function(event) {
        event.preventDefault();
        //  Получаем  данные  из  формы
        const defaultReportFormat = document.getElementById('defaultReportFormat').value;

        //  В  реальном  приложении  вы  отправите  запрос  на  сервер  с  помощью  AJAX
        console.log('Сохранение  настроек  отчетности:', defaultReportFormat);
    });

    //  Обработка  формы  "Настройки  безопасности"
    securitySettingsForm.addEventListener('submit', function(event) {
        event.preventDefault();
        //  Получаем  данные  из  формы
        const passwordComplexity = document.getElementById('passwordComplexity').value;
        const twoFactorAuth = document.getElementById('twoFactorAuth').checked;

        //  В  реальном  приложении  вы  отправите  запрос  на  сервер  с  помощью  AJAX
        console.log('Сохранение  настроек  безопасности:', passwordComplexity, twoFactorAuth);
    });

    //  Обработка  формы  "Настройки  календаря"
    calendarSettingsForm.addEventListener('submit', function(event) {
        event.preventDefault();
        //  Получаем  данные  из  формы
        const defaultCalendarView = document.getElementById('defaultCalendarView').value;

        //  В  реальном  приложении  вы  отправите  запрос  на  сервер  с  помощью  AJAX
        console.log('Сохранение  настроек  календаря:', defaultCalendarView);

        closeCalendarSettingsModal();
    });

    //  Обработка  формы  "Настройки  задач"
    taskSettingsForm.addEventListener('submit', function(event) {
        event.preventDefault();
        //  Получаем  данные  из  формы
        const defaultTaskStatus = document.getElementById('defaultTaskStatus').value;

        //  В  реальном  приложении  вы  отправите  запрос  на  сервер  с  помощью  AJAX
        console.log('Сохранение  настроек  задач:', defaultTaskStatus);

        closeTaskSettingsModal();
    });

    //  Обработка  формы  "Настройки  отпусков"
    vacationSettingsForm.addEventListener('submit', function(event) {
        event.preventDefault();
        //  Получаем  данные  из  формы
        const defaultVacationType = document.getElementById('defaultVacationType').value;

        //  В  реальном  приложении  вы  отправите  запрос  на  сервер  с  помощью  AJAX
        console.log('Сохранение  настроек  отпусков:', defaultVacationType);

        closeVacationSettingsModal();
    });

    //  Обработка  формы  "Настройки  больничных"
    sickLeaveSettingsForm.addEventListener('submit', function(event) {
        event.preventDefault();
        //  Получаем  данные  из  формы
        const defaultSickLeaveDays = document.getElementById('defaultSickLeaveDays').value;

        //  В  реальном  приложении  вы  отправите  запрос  на  сервер  с  помощью  AJAX
        console.log('Сохранение  настроек  больничных:', defaultSickLeaveDays);

        closeSickLeaveSettingsModal();
    });
});