const baseCurrency = 'EUR';
const toExchange = 'PLN';

let url = `https://api.exchangerate.host/timeseries?start_date=2019-01-01&end_date=2021-01-01&symbols=${toExchange}&base=${baseCurrency}`;

const ctx = document.getElementsByClassName('chart')[0].getContext('2d');
const gradient = ctx.createLinearGradient(0,0,0,400);
gradient.addColorStop(0, 'rgba(255,255,0,.3)');
gradient.addColorStop(1, 'rgba(255,255,0,0)');
const currencyChart = new Chart(ctx, {

  type: 'line',
  data: {
    datasets: [{
        label: `Koszt ${baseCurrency} w ${toExchange}`,
        data: [],
        fill: true,
        borderColor: 'rgba(155,155,0,.8)',
        pointBorderColor: 'rgba(0,0,0,0)',
        pointBackgroundColor: 'rgba(0,0,0,0)',
        backgroundColor: gradient
      }
    ]
  },
  options: {
    parsing: false,
    plugins: {
      legend: {
        labels: {
          boxWidth: 0,
        }
      },
      decimation: {
        algorithm: 'lttb',
        samples: 100,
        threshold: 100,
        enabled: true
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
        type: 'time',
        time: {
            tooltipFormat: 'YYYY-MM-DD',
            unit: 'day'
        },
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
        currencyChart.data.datasets[0].data.push({x: Date.parse(rates[i][0]), y: rates[i][1].PLN});
    }
    currencyChart.update();
});
