<template>
  <div>
    <el-row class="row-bg" style="padding: 100px 2vw 30px 2vw">
      <dv-border-box-10 style="margin-bottom: 20px" :color="['rgb(13,0,0)', 'rgb(34,69,114)']">
        <el-col :span="7" style="margin-top: 4px; margin-left: 20px">
          <span class="number-content" style="color: white; margin-left: 25px"></span>
        </el-col>
        <el-row>
          <el-col :span="10">
            <span class="number red" style="margin-left: 0px; margin-bottom: 5px">
              {{ totalAlarmNum1 }}{{ totalAlarmNum2 }}{{ totalAlarmNum3
              }}{{ totalAlarmNum4 }}
            </span>
          </el-col>
        </el-row>
      </dv-border-box-10>
      <dv-border-box-10 :color="['rgb(13,0,0)', 'rgb(34,69,114)']">
        <el-card shadow="hover" class="digital-card"
          style="vertical-align: center; padding-top: 0px; padding-bottom: 5px">
          <line-chart :line-set="line1" />
        </el-card>
      </dv-border-box-10>
      <dv-border-box-10 :color="['rgb(13,0,0)', 'rgb(34,69,114)']">
        <el-card shadow="hover" class="digital-card"
          style="vertical-align: center; padding-top: 0px; padding-bottom: 5px">
          <line-chart :line-set="line2" />
        </el-card>
      </dv-border-box-10>
      <dv-border-box-10 :color="['rgb(13,0,0)', 'rgb(34,69,114)']">
        <el-card shadow="hover" class="digital-card"
          style="vertical-align: center; padding-top: 0px; padding-bottom: 10px">
          <line-chart :line-set="line3" />
        </el-card>
      </dv-border-box-10>
    </el-row>
  </div>
</template>

<script>
// import request from '@/network/request'
import lineChart from './lineChartLeft'
import Global from '@/Global.vue'
import { api } from '@/config'
import { state } from '@/state'
import { round, sum } from 'lodash-es'
export default {
  name: 'Alarmdata',
  components: {
    lineChart
  },
  data() {
    return {
      launch: Global.launch,
      timer: null,
      totalAlarmNum1: 0,
      totalAlarmNum2: '    ',
      totalAlarmNum3: '    ',
      totalAlarmNum4: 4,
      monthAlarmNum: 0,
      classoneAlarmNum: 0,
      classtwoAlarmNum: 0,
      line1: {
        lineIndex: '1',
        title: '链路流量情况',
        dataAxis: [],
        dataFrom: [],
        data: [
          1.51835e6, 1.56167e6, 1.61876e6, 1.45168e6, 1.52574e6, 1.49822e6,
          1.5616e6, 1.57112e6, 1.46653e6, 1.65154e6, 1.48029e6, 1.76571e6,
          1.41574e6, 1.58809e6, 1.1768e6, 218892
        ].map(() => 0)
      },
      line2: {
        lineIndex: '1',
        title: '端到端延时情况',
        dataAxis: [],
        dataFrom: [],
        data: [
          9.77, 8.52, 8.96, 11.0, 11.9, 9.63, 10.4, 10.3, 7.15, 12.9, 9.2, 6.57,
          10.6, 10.4
        ].map(() => 0)
      },
      line3: {
        lineIndex: '1',
        title: '有效信息监控',
        dataAxis: [],
        dataFrom: [],
        data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
      },
      iterval: -1
    }
  },
  created() { },
  mounted() {
    // this.timer = setInterval(() => {
    //   this.getData()
    // }, 5000)
    var tmp1 = [
      1.55421e6, 1.57543e6, 1.72875e6, 1.46646e6, 1.54155e6, 1.44436e6,
      1.43477e6, 1.29624e6, 1.51198e6, 1.50459e6, 1.46338e6, 1.50459e6,
      1.42423e6, 1.43902e6, 1.24976e6, 1.61978e6, 1.45914e6, 1.55106e6,
      1.51835e6, 1.56167e6, 1.61876e6, 1.45168e6, 1.52574e6, 1.49822e6,
      1.5616e6, 1.57112e6, 1.46653e6, 1.65154e6, 1.48029e6, 1.76571e6,
      1.41574e6, 1.58809e6, 1.1768e6, 218892
    ]
    var tmp2 = [
      10.2, 22.0, 14.4, 17.5, 14.9, 19.5, 10.2, 23.2, 10.8, 18.5, 9.3, 12.8,
      28.9, 12.3, 8.73, 10.3, 4.46, 6.89, 8.71, 9.77, 8.52, 8.96, 11.0, 11.9,
      9.63, 10.4, 10.3, 7.15, 12.9, 9.2, 6.57, 10.6, 10.4
    ]
    var tx3 = [
      189, 199, 219, 179, 190, 186, 178, 158, 190, 190, 188, 190, 180, 180, 157,
      199, 186, 191, 193, 196, 202, 179, 193, 187, 189, 190, 186, 207, 189, 219,
      176, 198, 147, 30
    ]
    var ty3 = [
      5, 3, 6, 3, 1, 1, 1, 0, 2, 6, 2, 1, 0, 2, 0, 1, 1, 3, 1, 4, 4, 0, 3, 5, 2,
      0, 2, 2, 2, 3, 0, 3, 1, 0
    ]
    var tmp3 = []
    var i = 0
    var v = 0
    for (i = 0; i < tx3.length; i++) {
      v = (ty3[i] / tx3[i]) * 100
      tmp3.push(v)
    }
    if (this.launch === false) {
      tmp3 = [
        100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
        100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
        100, 100, 100, 100, 100, 100
      ]
    }
    if (this.launch === true) {
      this.line3.data = [2.65, 1.51, 2.75, 1.68, 0.53, 0.54, 0.56]
      this.line3.title = '有效信息(防御中)'
    }
    this.interval = setInterval(async() => {
      const data = await fetch(api + '/send_probe').then(r => r.json())
      const flowData = sum(Object.values(data.flow))
      state.flow = round(flowData, 3)
      state.delay = round(data.delay, 3)
      this.line1.data.push(flowData)
      this.line1.data.shift()

      this.line2.data.push(data.delay)
      this.line2.data.shift()

      var first3 = tmp3.shift()
      this.line3.data.push(first3)
      tmp3.push(first3)
      this.line3.data.shift()
    }, 2000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {}
}
</script>

<style scoped>
@import '../../../assets/scss/font.css';

.digital-card {
  border-radius: 10px;
  height: 26vh;
  margin-bottom: 4vh;
  border: none;
  background-color: rgba(4, 17, 53, 0.2);
}

.number {
  font-size: 2.5vw;
  font-family: led, serif;
}

.number-content {
  font-size: 1.2vw;
  font-family: serif;
  padding-top: 2vh;
}

.empty-space {
  width: 100%;
  height: 40px;
}

.red {
  color: red;
}
</style>
