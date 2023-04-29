<template>
  <div :id="'barChart' + barSet.barIndex" ref="barChart" style="width: 100%; height: 30vh"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'Barchart',
  props: {
    barSet: { type: Object, required: true }
  // data: { type: Object, required: true }
  },
  data() {
    return {
      timer: null,
      option: {
        xAxis: [
          {
            data: []
          }
        ],
        yAxis: [

        ],
        series: [

        ]
      }
    }
  },
  mounted() {
    this.createLineChart()
    this.timer = setInterval(() => {
      this.createLineChart()
    }, 10000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    createLineChart() {
      var chartDom = this.$refs.barChart
      var myChart = echarts.init(chartDom)
      this.option.series.forEach(item => {
        item.data = []
      })
      this.option.xAxis[0].data = []
      // prettier-ignore
      // let dataAxis = ['11-02', '11-03', '11-04', '11-05', '11-06', '11-07', '11-08'];
      // prettier-ignore
      // let data = [152235, 60000, 150000, 10000, 90000, 110000, 70000];
      // let yMax = 180000;
      // let dataShadow = [];
      // for (let i = 0; i < data.length; i++) {
      //     dataShadow.push(yMax);
      // }
      this.option = {
        grid: {
          x: 55,
          y: 55,
          x2: 10,
          y2: 30,
          borderWidth: 10
        },
        title: {
          text: this.barSet.title,
          textStyle: {
            fontSize: 15,
            fontWeight: 'normal',
            // 标题颜色
            color: '#ffffff'
          }
        },
        xAxis: {
          data: this.barSet.dataAxis,
          axisLabel: {
            inside: false,
            color: '#fff'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 5
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#999'
          },
          splitLine: {
            show: false
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        legend: {
          data: this.barSet.dataFrom,
          top: 20,
          x: 70,
          textStyle: {
            fontSize: 10,
            fontWeight: 'normal',
            // 标题颜色
            color: '#ffffff'
          }
        },
        series: [
          {
            name: this.barSet.dataFrom[0],
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(128, 255, 165)'
                },
                {
                  offset: 1,
                  color: 'rgba(1, 191, 236)'
                }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
            },
            data: this.barSet.data[0]
          },
          {
            name: this.barSet.dataFrom[1],
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(0, 221, 255)'
                },
                {
                  offset: 1,
                  color: 'rgba(77, 119, 255)'
                }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
            },
            data: this.barSet.data[1]
          },
          {
            name: this.barSet.dataFrom[2],
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(55, 162, 255)'
                },
                {
                  offset: 1,
                  color: 'rgba(116, 21, 219)'
                }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
            },
            data: this.barSet.data[2]
          },
          {
            name: this.barSet.dataFrom[3],
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(255, 0, 135)'
                },
                {
                  offset: 1,
                  color: 'rgba(135, 0, 157)'
                }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
            },
            data: this.barSet.data[3]
          },
          {
            name: this.barSet.dataFrom[4],
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(20, 191, 110)'
                },
                {
                  offset: 1,
                  color: 'rgba(20, 62, 176)'
                }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
            },
            data: this.barSet.data[4]
          },
          {
            name: this.barSet.dataFrom[5],
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(155, 200, 100)'
                },
                {
                  offset: 1,
                  color: 'rgba(124, 255, 176)'
                }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
            },
            data: this.barSet.data[5]
          },
          {
            name: this.barSet.dataFrom[6],
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(150, 200, 100)'
                },
                {
                  offset: 1,
                  color: 'rgba(0, 255, 200)'
                }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
            },
            data: this.barSet.data[6]
          }
        ]
      }
      // Enable data zoom when user click bar.
      const zoomSize = 7
      myChart.on('click', function(params) {
        console.log(this.barSet.dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)])
        myChart.dispatchAction({
          type: 'dataZoom',
          startValue: this.barSet.dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
          endValue:
            this.barSet.dataAxis[Math.min(params.dataIndex + zoomSize / 2, this.barSet.data.length - 1)]
        })
      })
      this.option && myChart.setOption(this.option)
    }
  }
}
</script>

<style scoped>

</style>
