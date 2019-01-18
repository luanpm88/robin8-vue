import { Pie, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
export default {
  extends: Pie,
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
    };
  },
  watch: {
    chartData () {
      this.$data._chart.update();
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}
