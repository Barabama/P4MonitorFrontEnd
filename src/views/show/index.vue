<template>
  <div>
    <div class="background">
      <img class="bgIMG" src="@/assets/img/bg/bg.png" />
    </div>
    <el-container style="height: 1080px; weight: 120%">
      <el-aside width="25%" style="padding-left: 10px; padding-top: 20px">
        <dv-border-box-11 title="  网络信息总览  " style="height: 100%; padding-bottom: 0px"
          :color="['rgb(34,69,114)', 'rgb(4,17,53)']" backgroundcolor="rgba(4,17,53,0.1)">
          <div style="padding: 0px 20px -10px 20px">
            <alarm-data />
          </div>
        </dv-border-box-11>
      </el-aside>
      <el-main style="height: 95%; margin-top: 35px; padding: 0, width:100%">
        <dv-border-box-1 backgroundcolor="rgba(4,17,53,0.1)" :color="['rgb(34,69,114)', 'rgb(4,17,53)']">
          <alarm-contrast />
          <div style="margin: 50px 50px">
            <dv-decoration-6 style="width: 95%; height: 10px" :color="['rgb(122,202,236)', 'rgb(34,69,114)']" />
            <!-- <div class="empty-space"></div>
            <div class="empty-space"></div>
            <div class="empty-space"></div>
            <div class="empty-space"></div>
            <div class="empty-space"></div>
            <div class="empty-space"></div>
            <multi-bar-chart :bar-set="multiBar" />
            <div class="empty-space"></div> -->
          </div>
          <div style="display: flex; height: 100%;">
            <el-container class="dashboard-container" style="height: 50%; width: 70%;">1</el-container>
            <dv-border-box-10 :color="['rgb(13,0,0)', 'rgb(34,69,114)']" style="width: 30%;">
              <el-card shadow="hover" class="digital-card"
                style="vertical-align: center; padding-top: 0px; padding-bottom: 5px">
                <line-chart :line-set="line1" />
              </el-card>
            </dv-border-box-10>
          </div>
        </dv-border-box-1>
      </el-main>
      <!-- <el-aside width="30%" style="padding-top: 20px; padding-right: 30px">
        <el-row>
          <dv-border-box-11
            title="  协议类型  对比  "
            :color="['rgb(34,69,114)', 'rgb(4,17,53)']"
            backgroundcolor="rgba(4,17,53,0.1)"
          >
            <div style="padding: 20px 20px">
              <reason-rank />
              <dv-decoration-5
                style="width: 100%; height: 30px"
                :color="['rgb(34,69,114)', 'rgb(4,17,153)']"
              />
              <line-chart :line-set="line" />
              <div class="empty-space"></div>
              <line-bar-chart :bar-set="lineBar" />
              <div class="empty-space"></div>
              <div class="empty-space"></div>
              <dv-decoration-5
                style="width: 100%; height: 50px"
                :color="['rgb(34,69,114)', 'rgb(4,17,153)']"
              />
            </div>
          </dv-border-box-11>
        </el-row>
      </el-aside> -->
    </el-container>
  </div>
</template>

<script>
import AlarmData from './component/alarmData'
import AlarmContrast from './component/alarmContrast'
// import MultiBarChart from './component/multiBarChart'
// import LineChart from './component/lineChart'
// import ReasonRank from './component/reasonRank'
// import LineBarChart from './component/lineBarChart'
import { mapGetters } from 'vuex'
import { Network } from 'vis'
import imgPC from '@/assets/imgs/PC.png'
import imgRouter from '@/assets/imgs/router.png'
import Global from '@/Global.vue'
import { api } from '@/config'
import lineChart from './component/lineChartLeft'
import { sumBy } from 'lodash-es'

