import { mixins, HorizontalBar } from 'vue-chartjs'
// pie
const { reactiveProp } = mixins
export default {
  extends: HorizontalBar,
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
    return {};
  },
  watch: {
    chartData () {
      this.$data._chart.update();
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
