<template>
  <div class="page">
    <page-header></page-header>

    <div class="container mt50 clearfix">
      <main-nav class="pull-left"></main-nav>

      <div class="benchmark-container pull-right">
        <div class="bench-card">
          <Echarts
            :options="benchOne.options"
            :chartsStyle="benchOne.chartsStyle"
            ref="benchOneChart"
          ></Echarts>
        </div>
        <!-- <div class="bench-card mt20">
          <Echarts
            :options="benchOne.options"
            :chartsStyle="benchOne.chartsStyle"
            ref="benchOneChart"
          ></Echarts>
        </div> -->
        <!-- <div class="bench-card mt20">
          <Echarts
            :options="benchOne.options"
            :chartsStyle="benchOne.chartsStyle"
            ref="benchOneChart"
          ></Echarts>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from "@components/PageHeader";
import axios from "axios";
import apiConfig from "@/config";
import MainNav from "@components/MainNav";
import Echarts from "@components/Chart/GlobalEcharts";
import ChartOption from "@components/Chart/GlobalChartOption";
import { mapState } from "vuex";
export default {
  name: "benchMark",
  components: {
    PageHeader,
    MainNav,
    Echarts
  },
  computed: {
    ...mapState(["authorization"])
  },
  created() {
    console.log(this.$route.params)
    this.totalParams.industry = this.$route.params.industry;
    this.totalParams.report_date = this.$route.params.report_date;
    this.totalParams.no_of_days = this.$route.params.no_of_days;
    this.weixinBeachOne(this.totalParams);
  },
  data() {
    return {
      totalParams: {
        industry: "",
        no_of_days: "",
        report_date: "",
        raw: 1
      },
      benchOneColorList: ChartOption.benchmarkColor.blue_top_20_colors,
      benchOne: {
        options: ChartOption.benchOneOptions,
        chartsStyle: {
          height: "600px"
        }
      }
    };
  },
  methods: {
    // Benchmark top 21 KOLs
    weixinBeachOne(params) {
      const _that = this;
      axios
        .post(apiConfig.weixinBeachOne, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          // console.log("我是微xin", res);
          _that.benchOne.options.series = [];
           _that.benchOne.options.title.text = 'Top 21 KOLs on '+ _that.totalParams.industry +' benchmarking (average Likes vs average Reads)';
          if (res.status === 200) {
            res.data.forEach((element, index) => {
              let json = {
                name: "",
                data: [],
                type: 'scatter',
                symbolSize: function(data) {
                  return Math.sqrt(data[2]) / 150;
                },
                label: {
                  emphasis: {
                    show: true,
                    borderWidth: 0,
                    padding: [8, 8, 8, 8],
                    color: '#fff',
                    align: 'left',
                    lineHeight: 15,
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    formatter: function(param) {
                      // return param.data[3] ;
                      param = 'Doc Count: ' + param.data[5] + ' \n #' + param.data[3] + ': \n Likes: ' + param.data[0] + '\n Reads: ' + param.data[1];
                      return param;
                    },
                    position: 'top'
                  }
                },
                itemStyle: {
                  normal: {
                    shadowBlur: 10,
                    shadowColor: "rgba(0, 0, 0, 0)",
                    shadowOffsetY: 5,
                    // borderWidth: 0,
                    color: "",
                    opacity: 0.8,
                  }
                }
              };
              let x, y, size, maxBubbleSize, maxCount = 0, currentData = [];
              x = element.total_reads / element.doc_count;
              y = element.total_likes / element.doc_count;
              maxBubbleSize = 12500 * (document.body.clientWidth);
              if (maxCount < element.doc_count) {
                maxCount = element.doc_count;
              }
              size = 5 + (element.doc_count * maxBubbleSize);
              json.name = '#' + element.rank_no + element.profile_name;
              currentData.push(x, y, size, element.profile_name, element.profile_name, element.doc_count);
              json.data.push(currentData);
              json.itemStyle.normal.color = _that.benchOneColorList[index];
              _that.benchOne.options.series.push(json);
            });
            _that.$refs.benchOneChart.updateOptions(_that.benchOne.options);
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    weixinBeachTwo(params) {
      const _that = this;
      axios
        .post(apiConfig.weixinBeachTwo, params, {
          headers: {
            Authorization: _that.authorization
          }
        })
        .then(function(res) {
          // console.log("我是微xin", res);
          _that.benchOne.options.series = [];
           _that.benchOne.options.title.text = 'Top 39 KOLs on Beauty benchmarking (average Likes vs average Reads)';
          if (res.status === 200) {
            _that.$refs.benchOneChart.updateOptions(_that.benchOne.options);
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.benchmark-container {
  width: 980px;
}
.bench-card {
  background: $white;
  padding: 30px;
  box-shadow: 0px 1px 15px 0px rgba(0, 0, 0, 0.08);
}
</style>