export default {
  name: 'HomePage',
  components: {
    AlarmData,
    AlarmContrast,
    lineChart
    // MultiBarChart,
    // LineChart,
    // ReasonRank,
    // LineBarChart
  },
  filters: {
    numFilter(value) {
      const realVal = parseFloat(value).toFixed(2)
      return realVal
    }
  },
  data() {
    return {
      multiBar: {
        barIndex: '1',
        title: '7日安全值',
        dataAxis: ['8-16', '8-17', '8-18', '8-19', '8-20', '8-21', '8-22'],
        dataFrom: ['7日安全值'],
        data: [152235]
      },
      lineBar: {
        barIndex: '1',
        title: '7日数据变化-异常数据流',
        dataAxis: [
          '星期一',
          '星期二',
          '星期三',
          '星期四',
          '星期五',
          '星期六',
          '星期日'
        ],
        dataFrom: ['TCP', 'UDP', '其它类型'],
        data: [2053, 1500, 2000, 2100, 2350, 1789, 1820]
      },
      line: {
        lineIndex: '1',
        title: '7日数据变化-正常数据流',
        dataAxis: [
          '星期一',
          '星期二',
          '星期三',
          '星期四',
          '星期五',
          '星期六',
          '星期日'
        ],
        dataFrom: ['TCP', 'UDP', '其它类型'],
        data: [2053, 1500, 2000, 2100, 2350, 1789, 1820]
      },
      timer: -1,
      verticalColor: '#FFCC00',
      otherColors: 'red',
      horizontalColor: 'white',
      name: 'Dashboard',
      line1: {
        lineIndex: '1',
        title: '流量累计',
        dataAxis: [],
        dataFrom: [],
        data: [
          1.51835e6, 1.56167e6, 1.61876e6, 1.45168e6, 1.52574e6, 1.49822e6,
          1.5616e6, 1.57112e6, 1.46653e6, 1.65154e6, 1.48029e6, 1.76571e6,
          1.41574e6, 1.58809e6, 1.1768e6, 218892
        ].map(() => 0)
      }
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  mounted() {
    // this.getCompareAlarmCount()
    // this.timer = setInterval(() => {
    //   this.getCompareAlarmCount()
    // }, 5000)
    if (Global.launch === true) {
      this.verticalColor = '#99FF33'
      this.otherColors = '#99FF33'
    }
    this.globalTrace()
    this.readCounter()
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    getCompareAlarmCount() {
      // request({
      //   url: '/dataOp/getCompareAlarmCount',
      //   method: 'GET'
      // }).then(res => {
      //   this.oneClassMoM = res.data.data.allCount.oneClassMoM
      //   this.oneClassYoY = res.data.data.allCount.oneClassYoY
      //   this.twoClassMoM = res.data.data.allCount.twoClassMoM
      //   this.twoClassYoY = res.data.data.allCount.twoClassYoY
      // })
    },
    async globalTrace() {
      // create an array with nodes
      const topo = await fetch(api + '/read_topo').then(r => r.json())
      var nodes = topo.nodes.map(node => {
        node.image = node.image === 'imgPC' ? imgPC : imgRouter
        if (node.ip) {
          node.label += `\n${node.ip}`
          console.log(node.label.slice(0, 2))
        }
        return node
      })

      // create an array with edges
      var edges = topo.edges.map((edge, index) => {
        let node = nodes.find(node => node.label.slice(0, 2) === edge.from.slice(0, 2))
        console.log(node)
        // edge.label = edge.from + '->' + edge.to
        edge.from = node.id
        node = nodes.find(node => node.label.slice(0, 2) === edge.to.slice(0, 2))
        edge.to = node.id
        edge.color = undefined
        edge.id = index
        return edge
      })
      var container = document.querySelector('.dashboard-container')
      var data = {
        nodes: nodes,
        edges: edges
      }
      var options = {
        // 节点样式
        nodes: {
          size: 35,
          chosen: true,
          font: {
            color: 'white', // 字体的颜色
            size: 20 // 显示字体大小
          },
          scaling: {
            min: 16,
            max: 32
          },
          shadow: {
            enabled: true,
            color: 'rgba(0,0,0,0.5)',
            size: 20,
            x: 5,
            y: 5
          }
        },
        edges: {
          font: {
            align: 'top' // 连接线文字位置
          },
          hoverWidth: 1
        },
        // layout: {
        //   // 以分层方式定位节点
        //   hierarchical: {
        //     direction: 'LR', // 分层排序方向
        //     shakeTowards: 'roots',
        //     sortMethod: 'directed', // 分层排序方法
        //     levelSeparation: 200 // 不同级别之间的距离
        //   }
        // },
        interaction: {
          navigationButtons: true,
          keyboard: true,
          selectable: true, // 用户可以选择节点和边
          zoomView: true, // 支持视图缩放
          selectConnectedEdges: true // 选择节点后是否显示连接线
        }
      }
      // initialize your network!
      this.network = new Network(container, data, options)
      this.network.on('click', (e) => this.showDetail(e)) // 单击事件
      this.network.on('doubleClick', (e) => this.enterService(e)) // 双击事件
    },
    readCounter() {
      this.timer = setInterval(async() => {
        const data = await fetch(api + '/read_counter').then(r => r.json())
        let cnt = 0
        for (const key of Object.keys(data)) {
          cnt += sumBy(data[key], 'bytes') / 1000_000
        }
        this.line1.data.push(cnt)
        this.line1.data.shift()
      }, 2000)
    }
  }
}
</script>

<style scoped>
.subTitle {
  font-size: 20px;
  text-align: center;
  margin: 0 20px;
  color: white;
}

.empty-space {
  width: 100%;
  height: 10px;
}

.background {
  width: 99%;
  height: 99%;
  background-repeat: no-repeat;
  filter: blur(8px);
  z-index: -1;
  position: absolute;
}

.bgIMG {
  width: 100%;
  height: 100%;
}

.digital-card {
  border-radius: 10px;
  height: 26vh;
  margin-bottom: 4vh;
  border: none;
  background-color: rgba(4, 17, 53, 0.2);
}
</style>
