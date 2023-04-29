<template>
  <div
    :id="'multiBarChart' + barSet.barIndex"
    ref="multiBarChart"
    style="width: 100%; height: 30vh"
  ></div>
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
        yAxis: [],
        series: []
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
      var chartDom = this.$refs.multiBarChart
      var myChart = echarts.init(chartDom)
      this.option.series.forEach((item) => {
        item.data = []
      })
      this.option.xAxis[0].data = []
      this.option = {
        grid: {
          x: 55,
          y: 55,
          x2: 10,
          y2: 0,
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
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
          show: true,
          feature: {
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            // prettier-ignore
            data: this.barSet.dataAxis,
            name: '时间/s',
            axisLabel: {
              show: true,
              textStyle: {
                color: 'rgb(150,150,150)',
                // 更改坐标轴文字颜色
                fontSize: 12
                // 更改坐标轴文字大小
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#315070'
                // 更改坐标轴颜色
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: 'rgb(150,150,150)',
                // 更改坐标轴文字颜色
                fontSize: 12
                // 更改坐标轴文字大小
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#315070'
                // 更改坐标轴颜色
              }
            }
          }
        ],
        series: [
          {
            name: 'TCP',
            type: 'line',
            lineStyle: {
              width: 0
            },
            smooth: true,
            data: [5102, 5827, 5675, 5899, 5997, 5876, 5976],
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(95,114,189)'
                },
                {
                  offset: 1,
                  color: 'rgba(155,35,234)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            }
          },
          {
            name: 'UDP',
            type: 'line',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(230,233,240)'
                },
                {
                  offset: 1,
                  color: 'rgba(238,241,245)'
                }
              ])
            },
            emphasis: {
              focus: 'series'
            },
            data: [474, 487, 587, 589, 476, 498, 578]
          },
          {
            name: '其他类型',
            type: 'line',
            smooth: true,
            lineStyle: {
              width: 0
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
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
              focus: 'series'
            },
            data: [510, 425, 545, 400, 589, 468, 479]
          }
        ]
      }
      this.option && myChart.setOption(this.option)
    }
  }
}
</script>

<style scoped></style>
