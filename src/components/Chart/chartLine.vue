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
    },
    brandKey: {
      type: String,
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
        title: {
          // display: true,
          // fontSize: 20,
					// text: 'Trends Over past 7 days'
				},
        legend: {
          display: true,
          position: "top",
          labels: {
            fontSize: 20,
            fontColor: "#7b7878",
            // padding: 50,
          }
        },
        scales: {
          yAxes: [
            {
              display: true,
              ticks: {
                xmax: 20,
                // fontColor: "#999",
                fontSize:16,
              },
              gridLines: {
                // color: "#e5e9f2", 
                lineWidth: 0.5,
                drawBorder: false,
                zeroLineColor: "transparent"
              },
              scaleLabel: {
                display: true,
                labelString: "No.  of  Mentioned(s)",
                fontSize:20,
                padding: 20,
                fontColor: "#7b7878",
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: true
              },
              ticks: {
                // fontColor: "#999",
                fontSize:16,
                autoSkip: false,
                maxRotation: 80,
                callback: function(value) {
                  return value;
                }
              },
              scaleLabel: {
                display: true,
                labelString: "Day",
                fontSize:20,
                // padding: 10,
                fontColor: "#7b7878",
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
      let ctx = document.getElementById("line-chart");
      let gradient = ctx.getContext("2d").createLinearGradient(0, 0, 0, 200);
      gradient.addColorStop(0, "rgba(179,127,235,0.5)");
      gradient.addColorStop(0.3, "rgba(179,127,235,0.4)");
      gradient.addColorStop(0.5, "rgba(179,127,235,0.3)");
      gradient.addColorStop(0.7, "rgba(179,127,235,0.2)");
      gradient.addColorStop(1, "rgba(179,127,235,0.1)");
      this.datacollection = {
        labels: this.childData.labels,
        datasets: [
          {
            label: "Data One",
            // fill: true,
            data: [],
            backgroundColor: gradient,
            //曲线的填充颜色
            fillColor : "rgba(220,220,220,0.5)",  
            //填充块的边框线的颜色
            strokeColor : "rgba(220,220,220,1)", 
            //表示数据的圆圈的颜色
            pointColor : "rgba(220,220,220,1)",  
            //表示数据的圆圈的边的颜色
            pointStrokeColor : "#fff",
            // pointBackgroundColor: "transparent",
            // pointBorderColor: "transparent",
            // pointHoverBackgroundColor: "rgba(146,142,142, .5)",
            borderWidth: 3,
            label:'月销售量'
          }
        ]
      };
      if (this.childData.dataList) {
        this.childData.dataList.forEach((items, index) => {
          this.datacollection.datasets[index].data = items.data;
          this.datacollection.datasets[index].label = "Data" + index;
          this.datacollection.datasets[index].backgroundColor = gradient;
          // this.datacollection.datasets[index].pointBackgroundColor =
          //   "transparent";
          // this.datacollection.datasets[index].pointBorderColor = "transparent";
          // this.datacollection.datasets[index].pointHoverBackgroundColor =
          //   "rgba(221,221,221, .5)";
            //曲线的填充颜色
            this.datacollection.datasets[index].fillColor  = "rgba(179,127,235,0.5)" 
          //填充块的边框线的颜色
            this.datacollection.datasets[index].strokeColor = "rgba(220,220,220,1)"
          //表示数据的圆圈的颜色
            this.datacollection.datasets[index].pointColor = "blue"  
          //表示数据的圆圈的边的颜色
            this.datacollection.datasets[index].pointStrokeColor = "#fff"
          this.datacollection.datasets[index].borderWidth = 2;

            this.datacollection.datasets[index].pointStrokeColor = "#fff"
            this.datacollection.datasets[index].pointBorderWidth = 2.5
            this.datacollection.datasets[index].pointRadius = 4
          this.datacollection.datasets[index].label = this.brandKey
        });
      }
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    }
  }
};
</script>