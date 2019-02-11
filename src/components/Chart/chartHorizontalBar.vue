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
    },
    display: {
      type: Boolean,
      required: true
    },
    labelSize: {
      type: Number,
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
                fontSize: this.labelSize
              },
              gridLines: {
                color: "#e5e9f2",
                lineWidth: 0.5,
                drawBorder: false,
                zeroLineColor: "transparent"
              },
              scaleLabel: {
                display: this.display,
                labelString: "Brand   Name",
                fontSize:20,
                padding: 20,
                fontColor: "#7b7878",
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
                fontSize: this.labelSize,
                callback: function(value) {
                  // return value + "%";
                  return value;
                }
              },
              scaleLabel: {
                display: this.display,
                labelString: "No.  of  Mention(s)",
                fontSize:20,
                padding: 20,
                fontColor: "#7b7878",
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