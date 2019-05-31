const MockData = {
  trendOptions: {
    tooltip: {
      trigger: "axis"
    },
    legend: {
      show: false,
      data: [
        {
          name: "",
          icon: "rect"
        }
      ]
    },
    grid: {
      top: "8%",
      left: "10%",
      right: "4%",
      bottom: "15%",
      containLabel: true
    },
    xAxis: {
      name: "Date（day/month）",
      nameLocation: "middle",
      nameTextStyle: {
        fontSize: 16,
        padding: [20, 0, 0, 0]
        // padding: [20],
        // shadowOffsetY: 30,
      },
      type: "category",
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: "#999"
        }
      },
      axisTick: {
        lineStyle: {
          color: "#00000014"
        }
      },
      //网格线
      splitLine: {
        show: true,
        lineStyle: {
          color: "#00000014"
        }
      },
      data: []
    },
    yAxis: {
      name: "Number of mentions",
      nameLocation: "middle",
      nameTextStyle: {
        fontSize: 16,
        padding: [0, 0, 45, 0]
        // padding: [20],
        // shadowOffsetY: 30,
      },
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#999"
        }
      },
      axisTick: {
        lineStyle: {
          color: "#00000014"
        }
      },
      //网格线
      splitLine: {
        show: true,
        lineStyle: {
          color: "#00000014"
        }
      },
    },
    series: [
      {
        name: "",
        type: "line",
        smooth: true,
        symbolSize: 7,
        data: [],
        itemStyle: {
          normal: {
            color: "rgba(56,208,213,0.5)",
            lineStyle: {
              color: "#B37FEBFF",
              width: 1
            }
          }
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(56,208,213,0.5)" // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: "rgba(56,208,213,0.3)" // 100% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(56,208,213,0.1)" // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        }
      }
    ]
  },
  competitorsOptions: {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      show: false,
      data: [
        {
          name: "competitors",
          icon: "rect"
        }
      ]
    },
    grid: {
      top: "8%",
      left: "8%",
      right: "4%",
      bottom: "15%",
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01],
      name: "Number of mentions",
      nameLocation: "middle",
      nameTextStyle: {
        fontSize: 16,
        padding: [20, 0, 0, 0]
        // padding: [20],
        // shadowOffsetY: 30,
      },
      axisLine: {
        lineStyle: {
          color: "#999"
        }
      },
      axisTick: {
        lineStyle: {
          color: "#00000014"
        }
      },
      //网格线
      splitLine: {
        show: true,
        lineStyle: {
          color: "#00000014"
        }
      },
    },
    yAxis: {
      name: "Brand  Name",
      nameLocation: "middle",
      nameTextStyle: {
        fontSize: 16,
        padding: [0, 0, 70, 0]
        // padding: [20],
        // shadowOffsetY: 30,
      },
      type: 'category',
      data: [],
      axisLine: {
        lineStyle: {
          color: "#999"
        }
      },
      axisTick: {
        lineStyle: {
          color: "#00000014"
        }
      },
      axisLabel: {
        formatter: function (value) {
          if (value.length > 8) {
            return value.substring(0, 5) + "...";
          } else {
            return value;
          }
        }
      },
      //网格线
      splitLine: {
        show: true,
        lineStyle: {
          color: "#00000014"
        }
      },
    },
    series: [
      {
        name: 'competitors',
        type: 'bar',
        color: "rgba(56,208,213,0.5)",
        data: []
      }
    ]
  },
  SentimentOptions: {
    legend: {
      show: false,
      x: 'center',
      y: 'top',
    },
    grid: {
      left: "5%",
      right: "4%",
      bottom: "0%",
      containLabel: true
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    calculable: true,
    series: [
      {
        name: '半径模式',
        type: 'pie',
        label: {
          normal: {
            formatter: '{b}: ({d}%)',
            show: true
          },
          emphasis: {
            show: true
          }
        },
        lableLine: {
          normal: {
            show: true
          },
          emphasis: {
            show: true
          }
        },
        data: [
          {
            value: 30,
            name: 'rose1',
            itemStyle: {
              color: 'rgba(56,208,213,0.5)'
            }
          },
          {
            value: 5,
            name: 'rose2',
            itemStyle: {
              color: 'rgba(56,208,213,0.3)'
            }
          }
        ]
      }
    ]
  },
  detaiOptions: {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: "{a} <br/>{b}: {c}%"
    },
    legend: {
      show: false,
    },
    grid: {
      top: "10%",
      left: "0%",
      right: "6%",
      bottom: "0%",
      containLabel: true
    },
    xAxis: {
      splitNumber: 0.5,
      boundaryGap: [0, 0.01],
      axisLine: {
        lineStyle: {
          color: "#999"
        }
      },
      axisTick: {
        lineStyle: {
          color: "#00000014"
        }
      },
      //网格线
      splitLine: {
        show: true,
        lineStyle: {
          color: "#00000014"
        }
      },
    },
    yAxis: {
      type: 'category',
      data: [],
      axisLine: {
        lineStyle: {
          color: "#999"
        }
      },
      axisTick: {
        lineStyle: {
          color: "#00000014"
        }
      },
      //网格线
      splitLine: {
        show: true,
        lineStyle: {
          color: "#00000014"
        }
      }
    },
    series: [
      {
        name: 'Industries',
        type: 'bar',
        borderRidius: [10, 30, 50, 80],
        color: "rgba(56,208,213,0.5)",
        data: [],
        itemStyle: {
          normal: {
            barBorderRadius:[0, 10, 10, 0]
          }
        }
      }
    ]
  },
  // ranking
  ranking: {
    rankSideList: [{
      icon: '&#xe62a;',
      label: 'Airline',
      value: 'airline'
    }, {
      icon: '&#xe632;',
      label: 'Appliances',
      value: 'appliances'
    }, {
      icon: '&#xe64f;',
      label: 'Car',
      value: 'auto'
    }, {
      icon: '&#xe63b;',
      label: 'Babies',
      value: 'babies'
    }, {
      icon: '&#xe63c;',
      label: 'Beauty',
      value: 'beauty'
    }, {
      icon: '&#xe636;',
      label: 'Books',
      value: 'books'
    }, {
      icon: '&#xe638;',
      label: 'Camera',
      value: 'camera'
    }, {
      icon: '&#xe642;',
      label: 'Electronics',
      value: 'ce'
    }, {
      icon: '&#xe63e;',
      label: 'Digital',
      value: 'digital'
    }, {
      icon: '&#xe643;',
      label: 'Education',
      value: 'education'
    }, {
      icon: '&#xe640;',
      label: 'Entertainment',
      value: 'entertainment'
    }, {
      icon: '&#xe646;',
      label: 'Fashion',
      value: 'fashion'
    }, {
      icon: '&#xe64e;',
      label: 'Finance',
      value: 'finance'
    }, {
      icon: '&#xe63f;',
      label: 'Fitness',
      value: 'fitness'
    }, {
      icon: '&#xe651;',
      label: 'Food',
      value: 'food'
    }, {
      icon: '&#xe64a;',
      label: 'Furniture',
      value: 'furniture'
    }, {
      icon: '&#xe64c;',
      label: 'Games',
      value: 'games'
    }, {
      icon: '&#xe641;',
      label: 'Health',
      value: 'health'
    }, {
      icon: '&#xe647;',
      label: 'Hotel',
      value: 'hotel'
    }, {
      icon: '&#xe644;',
      label: 'Internet',
      value: 'internet'
    }, {
      icon: '&#xe650;',
      label: 'Mobile',
      value: 'mobile'
    }, {
      icon: '&#xe64b;',
      label: 'Music',
      value: 'music'
    }, {
      icon: '&#xe63d;',
      label: 'Real Estate',
      value: 'realestate'
    }, {
      icon: '&#xe648;',
      label: 'Sports',
      value: 'sports'
    }, {
      icon: '&#xe64d;',
      label: 'Travel',
      value: 'travel'
    }],
    weixinthirtyColums: [
      {
        title: 'Rank No.',
        dataIndex: 'rank_no',
        width: '5%',
        sorter: true,
        scopedSlots: { customRender: 'rank_no' },
      }, {
        title: 'Profile Name Weixin ID',
        dataIndex: 'profileDec',
        scopedSlots: { customRender: 'profileDec' },
        width: '12%'
      }, {
        title: 'Total Post Count',
        dataIndex: 'doc_count',
        width: '8%',
        sorter: true,
        scopedSlots: { customRender: 'doc_count' },
      }, {
        title: 'Head Lines',
        dataIndex: 'headline_count',
        sorter: true,
        scopedSlots: { customRender: 'headline_count' },
      }, {
        title: 'Total Read Count',
        dataIndex: 'total_reads',
        sorter: true,
        scopedSlots: { customRender: 'total_reads' },
      }, {
        title: 'Max Read Count',
        dataIndex: 'max_reads',
        sorter: true,
        scopedSlots: { customRender: 'max_reads' },
      }, {
        title: 'Avg Read Count',
        dataIndex: 'avg_reads',
        sorter: true,
        scopedSlots: { customRender: 'avg_reads' },
      }, {
        title: 'Total Like Count',
        dataIndex: 'total_likes',
        sorter: true,
        scopedSlots: { customRender: 'total_likes' },
      }, {
        title: 'Max Like Count',
        dataIndex: 'max_likes',
        sorter: true,
        scopedSlots: { customRender: 'max_likes' },
      }, {
        title: 'Avg Like Count',
        dataIndex: 'avg_likes',
        sorter: true,
        scopedSlots: { customRender: 'avg_likes' },
      }, {
        title: 'Total Influence',
        dataIndex: 'total_post_influence',
        sorter: true,
        scopedSlots: { customRender: 'total_post_influence' },
      }, {
        title: 'Max Post Influence',
        dataIndex: 'max_post_influence',
        sorter: true,
        scopedSlots: { customRender: 'max_post_influence' },
      }, {
        title: 'Avg Post influence',
        dataIndex: 'avg_post_influence',
        sorter: true,
        scopedSlots: { customRender: 'avg_post_influence' },
      }
    ],
    weibothirtyColums: [
      {
        title: 'Rank No.',
        dataIndex: 'rank_no',
        width: '5%',
        sorter: true,
        scopedSlots: { customRender: 'rank_no' },
      }, {
        title: 'Profile Name Weixin ID',
        dataIndex: 'profileDec',
        scopedSlots: { customRender: 'profileDec' },
        width: '13%'
      }, {
        title: 'Total Post Count',
        dataIndex: 'doc_count',
        sorter: true,
        scopedSlots: { customRender: 'doc_count' },
      }, {
        title: 'Total Sum Engagement',
        dataIndex: 'total_sum_engagement',
        sorter: true,
        scopedSlots: { customRender: 'total_sum_engagement' },
      }, {
        title: 'Max Sum Engagement',
        dataIndex: 'max_sum_engagement',
        sorter: true,
        scopedSlots: { customRender: 'max_sum_engagement' },
      }, {
        title: 'Avg Sum Engagement',
        dataIndex: 'avg_sum_engagement',
        sorter: true,
        scopedSlots: { customRender: 'avg_sum_engagement' },
      }, {
        title: 'Total Comments',
        dataIndex: 'total_comments',
        sorter: true,
        scopedSlots: { customRender: 'total_comments' },
      }, {
        title: 'Max Comments',
        dataIndex: 'max_comments',
        sorter: true,
        scopedSlots: { customRender: 'max_comments' },
      }, {
        title: 'Avg Comments',
        dataIndex: 'avg_comments',
        sorter: true,
        scopedSlots: { customRender: 'avg_comments' },
      }, {
        title: 'Total Likes',
        dataIndex: 'total_likes',
        sorter: true,
        scopedSlots: { customRender: 'total_likes' },
      }, {
        title: 'Max Likes',
        dataIndex: 'max_likes',
        sorter: true,
        scopedSlots: { customRender: 'max_likes' },
      }, {
        title: 'Avg Likes',
        dataIndex: 'avg_likes',
        sorter: true,
        scopedSlots: { customRender: 'avg_likes' },
      }
    ]
  },
  // weixin benchMark
  benchOneOptions: {
    title: {
      text: ''
    },
    legend: {
      x: 'center',
      y: 'bottom',
      icon: "rect"
    },
    tooltip: {
      trigger: 'Axis',
      formatter: '{a}: <br> Reads:' + '{b}<br>' + 'Likes: {c1}'
    },
    grid: {
      top: "10%",
      left: "10%",
      right: "10%",
      bottom: "25%",
      containLabel: true
    },
    xAxis: {
      name: "Reads",
      nameLocation: "middle",
      nameTextStyle: {
        fontSize: 16,
        padding: [20, 0, 0, 0]
      },
      type: "category",
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: "#999"
        }
      },
      axisTick: {
        lineStyle: {
          color: "#00000014"
        }
      },
      //网格线
      splitLine: {
        show: true,
        lineStyle: {
          color: "#00000014"
        }
      },
    },
    yAxis: {
      name: "Likes",
      nameLocation: "middle",
      nameTextStyle: {
        fontSize: 16,
        padding: [0, 0, 45, 0]
      },
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#999"
        }
      },
      axisTick: {
        lineStyle: {
          color: "#00000014"
        }
      },
      //网格线
      splitLine: {
        show: true,
        lineStyle: {
          color: "#00000014"
        }
      },
      scale: true
    },
    series: [],
  },
  benchTwoOptions: {
    title: {
      text: ''
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      x: 'center',
      y: 'bottom',
      icon: "rect"
    },
    grid: {
      top: "10%",
      left: "10%",
      right: "10%",
      bottom: "25%",
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: [],
      type: "category",
      axisLine: {
        lineStyle: {
          color: "#999"
        }
      },
      axisTick: {
        lineStyle: {
          color: "#00000014"
        }
      },
      //网格线
      splitLine: {
        show: true,
        lineStyle: {
          color: "#00000014"
        }
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: "#999"
        }
      },
      axisTick: {
        lineStyle: {
          color: "#00000014"
        }
      },
      //网格线
      splitLine: {
        show: true,
        lineStyle: {
          color: "#00000014"
        }
      },
      scale: true
    },
    series: []
  },
  benchThreeOptions: {
    title: {
      text: ''
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      x: 'center',
      y: 'bottom',
      icon: "rect"
    },
    grid: {
      top: "10%",
      left: "10%",
      right: "10%",
      bottom: "25%",
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: [],
      type: "category",
      axisLine: {
        lineStyle: {
          color: "#999"
        }
      },
      axisTick: {
        lineStyle: {
          color: "#00000014"
        }
      },
      //网格线
      splitLine: {
        show: true,
        lineStyle: {
          color: "#00000014"
        }
      },
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: "#999"
        }
      },
      axisTick: {
        lineStyle: {
          color: "#00000014"
        }
      },
      //网格线
      splitLine: {
        show: true,
        lineStyle: {
          color: "#00000014"
        }
      },
      scale: true
    },
    series: []
  },
  benchmarkColor: {
    blue_top_20_colors: [
      "#d0dafe",
      "#b0c0fd",
      "#92a9fc",
      "#8da0fc",
      "#7592fb",
      "#587bf8",
      "#5077fb",
      "#5572fa",
      "#4f6efb",
      "#5070ec",
      "#4762db",
      "#3d54cb",
      "#2c3bae",
      "#7a88c9",
      "#5d6dbe",
      "#4054b2",
      "#3a4ca8",
      "#31429d",
      "#293891",
      "#1b277c",
      "#ff9e94",
      "#557755",
      "#D8BFD8",
      "#DDA0DD",
      "#EE82EE",
      "#DA70D6",
      "#FF00FF",
      "#FF00FF",
      "#BA55D3",
      "#9370DB",
      "#8A2BE2",
      "#9400D3"
    ],
  },
  // detail
  count0Options: {
    tooltip: {
      trigger: "axis"
    },
    legend: {
      show: false,
      data: [
        {
          name: "",
          icon: "rect"
        }
      ]
    },
    grid: {
      top: "4%",
      left: "4%",
      right: "4%",
      bottom: "4%",
      containLabel: true
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: "#999"
        }
      },
      axisTick: {
        lineStyle: {
          color: "#00000014"
        }
      },
      //网格线
      splitLine: {
        show: true,
        lineStyle: {
          color: "#00000014"
        }
      },
      data: []
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#999"
        }
      },
      axisTick: {
        lineStyle: {
          color: "#00000014"
        }
      },
      //网格线
      splitLine: {
        show: true,
        lineStyle: {
          color: "#00000014"
        }
      },
    },
    series: [
      {
        name: "",
        type: "line",
        smooth: true,
        symbolSize: 7,
        data: [],
        itemStyle: {
          normal: {
            color: "rgba(56,208,213,0.5)",
            lineStyle: {
              color: "#B37FEBFF",
              width: 1
            }
          }
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(56,208,213,0.5)" // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: "rgba(56,208,213,0.3)" // 100% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(56,208,213,0.1)" // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        }
      }
    ]
  },
  count1Options: {
    tooltip: {
      trigger: "axis"
    },
    legend: {
      show: false,
      data: [
        {
          name: "",
          icon: "rect"
        }
      ]
    },
    grid: {
      top: "4%",
      left: "4%",
      right: "4%",
      bottom: "4%",
      containLabel: true
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: "#999"
        }
      },
      axisTick: {
        lineStyle: {
          color: "#00000014"
        }
      },
      //网格线
      splitLine: {
        show: true,
        lineStyle: {
          color: "#00000014"
        }
      },
      data: []
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#999"
        }
      },
      axisTick: {
        lineStyle: {
          color: "#00000014"
        }
      },
      //网格线
      splitLine: {
        show: true,
        lineStyle: {
          color: "#00000014"
        }
      },
    },
    series: [
      {
        name: "",
        type: "line",
        smooth: true,
        symbolSize: 7,
        data: [],
        itemStyle: {
          normal: {
            color: "rgba(56,208,213,0.5)",
            lineStyle: {
              color: "#B37FEBFF",
              width: 1
            }
          }
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(56,208,213,0.5)" // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: "rgba(56,208,213,0.3)" // 100% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(56,208,213,0.1)" // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        }
      }
    ]
  },
  count2Options: {
    tooltip: {
      trigger: "axis"
    },
    legend: {
      show: false,
      data: [
        {
          name: "",
          icon: "rect"
        }
      ]
    },
    grid: {
      top: "4%",
      left: "4%",
      right: "4%",
      bottom: "4%",
      containLabel: true
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: "#999"
        }
      },
      axisTick: {
        lineStyle: {
          color: "#00000014"
        }
      },
      //网格线
      splitLine: {
        show: true,
        lineStyle: {
          color: "#00000014"
        }
      },
      data: []
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#999"
        }
      },
      axisTick: {
        lineStyle: {
          color: "#00000014"
        }
      },
      //网格线
      splitLine: {
        show: true,
        lineStyle: {
          color: "#00000014"
        }
      },
    },
    series: [
      {
        name: "",
        type: "line",
        smooth: true,
        symbolSize: 7,
        data: [],
        itemStyle: {
          normal: {
            color: "rgba(56,208,213,0.5)",
            lineStyle: {
              color: "#B37FEBFF",
              width: 1
            }
          }
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(56,208,213,0.5)" // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: "rgba(56,208,213,0.3)" // 100% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(56,208,213,0.1)" // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        }
      }
    ]
  },
  count3Options: {
    tooltip: {
      trigger: "axis"
    },
    legend: {
      show: false,
      data: [
        {
          name: "",
          icon: "rect"
        }
      ]
    },
    grid: {
      top: "4%",
      left: "4%",
      right: "4%",
      bottom: "4%",
      containLabel: true
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: "#999"
        }
      },
      axisTick: {
        lineStyle: {
          color: "#00000014"
        }
      },
      //网格线
      splitLine: {
        show: true,
        lineStyle: {
          color: "#00000014"
        }
      },
      data: []
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#999"
        }
      },
      axisTick: {
        lineStyle: {
          color: "#00000014"
        }
      },
      //网格线
      splitLine: {
        show: true,
        lineStyle: {
          color: "#00000014"
        }
      },
    },
    series: [
      {
        name: "",
        type: "line",
        smooth: true,
        symbolSize: 7,
        data: [],
        itemStyle: {
          normal: {
            color: "rgba(56,208,213,0.5)",
            lineStyle: {
              color: "#B37FEBFF",
              width: 1
            }
          }
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(56,208,213,0.5)" // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: "rgba(56,208,213,0.3)" // 100% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(56,208,213,0.1)" // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        }
      }
    ]
  },
  count4Options: {
    tooltip: {
      trigger: "axis"
    },
    legend: {
      show: false,
      data: [
        {
          name: "",
          icon: "rect"
        }
      ]
    },
    grid: {
      top: "4%",
      left: "4%",
      right: "4%",
      bottom: "4%",
      containLabel: true
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: "#999"
        }
      },
      axisTick: {
        lineStyle: {
          color: "#00000014"
        }
      },
      //网格线
      splitLine: {
        show: true,
        lineStyle: {
          color: "#00000014"
        }
      },
      data: []
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#999"
        }
      },
      axisTick: {
        lineStyle: {
          color: "#00000014"
        }
      },
      //网格线
      splitLine: {
        show: true,
        lineStyle: {
          color: "#00000014"
        }
      },
    },
    series: [
      {
        name: "",
        type: "line",
        smooth: true,
        symbolSize: 7,
        data: [],
        itemStyle: {
          normal: {
            color: "rgba(56,208,213,0.5)",
            lineStyle: {
              color: "#B37FEBFF",
              width: 1
            }
          }
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(56,208,213,0.5)" // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: "rgba(56,208,213,0.3)" // 100% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(56,208,213,0.1)" // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        }
      }
    ]
  },
  count5Options: {
    tooltip: {
      trigger: "axis"
    },
    legend: {
      show: false,
      data: [
        {
          name: "",
          icon: "rect"
        }
      ]
    },
    grid: {
      top: "4%",
      left: "4%",
      right: "4%",
      bottom: "4%",
      containLabel: true
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: "#999"
        }
      },
      axisTick: {
        lineStyle: {
          color: "#00000014"
        }
      },
      //网格线
      splitLine: {
        show: true,
        lineStyle: {
          color: "#00000014"
        }
      },
      data: []
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#999"
        }
      },
      axisTick: {
        lineStyle: {
          color: "#00000014"
        }
      },
      //网格线
      splitLine: {
        show: true,
        lineStyle: {
          color: "#00000014"
        }
      },
    },
    series: [
      {
        name: "",
        type: "line",
        smooth: true,
        symbolSize: 7,
        data: [],
        itemStyle: {
          normal: {
            color: "rgba(56,208,213,0.5)",
            lineStyle: {
              color: "#B37FEBFF",
              width: 1
            }
          }
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(56,208,213,0.5)" // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: "rgba(56,208,213,0.3)" // 100% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(56,208,213,0.1)" // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        }
      }
    ]
  },
  count6Options: {
    tooltip: {
      trigger: "axis"
    },
    legend: {
      show: false,
      data: [
        {
          name: "",
          icon: "rect"
        }
      ]
    },
    grid: {
      top: "4%",
      left: "4%",
      right: "4%",
      bottom: "4%",
      containLabel: true
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: "#999"
        }
      },
      axisTick: {
        lineStyle: {
          color: "#00000014"
        }
      },
      //网格线
      splitLine: {
        show: true,
        lineStyle: {
          color: "#00000014"
        }
      },
      data: []
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#999"
        }
      },
      axisTick: {
        lineStyle: {
          color: "#00000014"
        }
      },
      //网格线
      splitLine: {
        show: true,
        lineStyle: {
          color: "#00000014"
        }
      },
    },
    series: [
      {
        name: "",
        type: "line",
        smooth: true,
        symbolSize: 7,
        data: [],
        itemStyle: {
          normal: {
            color: "rgba(56,208,213,0.5)",
            lineStyle: {
              color: "#B37FEBFF",
              width: 1
            }
          }
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(56,208,213,0.5)" // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: "rgba(56,208,213,0.3)" // 100% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(56,208,213,0.1)" // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        }
      }
    ]
  },
  count7Options: {
    tooltip: {
      trigger: "axis"
    },
    legend: {
      show: false,
      data: [
        {
          name: "",
          icon: "rect"
        }
      ]
    },
    grid: {
      top: "4%",
      left: "4%",
      right: "4%",
      bottom: "4%",
      containLabel: true
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: "#999"
        }
      },
      axisTick: {
        lineStyle: {
          color: "#00000014"
        }
      },
      //网格线
      splitLine: {
        show: true,
        lineStyle: {
          color: "#00000014"
        }
      },
      data: []
    },
    yAxis: {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#999"
        }
      },
      axisTick: {
        lineStyle: {
          color: "#00000014"
        }
      },
      //网格线
      splitLine: {
        show: true,
        lineStyle: {
          color: "#00000014"
        }
      },
    },
    series: [
      {
        name: "",
        type: "line",
        smooth: true,
        symbolSize: 7,
        data: [],
        itemStyle: {
          normal: {
            color: "rgba(56,208,213,0.5)",
            lineStyle: {
              color: "#B37FEBFF",
              width: 1
            }
          }
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(56,208,213,0.5)" // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: "rgba(56,208,213,0.3)" // 100% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(56,208,213,0.1)" // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        }
      }
    ]
  },
  compareRadarOptions: {
    title: {
      text: ''
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      show: false,
      x: 'center',
    },
    radar: [
      {
        indicator: [
          // { text: '品牌', max: 100 },
          // { text: '内容', max: 100 },
          // { text: '可用性', max: 100 },
          // { text: '功能', max: 100 }
        ],
        radius: 100,

        axisTick: {
          lineStyle: {
            color: "#00000014"
          }
        },
        splitArea: {
          areaStyle: {
            color: 'rgba(0,0,0,0)'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        splitLine: {
          lineStyle: {
            color: '#00000014'
          }
        }
      }
    ],
    series: [
      {
        type: 'radar',
        color: 'rgba(56,208,213,0.5)',
        tooltip: {
          trigger: 'item'
        },
        itemStyle: { normal: { areaStyle: { type: 'default' } } },
        data: [
          {
            value: [],
            name: 'Radar'
          }
        ]
      }
    ]
  }
}
export default MockData;