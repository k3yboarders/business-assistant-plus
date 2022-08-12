const baseCurrency = 'EUR';
const toExchange = 'PLN';

let url = `https://api.exchangerate.host/timeseries?start_date=2020-01-01&end_date=2021-04-04&symbols=${toExchange}&base=${baseCurrency}`;

const ctx = document.getElementsByClassName('chart')[0].getContext('2d');
const gradient = ctx.createLinearGradient(0,0,0,400);
gradient.addColorStop(0, 'rgba(255,255,0,.3)');
gradient.addColorStop(1, 'rgba(255,255,0,0)');
const currencyChart = new Chart(ctx, {

  type: 'line',
  data: {
    labels: [],
    datasets: [{
        label: `Koszt ${baseCurrency} w ${toExchange}`,
        data: [],
        fill: true,
        clip: false,
        borderColor: 'rgba(155,155,0,.8)',
        pointBorderColor: 'rgba(0,0,0,0)',
        pointBackgroundColor: 'rgba(0,0,0,0)',
        pointBorderWidth: .1,
        tension: .1,
        backgroundColor: gradient
      }
    ]
  },
  options: {
    plugins: {
      legend: {
        display: false
      }
    },
    interaction: {
      mode: 'index',
      intersect: false,
      axis: 'x'
    },
    scales: {
      y: {
        grid: {
            color: 'rgba(100,100,100,.5)',
            lineWidth: 5,
            drawBorder: false
        }
      },
      x: {
        display: false,
      }
    }
  }
})

fetch(`${url}`)
.then(res => res.json())
.then((out) => {
    const rates = Object.entries(out.rates);
    for(let i = 0; i <  rates.length; i++) {
        currencyChart.data.labels.push(rates[i][0]);
        currencyChart.data.datasets[0].data.push(rates[i][1].PLN);
    }
    currencyChart.update();
})  