let baseCurrency = 'EUR';
let toExchange = 'PLN';
let indexController = 0;
const exchageRates = new Array(timePeroids.length);
const exchageRatesController = new Array(timePeroids.length);
const chartMaxSamples = 100;

const getPill = name => {
  return `pills-${name}-tab`;
}

const getPillElement = name => {
  return document.getElementById(getPill(name));
}

const ctx = document.getElementById('currencyChart').getContext('2d');
const gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, 'rgba(255,255,0,.3)');
gradient.addColorStop(1, 'rgba(255,255,0,0)');

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

/// TODO: Fix limited peroid changing
const setupChart = () => {
  currencyChart.data.datasets[0].data = exchageRates[indexController];
  console.log(exchageRates[indexController])
  currencyChart.update();
}
const getExchangeRate = (updateChart) => {

  let now = luxon.DateTime.now();

  switch (indexController) {
      case 0:
          now = now.minus({weeks: 1});
          break;
      case 1:
          now = now.minus({months: 1});
          break;
      case 2:
          now = now.minus({months: 3});
          break;
      case 3:
          now = now.minus({months: 6});
          break;
      case 4:
          now = now.minus({years: 1});
          break;
      case 5:
          now = now.minus({years: 5});
          break;
      default:
          now = luxon.DateTime.fromISO('2000-01-01');
  }

  let url = `https://api.exchangerate.host/timeseries?start_date=${now.toISODate()}&end_date=${luxon.DateTime.now().toISODate()}&symbols=${toExchange}&base=${baseCurrency}`;

  fetch(`${url}`)
      .then(res => res.json())
      .then((out) => {
          const rates = Object.entries(out.rates);
          if(exchageRatesController[indexController] !== true) {
            exchageRates[indexController] = new Array();
            for (let i = 0; i < rates.length; i++) {
                exchageRates[indexController].push({x: Date.parse(rates[i][0]), y: rates[i][1].PLN});
            }
            exchageRatesController[indexController] = true;
          }
          if(updateChart)
            setupChart();
      });
}

getPillElement(timePeroids[indexController]).classList.add('active');
getExchangeRate(true);

for (let i = 0; i < timePeroids.length; i++){
  getPillElement(timePeroids[i]).addEventListener('click', () => {
    indexController = i;
    getExchangeRate(true);
  })
}