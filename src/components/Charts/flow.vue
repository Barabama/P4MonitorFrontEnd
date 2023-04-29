<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import { api } from '@/config'
import { cloneDeep } from 'lodash-es'
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
      iterval: -1
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    clearInterval(this.interval)
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    async initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      const data = await fetch(api + '/send_probe').then(r => r.json())
      const item = {
        name: 's1-eth2',
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
        data: []
      }
      const series = []
      const flowData = []
      const names = [] // 连接名
      let i = 0
      for (const name of Object.keys(data.flow)) {
        flowData.push(Array(10).fill(0))
        const R = Math.floor(Math.random() * 256)
        const G = Math.floor(Math.random() * 256)
        const B = Math.floor(Math.random() * 256)
        const newItem = cloneDeep(item)
        newItem.itemStyle.normal.color = `rgb(${R},${G},${B})`
        newItem.itemStyle.normal.borderColor = `rgb(${R},${G},${B},0.27)`
        newItem.areaStyle.normal.color = new echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            {
              offset: 0,
              color: `rgb(${R},${G},${B},0.3)`
            },
            {
              offset: 0.8,
              color: `rgb(${R},${G},${B},0)`
            }
          ],
          false
        )

        names.push(name)
        newItem.name = name
        newItem.data = flowData[i]
        i++
        series.push(newItem)
        console.log(newItem)
      }
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
          data: names,
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
            name: '吞吐量(Bytes)',
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
        series
      })

      this.interval = setInterval(async() => {
        const data = await fetch(api + '/send_probe').then(r => r.json())
        console.log(data.flow)
        for (let i = 0; i < series.length; i++) {
          flowData[i].push(Object.values(data.flow)[i])
          flowData[i].shift()
        }
        this.chart.setOption({
          series
        })
      }, 2000)
    }
  }
}
</script>
