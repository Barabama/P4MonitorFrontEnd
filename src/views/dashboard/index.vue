<template>
  <div>
    <div class="background">
      <img class="bgIMG" src="@/assets/img/bg/bg.png" />
    </div>
    <el-container style="height: 100%">
      <div>
        <ul style="color: white">
          <!-- 图例 (30s内有效信息数占比): -->
        </ul>
        <ul style="color: green">
          {{
            tag[0]
          }}
        </ul>
        <ul style="color: #ffcc00">
          {{
            tag[1]
          }}
        </ul>
        <ul style="color: red">
          {{
            tag[2]
          }}
        </ul>
      </div>
      <el-container class="dashboard-container">1</el-container>
    </el-container>
  </div>

  <!-- <div class="dashboard-text">name: {{ name }}</div> -->
</template>
<script>
import { mapGetters } from 'vuex'
import { Network } from 'vis'
import imgPC from '@/assets/imgs/PC.png'
import imgRouter from '@/assets/imgs/router.png'
import Global from '@/Global.vue'
import { api } from '@/config'

export default {
  data() {
    return {
      tag: [
        // '有效信息数 < 10% 绿色',
        // '有效信息数 10% ~ 20% 黄色',
        // '有效信息数 > 20% 红色'
      ],
      verticalColor: '#FFCC00',
      otherColors: 'red',
      horizontalColor: 'white',
      name: 'Dashboard'
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  mounted() {
    if (Global.launch === true) {
      this.verticalColor = '#99FF33'
      this.otherColors = '#99FF33'
    }
    this.globalTrace()
  },
  methods: {
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
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    width: 100%;
    height: 800px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.background {
  width: 99%;
  height: 91%;
  background-repeat: no-repeat;
  filter: blur(8px);
  z-index: -1;
  position: absolute;
}

.el-footer {
  background-color: #ffffff;
  width: 100%;
  height: 200px;
  color: #333;
  font-size: 18px;
  font-weight: bold;
}
</style>
