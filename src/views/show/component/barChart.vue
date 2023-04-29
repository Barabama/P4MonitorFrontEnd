<template>
  <div :id="'barChart' + barSet.barIndex" ref="barChart" style="width: 100%; height: 300px"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'Barchar',
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
      this.option.xAxis[0].data =
      this.option = {
        grid: {
          x: 55,
          y: 35,
          x2: 10,
          y2: 165,
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
        series: [
          {
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: 'rgb(34,69,114)' },
                { offset: 1, color: 'rgb(4,17,83)' }
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
            data: this.barSet.data
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
