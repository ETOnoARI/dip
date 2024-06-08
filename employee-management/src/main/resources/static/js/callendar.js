    document.addEventListener('DOMContentLoaded', function() {
        var calendarEl = document.getElementById('calendar');

        var calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            locale: 'ru',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            events: [
                {
                    title: 'Собрание по проекту "Аврора"',
                    start: '2024-08-06',
                    color: 'red'
                },
                {
                    title: 'Дедлайн отчета по маркетингу',
                    start: '2024-08-12',
                    color: 'green'
                },
                {
                    title: 'День рождения коллеги',
                    start: '2024-08-15',
                    color: 'yellow'
                },
                {
                    title: 'Отчет по продажам',
                    start: '2024-08-20',
                    color: 'blue'
                },
                {
                    title: 'Отпуск (оплачиваемый)',
                    start: '2024-08-01',
                    end: '2024-08-05',
                    color: 'green'
                },
                {
                    title: 'Больничный',
                    start: '2024-08-10',
                    end: '2024-08-14',
                    color: 'red'
                }
            ],
            eventClick: function(info) { 
                if (info.event.title.startsWith('Отпуск')) {
                    openVacationModal();
                } else if (info.event.title.startsWith('Больничный')) {
                    openSickLeaveModal();
                } 
            }
        });

        calendar.render();

        //  Проверяем  роль  пользователя  (в  реальном  приложении  вы  будете  использовать  localStorage)
        const isManager = true; //  Установите  значение  isManager  на  true,  если  пользователь  -  руководитель 
        const managerControls = document.getElementById('managerControls');

        if (isManager) {
            managerControls.style.display = 'flex'; 
        } else {
            managerControls.style.display = 'none'; 
        }

        //  Обработчик  кнопки  "Добавить  событие"  (для  руководителя)
        document.getElementById('addEventButton').addEventListener('click', function() {
            openAddEventModal();
        });

        //  Открытие  модальных  окон  
        function openVacationModal() {
            document.getElementById('vacationModal').style.display = 'block';
        }

        function openSickLeaveModal() {
            document.getElementById('sickLeaveModal').style.display = 'block';
        }

        function openAddEventModal() {
            document.getElementById('addEventModal').style.display = 'block';
        }

        //  Закрытие  модальных  окон  
        function closeVacationModal() {
            document.getElementById('vacationModal').style.display = 'none';
        }

        function closeSickLeaveModal() {
            document.getElementById('sickLeaveModal').style.display = 'none';
        }

        function closeAddEventModal() {
            document.getElementById('addEventModal').style.display = 'none';
        }

        //  Обработка  форм  модальных  окон
        document.getElementById('vacationForm').addEventListener('submit', function(event) {
            event.preventDefault();
            //  Получаем  данные  из  формы
            const vacationType = document.getElementById('vacationType').value;
            const vacationStartDate = document.getElementById('vacationStartDate').value;
            const vacationEndDate = document.getElementById('vacationEndDate').value;
            const vacationEmployee = document.getElementById('vacationEmployee').value;

            //  В  реальном  приложении  вы  отправите  запрос  на  сервер  с  помощью  AJAX
            console.log('Отправка  заявки  на  отпуск:', vacationType, vacationStartDate, vacationEndDate, vacationEmployee);

            //  Закрываем  модальное  окно
            closeVacationModal();

            //  Обновляем  календарь  (в  реальном  приложении  вы  получите  данные  с  сервера  и  обновите  календарь)
            calendar.addEvent({
                title: `Отпуск (${vacationType}) - ${vacationEmployee}`,
                start: vacationStartDate,
                end: vacationEndDate,
                color: 'green' 
            });
        });

        document.getElementById('sickLeaveForm').addEventListener('submit', function(event) {
            event.preventDefault();
            //  Получаем  данные  из  формы
            const sickLeaveStartDate = document.getElementById('sickLeaveStartDate').value;
            const sickLeaveEndDate = document.getElementById('sickLeaveEndDate').value;
            const sickLeaveFile = document.getElementById('sickLeaveFile').files[0];
            const sickLeaveEmployee = document.getElementById('sickLeaveEmployee').value;

            //  В  реальном  приложении  вы  отправите  запрос  на  сервер  с  помощью  AJAX
            console.log('Отправка  заявки  на  больничный:', sickLeaveStartDate, sickLeaveEndDate, sickLeaveFile, sickLeaveEmployee);

            //  Закрываем  модальное  окно
            closeSickLeaveModal();

            //  Обновляем  календарь  (в  реальном  приложении  вы  получите  данные  с  сервера  и  обновите  календарь)
            calendar.addEvent({
                title: `Больничный - ${sickLeaveEmployee}`,
                start: sickLeaveStartDate,
                end: sickLeaveEndDate,
                color: 'red'
            });
        });

        //  Обработка  формы  "Добавить  событие"
        document.getElementById('addEventForm').addEventListener('submit', function(event) {
            event.preventDefault();
            //  Получаем  данные  из  формы
            const eventName = document.getElementById('eventName').value;
            const eventStartDate = document.getElementById('eventStartDate').value;
            const eventEndDate = document.getElementById('eventEndDate').value;
            const eventColor = document.getElementById('eventColor').value;

            //  В  реальном  приложении  вы  отправите  запрос  на  сервер  с  помощью  AJAX
            console.log('Добавление  события:', eventName, eventStartDate, eventEndDate, eventColor);

            //  Закрываем  модальное  окно
            closeAddEventModal();

            //  Обновляем  календарь  (в  реальном  приложении  вы  получите  данные  с  сервера  и  обновите  календарь)
            calendar.addEvent({
                title: eventName,
                start: eventStartDate,
                end: eventEndDate,
                color: eventColor
            });
        });
    });