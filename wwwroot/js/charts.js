let indexController = 3;
const exchageRates = new Array(timePeroids.length);
const exchageRatesController = new Array(timePeroids.length);

class CurrencyChart extends Chart {
    constructor(ctx) {
        super(ctx, {
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
                    tooltip: {
                        callbacks: {
                            title: context => {
                                const d = new Date(context[0].parsed.x);
                                const formattedDate = d.toLocaleString([], {
                                    day: 'numeric',
                                    month: 'numeric',
                                    year: 'numeric'
                                })
                                return formattedDate
                            }
                        }
                    },
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
                        type: 'time',
                        time: {
                            tooltipFormat: 'yyyy-mm-dd',
                            unit: 'day'
                        },
                        display: false,
                    }
                }
            }
        });

        this.selects = new Array(2);
        this.exchangeValues = new Array(2);

        for(let i = 0; i < 2; i++) {
            this.selects[i] = document.getElementsByClassName('currency-select')[i];
            this.updateCurrency(i, this.selects[i])
            this.selects[i].addEventListener('change', this.updateCurrency.bind(this, i, this.selects[i]));
        }
        this.swapable = true;
        this.selects[1].value = currencies[1];
        this.exchangeValues[1] = currencies[1];
        this.swapCurrency();

        this.getPillElement(timePeroids[indexController]).classList.add('active');
        this.getExchangeRate();

        for (let i = 0; i < timePeroids.length; i++){
          this.getPillElement(timePeroids[i]).addEventListener('click', () => {
            indexController = i;
            this.setupChart();
          })
        }
    }

    swapCurrency() {
        if(this.selects[0].value == this.exchangeValues[0])
        if(this.selects[0].value == this.selects[1].value) {
            this.selects[0].value = this.exchangeValues[1];
            this.exchangeValues[0] = this.exchangeValues[1];
        }
        if(this.selects[1].value == this.exchangeValues[1])
        if(this.selects[1].value == this.selects[0].value) {
            this.selects[1].value = this.exchangeValues[0];
            this.exchangeValues[1] = this.exchangeValues[0];
        }
    }

    updateCurrency(index, element) {
        /// TODO Finish swaping currencies
        if(this.swapable)
            this.swapCurrency();
        this.exchangeValues[index] = element.value;
        this.getExchangeRate();
    }

    getPill(name) {
      return `pills-${name}-tab`;
    }

    getPillElement(name) {
      return document.getElementById(this.getPill(name));
    }

    setupChart() {
      this.data.datasets[0]._data = [];
      let subtrahend = 0;
      switch (indexController) {
        case 0:
            subtrahend = 7;
            break;
        case 1:
            subtrahend = 31;
            break;
        case 2:
            subtrahend = 93;
            break;
        case 3:
            subtrahend = 183;
            break;
        default:
            subtrahend = 366;
            break;
      }
      this.data.datasets[0].data = exchageRates[this.currentExchange].slice(exchageRates[this.currentExchange].length - subtrahend);
      this.update();
    }

    getExchangeRate() {
      this.currentExchange = `${this.exchangeValues[0]}-${this.exchangeValues[1]}`;
      if(exchageRates[this.currentExchange] == undefined) {
        let url = `https://api.exchangerate.host/timeseries?start_date=${luxon.DateTime.now().minus({years: 1}).toISODate()}&end_date=${luxon.DateTime.now().toISODate()}&symbols=${this.exchangeValues[1]}&base=${this.exchangeValues[0]}`;
        fetch(`${url}`)
            .then(res => res.json())
            .then((out) => {
                const rates = Object.entries(out.rates);
                exchageRates[this.currentExchange] = new Array();
                for (let i = 0; i < rates.length; i++) {
                    exchageRates[this.currentExchange].push({x: Date.parse(rates[i][0]), y: rates[i][1][`${this.exchangeValues[1]}`]});
                }
                this.setupChart();
            });
        }
      }
}

const ctx = document.getElementById('currencyChart').getContext('2d');
const gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, 'rgba(255,255,0,.3)');
gradient.addColorStop(1, 'rgba(255,255,0,0)');

const chart = new CurrencyChart(ctx);