<!--  -->
<template>
  <div class="echarts" :style="{'width': chartsStyle.width, 'height': chartsStyle.height}"></div>
</template>

<script>
import echarts from 'echarts'
// let echarts = window.echarts;
export default {
  name: 'Echarts',
  props: {
    // 初始化数组
    options: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 初始化宽高
    chartsStyle: {
      type: Object,
      default: () => {
        return {
          width: '100%',
          height: '300px'
        }
      }
    }
  },
  data () {
    return {
      aOptions: this.options,
      oEcharts: null
    };
  },
  watch: {
    options: 'setOptions'
  },
  mounted() {
    this.initChart();
    this.updateOptions(this.aOptions)
  },
  methods: {
    // 初始化echarts图表
    initChart() {
      this.oEcharts = echarts.init(this.$el);
    },
    // 监听options 变化更新数据
    setOptions() {
      this.aOptions = this.options;
      this.updateOptions(this.aOptions);
    },
    // 更新数据
    updateOptions(data) {
      this.oEcharts.setOption(data);
    }
  }
}

</script>
<style>
</style>