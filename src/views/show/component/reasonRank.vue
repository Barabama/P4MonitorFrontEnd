<template>
  <div id="chartPie" style="width: 100%; height: 36vh"></div>
</template>

<script>
import Global from '@/Global.vue'
import * as echarts from 'echarts'
require('echarts/theme/macarons') // 引入主题

export default {
  data() {
    return {
      chartPie: null,
      launch: Global.launch
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.launch === true) {
        this.drawPieChartNormal()
      } else {
        this.drawPieChartAbnormal()
      }
    })
  },
  methods: {
    drawPieChartNormal() {
      this.chartPie = echarts.init(
        document.getElementById('chartPie'),
        'macarons'
      )
      this.chartPie.setOption({
        title: {
          text: '',
          subtext: '',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          textStyle: {
            fontSize: 18, // 字体大小
            color: '#ffffff' // 字体颜色
          },
          data: ['TCP', 'UDP', '其他'],
          left: 'center',
          top: 'bottom',
          orient: 'horizontal'
        },
        series: [
          {
            name: '协议',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['50%', '50%'],
            data: [
              { value: 74, name: 'TCP' },
              { value: 17, name: 'UDP' },
              { value: 9, name: '其他' }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600,
            label: {
              normal: {
                show: false
              }
            }
          }
        ]
      })
    },
    drawPieChartAbnormal() {
      this.chartPie = echarts.init(
        document.getElementById('chartPie'),
        'macarons'
      )
      this.chartPie.setOption({
        title: {
          text: '',
          subtext: '',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          textStyle: {
            fontSize: 18, // 字体大小
            color: '#ffffff' // 字体颜色
          },
          data: ['TCP', 'UDP', '其他'],
          left: 'center',
          top: 'bottom',
          orient: 'horizontal'
        },
        series: [
          {
            name: '协议',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['50%', '50%'],
            data: [
              { value: 94, name: 'TCP' },
              { value: 2, name: 'UDP' },
              { value: 4, name: '其他' }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600,
            label: {
              normal: {
                show: false
              }
            }
          }
        ]
      })
    }
  }
}
</script>

<style scoped></style>
