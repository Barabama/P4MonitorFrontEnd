<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import Global from '@/Global.vue'

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
      launch: Global.launch,
      chart: null,
      monitorData1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      monitorData2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      monitorData3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      monitorData4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      monitorData5: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
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
          data: ['s1-eth2', 's1-eth3', 's2-eth3', 's2-eth4', 's3-eth4'],
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: '#faf0e6'
          }
        },
        grid: {
          top: 100,
          left: '8%',
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
            name: '有效信息 = 监测数据包 / 总数据包 x 100%',
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
            data: this.monitorData1
          },
          {
            name: 's1-eth3',
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
                      color: 'rgba(255, 255, 0, 0.3)'
                    },
                    {
                      offset: 0.8,
                      color: 'rgba(255, 255, 0, 0)'
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
                color: 'rgb(255, 255, 0)',
                borderColor: 'rgba(255, 255, 0,0.2)',
                borderWidth: 12
              }
            },
            data: this.monitorData2
          },
          {
            name: 's2-eth3',
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
                      color: 'rgba(219, 50, 51, 0.3)'
                    },
                    {
                      offset: 0.8,
                      color: 'rgba(219, 50, 51, 0)'
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
                color: 'rgb(219,50,51)',
                borderColor: 'rgba(219,50,51,0.2)',
                borderWidth: 12
              }
            },
            data: this.monitorData3
          },
          {
            name: 's2-eth4',
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
                      color: 'rgba(255,128,255, 0.3)'
                    },
                    {
                      offset: 0.8,
                      color: 'rgba(255,128,255, 0)'
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
                color: 'rgb(255,128,255)',
                borderColor: 'rgba(255,128,255,0.2)',
                borderWidth: 12
              }
            },
            data: this.monitorData4
          },
          {
            name: 's3-eth4',
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
                      color: 'rgba(0, 136, 212, 0.3)'
                    },
                    {
                      offset: 0.8,
                      color: 'rgba(0, 136, 212, 0)'
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
                color: 'rgb(0, 136, 212)',
                borderColor: 'rgba(0, 136, 212)',
                borderWidth: 12
              }
            },
            data: this.monitorData5
          }
        ]
      })
      var tx1 = [
        189, 199, 219, 179, 190, 186, 178, 158, 190, 190, 188, 190, 180, 180,
        157, 199, 186, 191, 193, 196, 202, 179, 193, 187, 189, 190, 186, 207,
        189, 219, 176, 198, 147, 30
      ]
      var ty1 = [
        5, 3, 6, 3, 1, 1, 1, 0, 2, 6, 2, 1, 0, 2, 0, 1, 1, 3, 1, 4, 4, 0, 3, 5,
        2, 0, 2, 2, 2, 3, 0, 3, 1, 0
      ]
      var tmp1 = []
      var i = 0
      var v = 0
      for (i = 0; i < tx1.length; i++) {
        v = (ty1[i] / tx1[i]) * 100
        tmp1.push(v)
      }
      var tx2 = [
        109, 102, 87, 126, 118, 112, 129, 127, 111, 108, 104, 105, 105, 107,
        110, 124, 108, 110, 110, 110, 120, 126, 115, 97, 110, 129, 116, 112,
        103, 114, 123, 106, 97, 25
      ]
      var ty2 = [
        0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 2, 0, 0, 1, 0, 0, 1, 1, 1,
        0, 0, 1, 0, 0, 2, 0, 1, 0, 0
      ]
      var tmp2 = []
      for (i = 0; i < tx2.length; i++) {
        v = (ty2[i] / tx2[i]) * 100
        tmp2.push(v)
      }
      var tx3 = [
        51, 63, 64, 46, 61, 47, 46, 46, 47, 55, 63, 52, 50, 55, 42, 40, 54, 50,
        65, 57, 63, 56, 55, 50, 53, 56, 52, 61, 58, 63, 55, 51, 57, 15
      ]
      var ty3 = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ]
      var tmp3 = []
      for (i = 0; i < tx3.length; i++) {
        v = (ty3[i] / tx3[i]) * 100
        tmp3.push(v)
      }
      var tx4 = [
        138, 136, 155, 134, 128, 139, 133, 114, 140, 128, 134, 143, 126, 125,
        114, 156, 134, 141, 130, 137, 140, 121, 140, 135, 137, 133, 135, 147,
        132, 152, 122, 150, 86, 16
      ]
      var ty4 = [
        0, 1, 1, 1, 0, 1, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
        0, 0, 0, 0, 0, 1, 0, 0, 0, 0
      ]
      var tmp4 = []
      for (i = 0; i < tx4.length; i++) {
        v = (ty4[i] / tx4[i]) * 100
        tmp4.push(v)
      }
      var tx5 = [
        159, 166, 150, 172, 179, 155, 180, 172, 159, 162, 165, 159, 153, 164,
        153, 162, 164, 159, 171, 172, 181, 184, 169, 147, 164, 185, 166, 174,
        160, 176, 180, 155, 144, 53
      ]
      var ty5 = [
        2, 1, 3, 2, 3, 3, 1, 4, 0, 1, 3, 2, 2, 3, 5, 5, 4, 2, 2, 4, 1, 3, 3, 4,
        1, 2, 1, 3, 3, 4, 2, 4, 0, 2
      ]
      var tmp5 = []
      for (i = 0; i < tx5.length; i++) {
        v = (ty5[i] / tx5[i]) * 100
        tmp5.push(v)
      }

      if (this.launch === false) {
        tmp1 = [
          100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
          100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
          100, 100, 100, 100, 100, 100
        ]
        tmp2 = [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ]
        tmp3 = [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ]
        tmp4 = [
          100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
          100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
          100, 100, 100, 100, 100, 100
        ]
        tmp5 = [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ]
      }

      setInterval(() => {
        var first1 = tmp1.shift()
        var first2 = tmp2.shift()
        var first3 = tmp3.shift()
        var first4 = tmp4.shift()
        var first5 = tmp5.shift()

        this.monitorData1.push(first1)
        this.monitorData2.push(first2)
        this.monitorData3.push(first3)
        this.monitorData4.push(first4)
        this.monitorData5.push(first5)

        tmp1.push(first1)
        tmp2.push(first2)
        tmp3.push(first3)
        tmp4.push(first4)
        tmp5.push(first5)
        this.chart.setOption({
          series: [
            {
              data: this.monitorData1
            },
            {
              data: this.monitorData2
            },
            {
              data: this.monitorData3
            },
            {
              data: this.monitorData4
            },
            {
              data: this.monitorData5
            }
          ]
        })
        this.monitorData1.shift()
        this.monitorData2.shift()
        this.monitorData3.shift()
        this.monitorData4.shift()
        this.monitorData5.shift()
      }, 1000)
    }
  }
}
</script>
