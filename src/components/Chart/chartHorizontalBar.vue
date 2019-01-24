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
                fontColor: "#999",
                fontSize:16
              },
              gridLines: {
                color: "#e5e9f2",
                lineWidth: 0.5,
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
                fontColor: "#999",
                fontSize:16,
                callback: function(value) {
                  // return value + "%";
                  return value;
                }
              },
              scaleLabel: {
                display: true
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
            data: []
          }
        ]
      };
      if (this.childData.dataList) {
        this.childData.dataList.forEach((items, index) => {
          this.datacollection.datasets[index].data = items.data;
          this.datacollection.datasets[index].label = "Data" + index;
          this.datacollection.datasets[index].backgroundColor = "rgba(179,127,235,0.4)";
        });
      }
    }
  }
};
</script>