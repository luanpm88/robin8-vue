import { Line, mixins } from 'vue-chartjs'
// pie
const { reactiveProp } = mixins
export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    chartdata: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      // options: {
      //   xresponsive: true,
      //   plugins: {
      //     datalabels: {
      //       color: "black",
      //       // align: "end",
      //       offset: function(context) {
      //         return 0;
      //       },
      //       anchor: function(context) {
      //         // start, center, end
      //         return "end";
      //       },
      //       display: function(context) {
      //         //      alert("data" + context.dataset.data[context.dataIndex]);
      //         return context.dataset.data[context.dataIndex];
      //       },
      //       font: {
      //         weight: "normal"
      //       },
      //       formatter: function(value) {
      //         return value;
      //       }
      //     }
      //   },
      //   legend: {
      //     display: false
      //   },
      
      //   scales: {
      //     yAxes: [
      //       {
      //         display: true,
      //         ticks: {
      //           beginAtZero: true,
      //           steps: 1,
      //           stepValue: 1,
      //           xmax: 20
      //         },
      //         gridLines: {
      //           display: false
      //         }
      //       }
      //     ],
      //     xAxes: [
      //       {
      //         gridLines: {
      //           display: false
      //         },
      //         ticks: {
      //           // min: 0,
      //           // max: 100,
      //           callback: function(value) {
      //             return value;
      //           }
      //         },
      //         scaleLabel: {
      //           //        display: true,
      //           labelString: "Count"
      //         }
      //       }
      //     ]
      //   }
      // }
    };
  },
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options)
  }
}
