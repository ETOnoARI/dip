 // Данные для линейной диаграммы
 const lineChartData = {
    labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек', 
             'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    datasets: [
        {
            label: 'Количество сотрудников',
            data: [30, 32, 33, 35, 36, 37, 38, 39, 40, 41, 42, 43, 
                   43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        },
        {
            label: 'Количество документов',
            data: [50, 55, 60, 58, 65, 70, 75, 80, 85, 90, 95, 100, 
                   102, 105, 110, 112, 115, 120, 125, 130, 135, 140, 145, 150],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        },
        {
            label: 'Количество задач',
            data: [20, 22, 25, 27, 30, 32, 35, 37, 40, 42, 45, 47, 
                   49, 50, 52, 55, 57, 60, 62, 65, 67, 70, 72, 75],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }
    ]
  };

  // Инициализация линейной диаграммы
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
      },
      // Callback function to run after chart initialization
      plugins: [{
          afterRender: function() {
              // Обновление показателей
              const employeeCountSpan = document.getElementById('employeeCount');
              const documentCountSpan = document.getElementById('documentCount');
              const taskCountSpan = document.getElementById('taskCount');

              const latestEmployeeCount = lineChartData.datasets[0].data.slice(-1)[0];
              const latestDocumentCount = lineChartData.datasets[1].data.slice(-1)[0];
              const latestTaskCount = lineChartData.datasets[2].data.slice(-1)[0];

              employeeCountSpan.textContent = latestEmployeeCount;
              documentCountSpan.textContent = latestDocumentCount;
              taskCountSpan.textContent = latestTaskCount;
          }
      }]
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

