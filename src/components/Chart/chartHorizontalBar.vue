<!--  -->
<template>
  <div>
    <bar-chart :chart-data="datacollection" :options="chartOptions"></bar-chart>
  </div>
</template>

<script>
import BarChart from "../Chart/ChartCommnJs/HorizontalBarChart.js";
export default {
  components: {
    BarChart
  },
  props: {
    childData: {
      type: Object,
      required: true
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
              ticks: {
                beginAtZero: true,
                xmax: 20,
                fontColor: "#BBBBBBFF"
              },
              gridLines: {
                // display: false
                color: "#e5e9f2",
                lineWidth: 0.5,
                // drawTicks: false,
                drawBorder: false,
                zeroLineColor: "transparent"
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false
              },
              ticks: {
                min: 0,
                fontColor: "#BBBBBBFF",
                // fontSize:12,
                callback: function(value) {
                  return value + "%";
                }
              },
              scaleLabel: {
                display: true
                // labelString: "Count"
              }
            }
          ]
        }
      }
    };
  },
  watch: {
    childData() {
      this.fillData();
    }
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: this.childData.labels,
        datasets: [
          {
            label: "Data One",
            backgroundColor: "rgba(179,127,235,0.4)",
            data: this.childData.data
          }
        ]
      };
    }
  }
};
</script>
<style>
#horizontalbar-chart {
  height: 390px !important;
}
</style>