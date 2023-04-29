<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import { state } from '@/state'
import { api } from '@/config'
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null,
      delayData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    clearInterval(this.inter)
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))

      this.chart.setOption({
        backgroundColor: '#333f5c',
        title: {
          top: 20,
          text: 'Requests',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#F1F1F3'
          },
          left: '1%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        legend: {
          top: 20,
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: ['延时信息'],
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: '#faf0e6'
          }
        },
        grid: {
          top: 100,
          left: '2%',
          right: '5%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            name: '时间(s)',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#faf0e6'
              }
            },
            data: []
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '延时(ms)',
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#faf0e6'
              }
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                fontSize: 14
              }
            },
            splitLine: {
              lineStyle: {
                color: '#999999'
              }
            }
          }
        ],
        series: [
          {
            name: '延时信息',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(137, 189, 27, 0.3)'
                    },
                    {
                      offset: 0.8,
                      color: 'rgba(137, 189, 27, 0)'
                    }
                  ],
                  false
                ),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(137,189,27)',
                borderColor: 'rgba(137,189,2,0.27)',
                borderWidth: 12
              }
            },
            data: this.delayData
          }
        ]
      })
      this.inter = setInterval(async() => {
        const data = await fetch(api + '/send_probe').then(r => r.json())
        this.delayData.push(data.delay)
        this.chart.setOption({
          series: [
            {
              data: this.delayData
            }
          ]
        })
        this.delayData.shift()
      }, 2000)
    }
  }
}
</script>
