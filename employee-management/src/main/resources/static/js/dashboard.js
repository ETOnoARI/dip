//  Данные  для  линейной  диаграммы
const lineChartData = {
    labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
    datasets: [{
        label: 'Количество сотрудников',
        data: [30, 32, 35, 38, 40, 42],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
    }]
};

//  Инициализация  линейной  диаграммы
const chartCanvas2 = document.getElementById('chart2');
const lineChart = new Chart(chartCanvas2, {
    type: 'line', 
    data: lineChartData,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

//  Пример  данных  для  столбчатой  диаграммы
const barChartData = {
    labels: ['ОРД', 'Приказы', 'Распоряжения', 'Договоры', 'Справки', 'Заявления'],
    datasets: [{
        label: 'Количество документов',
        data: [12, 8, 5, 15, 7, 10],
        backgroundColor: [
            'yellow',
            'green',
            'red',
            'blue',
            'purple', 
            'orange' 
        ],
        borderColor: [
            'yellow',
            'green',
            'red',
            'blue',
            'purple',
            'orange'
        ],
        borderWidth: 1
    }]
};

//  Инициализация  Chart.js
const chartCanvas = document.getElementById('chart1'); 
const barChart = new Chart(chartCanvas, {
    type: 'bar',
    data: barChartData,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

//  Управляем  отображением  блока  "Дополнительно  для  руководителя"
const isManager = true; //  В  реальном  приложении  получайте  значение  из  localStorage  
const statsSection = document.getElementById('statsSection');

if (isManager) {
    statsSection.style.display = 'block';
} else {
    statsSection.style.display = 'none';
}

//  Пример  заполнения  счетчиков  (в  реальном  приложении  вы  будете  получать  данные  с  сервера)
const documentCountSpan = document.getElementById('documentCount');
const taskCountSpan = document.getElementById('taskCount');
const employeeCountSpan = document.getElementById('employeeCount');

documentCountSpan.textContent = 50;
taskCountSpan.textContent = 18;
employeeCountSpan.textContent = 32;