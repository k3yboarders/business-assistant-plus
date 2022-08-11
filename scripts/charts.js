const baseCurrency = 'EUR';
const toExchange = 'PLN';

let urlBase = 'https://api.exchangerate.host/timeseries?start_date=2020-01-01&end_date=2020-04-04&symbols=PLN&base=USD';

const ctx = document.getElementsByClassName('chart')[0].getContext('2d');
const currencyChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: `Kurs ${baseCurrency} na ${toExchange}`,
            data: [],
            fill: false,
            borderColor: 'rgb(192,75,75)',
            tension: 0.3
        }]
    }
})

fetch(`${urlBase}`)
.then(res => res.json())
.then((out) => {
    const rates = Object.entries(out.rates);
    for(let i = 0; i <  rates.length; i++) {
        currencyChart.data.labels.push(rates[i][0]);
        currencyChart.data.datasets[0].data.push(rates[i][1].PLN);
    }
    currencyChart.update();
})  


