let baseCurrency = 'EUR';
let toExchange = 'PLN';
const chartPeroids = ['W', 'M', '3M', '6M', 'Y', '5Y', 'Max'];
const chartMaxSamples = 100;

const getExchangeRate = (peroidIndex) => {
    let now = luxon.DateTime.now();

    switch(peroidIndex) {
    case 0: now = now.minus({weeks:1}); break;
    case 1: now = now.minus({months:1}); break;
    case 2: now = now.minus({months:3}); break;
    case 3: now = now.minus({months:6}); break;
    case 4: now = now.minus({years:1}); break;
    case 5: now = now.minus({years:5}); break;
    default: now = luxon.DateTime.fromISO('2000-01-01');
    }

    let url = `https://api.exchangerate.host/timeseries?start_date=${now.toISODate()}&end_date=${luxon.DateTime.now().toISODate()}&symbols=${toExchange}&base=${baseCurrency}`;
    console.log(url);

    fetch(`${url}`)
        .then(res => res.json())
        .then((out) => {
            const rates = Object.entries(out.rates);
            for(let i = 0; i <  rates.length; i++) {
                currencyChart.data.datasets[0].data.push({x: Date.parse(rates[i][0]), y: rates[i][1].PLN});
            }
            currencyChart.update();
        });
}

const ctx = document.getElementsByClassName('chart')[0].getContext('2d');
const gradient = ctx.createLinearGradient(0,0,0,400);
gradient.addColorStop(0, 'rgba(255,255,0,.3)');
gradient.addColorStop(1, 'rgba(255,255,0,0)');

getExchangeRate(0);

const currencyChart = new Chart(ctx, {

  type: 'line',
  data: {
    datasets: [{
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
        display: false
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

