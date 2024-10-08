// Gráfico de rosca
const myDoughnutChartCtx = document.getElementById('myDoughnutChart').getContext('2d');
const myDoughnutChart = new Chart(myDoughnutChartCtx, {
    type: 'doughnut',
    data: {
        labels: ['Ações', 'FIIs', 'Criptoativos'],
        datasets: [{
            label: 'Valores',
            data: [2690, 1001, 336.11],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverOffset: 4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'right', // Mover a legenda para o lado direito
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        const value = tooltipItem.raw; // Valor do dataset
                        return ` R$${value.toFixed(2)}`; // Adiciona o R$ antes do valor com 2 casadecimais
                    }
                }
            },
        }
    }
});




// Gráfico de valores mensais
const myChartCtx = document.getElementById('myChart').getContext('2d');

const labels = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro'
];

const dataValues = [
    4008.37,
    4153.50,
    4229.97,
    4174.33,
    4103.26,
    4094.24,
    4013.19,
    3994.57,
    4169.13,
    4027.11
];

// Create a gradient for the line
const gradient = myChartCtx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, 'rgba(0, 255, 204, 0.4)');
gradient.addColorStop(1, 'rgba(0, 255, 204, 0.1)');

const chart = new Chart(myChartCtx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Valores em Reais',
            data: dataValues,
            fill: true, // Preenche a área abaixo da linha
            borderColor: '#00ffcc',
            backgroundColor: gradient,
            borderWidth: 4, // Largura da linha
            tension: 0.4, // Suavização da linha
            pointBackgroundColor: '#00ffcc',
            pointBorderColor: '#3a3a3a',
            pointHoverBackgroundColor: '#3a3a3a',
            pointHoverBorderColor: '#00ffcc'
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                ticks: {
                    color: '#333' // Cor dos meses em cinza escuro
                }
            },
            y: {
                beginAtZero: false,
                ticks: {
                    color: '#333', // Cor dos números do eixo Y em cinza escuro
                    callback: function(value) {
                        return 'R$ ' + value.toFixed(2).replace('.', ','); // Formato em reais
                    },
                    stepSize: 10 // Incremento de 10 reais
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: '#333', // Cor da legenda em cinza escuro
                    font: {
                        weight: 'bold'
                    }
                }
            }
        }
    }
});