const ctx = document.getElementsByClassName('chart')[0].getContext('2d');
const currencyChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['EUR', 'USD'],
        datasets: [{
            label: 'W przeliczeniu na złoty',
            data: [4.71, 4.62],
            backgroundColor: [
                'rgb(255, 100, 100)',
                'rgb(100, 255, 100)',
            ]
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false
            }
        }
    }
})