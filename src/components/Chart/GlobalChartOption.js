const MockData = {
  trendOptions: {
    tooltip: {
      trigger: "axis"
    },
    legend: {
      data: [
        {
          name: "",
          icon: "rect"
        }
      ]
    },
    grid: {
      top: "8%",
      left: "6%",
      right: "4%",
      bottom: "15%",
      containLabel: true
    },
    xAxis: {
      name: "Day",
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
      name: "No. of Mention(s)",
      nameLocation: "middle",
      nameTextStyle: {
        fontSize: 16,
        padding: [0, 0, 15, 0]
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
            color: "rgba(179,127,235,0.5)",
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
                color: "rgba(179,127,235,0.5)" // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: "rgba(179,127,235,0.3)" // 100% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(179,127,235,0.1)" // 100% 处的颜色
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
      name: "No. of Mention(s)",
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
        padding: [0, 0, 60, 0]
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
        color: "rgba(179,127,235,0.5)",
        data: []
      }
    ]
  },
  SentimentOptions: {
    legend: {
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
            show: false
          },
          emphasis: {
            show: false
          }
        },
        lableLine: {
          normal: {
            show: false
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
              color: 'rgba(179,127,235,0.5)'
            }
          },
          {
            value: 5,
            name: 'rose2',
            itemStyle: {
              color: 'rgba(179,127,235,0.3)'
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
      }
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
        name: 'competitors',
        type: 'bar',
        color: "rgba(179,127,235,0.5)",
        data: []
      }
    ]
  },
  // ranking
  ranking: {
    rankSideList: [{
      icon: '&#xe71a;',
      label: 'Airline',
      value: 'airline'
    }, {
      icon: '&#xe70c;',
      label: 'Appliances',
      value: 'appliances'
    }, {
      icon: '&#xe63a;',
      label: 'Car',
      value: 'auto'
    }, {
      icon: '&#xe651;',
      label: 'Babies',
      value: 'babies'
    }, {
      icon: '&#xe627;',
      label: 'Beauty',
      value: 'beauty'
    }, {
      icon: '&#xe607;',
      label: 'Books',
      value: 'books'
    }, {
      icon: '&#xe60c;',
      label: 'Camera',
      value: 'camera'
    }, {
      icon: '&#xe602;',
      label: 'Electronics',
      value: 'ce'
    }, {
      icon: '&#xe628;',
      label: 'Digital',
      value: 'digital'
    }, {
      icon: '&#xe613;',
      label: 'Education',
      value: 'education'
    }, {
      icon: '&#xe62f;',
      label: 'Entertainment',
      value: 'entertainment'
    }, {
      icon: '&#xe66f;',
      label: 'Fashion',
      value: 'fashion'
    }, {
      icon: '&#xe655;',
      label: 'Finance',
      value: 'finance'
    }, {
      icon: '&#xe71a;',
      label: 'Fitness',
      value: 'fitness'
    }, {
      icon: '&#xe728;',
      label: 'Food',
      value: 'food'
    }, {
      icon: '&#xe616;',
      label: 'Furniture',
      value: 'furniture'
    }, {
      icon: '&#xe620;',
      label: 'Games',
      value: 'games'
    }, {
      icon: '&#xe60f;',
      label: 'Health',
      value: 'health'
    }, {
      icon: '&#xe6ac;',
      label: 'Hotel',
      value: 'hotel'
    }, {
      icon: '&#xe7ac;',
      label: 'Internet',
      value: 'internet'
    }, {
      icon: '&#xe624;',
      label: 'Mobile',
      value: 'mobile'
    }, {
      icon: '&#xe7b8;',
      label: 'Music',
      value: 'music'
    }, {
      icon: '&#xe770;',
      label: 'Real Estate',
      value: 'realestate'
    }, {
      icon: '&#xe619;',
      label: 'Sports',
      value: 'sports'
    }, {
      icon: '&#xe7b9;',
      label: 'Travel',
      value: 'travel'
    }],
    thirtyColums: [{
      title: 'Rank No.',
      dataIndex: 'rank_no',
      width: '7%'
    }, {
      title: 'Profile Name Weixin ID',
      dataIndex: 'profileDec',
      scopedSlots: { customRender: 'profileDec' },
      width: '13%'
    }, {
      title: 'Total Post Count',
      dataIndex: 'doc_count',
      width: '10%'
    },{
      title: 'Headlines',
      dataIndex: 'headline_count'
    }, {
      title: 'Total Read Count',
      dataIndex: 'total_reads'
    }, {
      title: 'Max Read Count',
      dataIndex: 'max_reads'
    },{
      title: 'Avg Read Count',
      dataIndex: 'avg_reads'
    }, {
      title: 'Total Like Count',
      dataIndex: 'total_likes'
    }, {
      title: 'Max Like Count',
      dataIndex: 'max_likes'
    },{
      title: 'Avg Like Count',
      dataIndex: 'avg_likes'
    },{
      title: 'Total Influence',
      dataIndex: 'total_post_influence'
    }, {
      title: 'Max Post Influence',
      dataIndex: 'max_post_influence'
    },{
      title: 'Avg Post influence',
      dataIndex: 'avg_post_influence'
    }]
  },
}
export default MockData;