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
			left: "5%",
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
				padding: [0, 0, 30, 0]
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
				data: [120, 132, 101, 134, 90, 230, 210],
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
			left: "6%",
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
				formatter: function(value) {
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
}
export default MockData;