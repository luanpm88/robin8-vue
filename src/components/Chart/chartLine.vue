<!--  -->
<template>
  <div>
    <line-chart :chart-data="datacollection" :options="chartOptions"></line-chart>
  </div>
</template>

<script>
import LineChart from "../Chart/ChartCommnJs/LineChart.js";
export default {
  components: {
    LineChart
  },
  props: {
    childData: {
      type: Object,
      required: true
    }
  },
  watch: {
    childData () {
        this.fillData();
    }
  },
  data() {
    return {
      datacollection: null,
      chartOptions: {
        xresponsive: true,
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              display: true,
              ticks: {
                xmax: 20,
                fontColor: "#BBBBBBFF"
              },
              gridLines: {
                // display: false
                color:'#e5e9f2',
                lineWidth:.5,
                // drawTicks:false,
                drawBorder:false,
                zeroLineColor:'transparent'
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false
              },
              ticks: {
                // min: 0,
                // max: 100,
                fontColor: "#BBBBBBFF",
                autoSkip:false,
                maxRotation:0,
                callback: function(value) {
                  return value;
                }
              },
              scaleLabel: {
                display: true,
                // labelString: "Count"
              }
            }
          ]
        }
      }
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      let ctx = document.getElementById('line-chart');
      let gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 200);

      // gradient.addColorStop(0, '#026012');
      gradient.addColorStop(0, 'rgba(179,127,235,0.5)');
      gradient.addColorStop(0.3, 'rgba(179,127,235,0.4)');
      gradient.addColorStop(0.5, 'rgba(179,127,235,0.3)');
      gradient.addColorStop(0.7, 'rgba(179,127,235,0.2)');
      gradient.addColorStop(1, 'rgba(179,127,235,0.1)');
      this.datacollection = {
        labels: this.childData.labels,
        datasets: [
          {
            label: "Data One",
            data: this.childData.data,
            // fill: false,
            backgroundColor: gradient,
            pointBackgroundColor: 'transparent',
            pointBorderColor: 'transparent',
            pointHoverBackgroundColor: 'rgba(0,0,0, .5)',
            borderWidth:2,
          }
        ]
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    }
  }
};
</script>
<style>
</style>