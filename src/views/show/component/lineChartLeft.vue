<template>
  <div
    :id="'lineChart' + lineSet.lineIndex"
    ref="lineChart"
    style="width: 100%; height: 25vh"
  ></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'Barchart',
  props: {
    lineSet: { type: Object, required: true }
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
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    createLineChart() {
      var chartDom = this.$refs.lineChart
      var myChart = echarts.init(chartDom)
      this.option.series.forEach((item) => {
        item.data = []
      })
      this.option.xAxis[0].data = []
      this.option = {
        grid: {
          x: 55,
          y: 55,
          x2: 40,
          y2: 50,
          borderWidth: 10
        },
        title: {
          text: this.lineSet.title,
          textStyle: {
            fontSize: 15,
            fontWeight: 'normal',
            // 标题颜色
            color: '#ffffff'
          }
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
            data: this.lineSet.dataAxis,
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
            name: 'Line 2',
            type: 'line',
            stack: 'Total',
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
            data: this.lineSet.data
          }
        ]
      }
      this.option && myChart.setOption(this.option)
    }
  }
}
</script>

<style scoped></style>
