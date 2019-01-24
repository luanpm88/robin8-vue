<!--  -->
<template>
  <div>
    <pie-chart :chart-data="datacollection" :options="chartOptions"></pie-chart>
  </div>
</template>

<script>
import PieChart from "../Chart/ChartCommnJs/PieChart.js";
export default {
  components: {
    PieChart
  },
  props: {
    childData: {
      type: Object,
      required: true
    }
  },
  watch: {
    childData() {
      this.fillData();
    }
  },
  data() {
    return {
      datacollection: null,
      chartOptions: {
        xresponsive: true,
        legend: {
          display: true,
          position: "bottom",
          labels: {
            fontSize: 30,
            padding: 50,
            fontColor: "#999",
          }
        }
      }
    };
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
            data: this.childData.data,
            // fill: false,
            backgroundColor: [
              "rgba(179,127,235,0.2)",
              "rgba(179,127,235,0.3)",
              "rgba(179,127,235,0.4)",
              "rgba(179,127,235,0.5)",
              "rgba(179,127,235,0.7)",
              "rgba(179,127,235,0.9)"
            ],
            pointBackgroundColor: "yellow",
            borderWidth: 1,
            textBaseline: "bottom"
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
<style lang="scss">
#pie-chart {
  margin: 0px auto $font-sm;
  width: 330px !important;
  height: 325px !important;
}
</style>