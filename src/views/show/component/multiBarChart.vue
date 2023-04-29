<template>
  <div
    :id="'multiBarChart' + barSet.barIndex"
    ref="multiBarChart"
    style="width: 100%; height: 300px"
  ></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'BarChar',
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
          y2: 50,
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
        legend: {
          data: this.barSet.dataFrom,
          top: 40,
          textStyle: {
            fontSize: 10,
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
            data: this.barSet.dataAxis,
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
            name: '',
            type: 'line',
            data: [82, 85, 83, 83, 84, 86, 86],
            color: '#315070'
          }
        ]
      }
      this.option && myChart.setOption(this.option)
    }
  }
}
</script>

<style scoped></style>
