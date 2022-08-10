const currencies = ['EUR', 'USD'];

let urlBase = 'https://api.nbp.pl/api/exchangerates/rates/a';

const ctx = document.getElementsByClassName('chart')[0].getContext('2d');
const currencyChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: currencies,
        datasets: [{
            label: 'W przeliczeniu na złoty',
            data: [],
            backgroundColor: [
                'rgb(255, 100, 100)',
                'rgb(100, 255, 100)',
            ],
            borderRadiues: 3
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

for (const cur of currencies) {
    fetch(`${urlBase}/${cur}`)
    .then(res => res.json())
    .then((out) => {
        currencyChart.data.datasets[0].data.push(out.rates[0].mid);
        currencyChart.update();
    })  
};


