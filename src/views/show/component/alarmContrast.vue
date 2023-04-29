<template>
  <div>
    <el-row type="flex" class="row-bg" justify="space-around" style="padding-top: 30px; padding-left: 10px;width: 100%;">
      <el-col :span="20">
        <div style="margin-top: 10px">
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="10">
              <dv-decoration-9 v-if="oneClassYoY > 0" style="width: 200px; height: 200px"
                :color="['rgba(205,45,25,0.6)', 'rgba(205,14,25,0.6)']">
                <span class="digit-blue">
                  <div class="digit-red">
                    <span>+</span>
                    {{ oneClassYoY }}
                    <span>%</span>
                  </div>
                </span>
              </dv-decoration-9>
              <dv-decoration-9 v-else style="width: 200px; height: 200px"
                :color="['rgba(25,212,174,0.7)', 'rgba(69,169,208,0.5)']">
                <span class="digit-blue">
                  <div slot="content" style="font-size: 18px">链路流量</div>
                  <div>
                    {{ flowdata }}
                  </div>
                </span>
              </dv-decoration-9>
            </el-col>
            <el-col :span="10">
              <dv-decoration-9 v-if="oneClassYoY > 0" style="width: 200px; height: 200px"
                :color="['rgba(205,45,25,0.6)', 'rgba(205,14,25,0.6)']">
                <span class="digit-blue">
                  <div class="digit-red">
                    <span>+</span>
                    {{ oneClassYoY }}
                    <span>%</span>
                  </div>
                </span>
              </dv-decoration-9>
              <dv-decoration-9 v-else style="width: 200px; height: 200px"
                :color="['rgba(25,212,174,0.7)', 'rgba(69,169,208,0.5)']">
                <span class="digit-blue">
                  <div slot="content" style="font-size: 18px">端到端延时</div>
                  <div>{{ delaydata }}</div>
                </span>
              </dv-decoration-9>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="10">
        <dv-decoration-9 v-if="oneClassYoY > 0" style="width: 200px; height: 200px"
          :color="['rgba(205,45,25,0.6)', 'rgba(205,14,25,0.6)']">
          <span class="digit-blue">
            <div class="digit-red">
              <span>+</span>
              {{ oneClassYoY }}
              <span>%</span>
            </div>
          </span>
        </dv-decoration-9>
        <dv-decoration-9 v-else style="width: 200px; height: 200px"
          :color="['rgba(25,212,174,0.7)', 'rgba(69,169,208,0.5)']">
          <span class="digit-blue">
            <div slot="content" style="font-size: 18px">有效信息</div>
            <div>{{ validdata }}</div>
          </span>
        </dv-decoration-9>
      </el-col>
      <!-- <el-col :span="20">
        <div style="margin-top: 10px">
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="10">
              <dv-decoration-9 v-if="oneClassYoY > 0" style="width: 200px; height: 200px"
                :color="['rgba(205,45,25,0.6)', 'rgba(205,14,25,0.6)']">
                <span class="digit-blue">
                  <div class="digit-red">
                    <span>+</span>
                    {{ oneClassYoY }}
                    <span>%</span>
                  </div>
                </span>
              </dv-decoration-9>
              <dv-decoration-9 v-else style="width: 200px; height: 200px"
                :color="['rgba(25,212,174,0.7)', 'rgba(69,169,208,0.5)']">
                <span class="digit-blue">
                  <div slot="content" style="font-size: 18px">有效信息</div>
                  <div>{{ validdata }}</div>
                </span>
              </dv-decoration-9>
            </el-col>
            <el-col :span="10">
              <dv-decoration-9 v-if="oneClassMoM > 0" style="width: 200px; height: 200px"
                :color="['rgba(205,45,25,0.6)', 'rgba(205,14,25,0.6)']">
                <span class="digit-blue">
                  <div class="digit-red">
                    <span>+</span>
                    {{ oneClassMoM }}
                    <span>%</span>
                  </div>
                </span>
              </dv-decoration-9>
              <dv-decoration-9 v-else style="width: 250px; height: 250px">
                <span class="digit-blue">
                  <div slot="content" style="font-size: 18px; font-weight: 800">
                    计数器
                  </div>
                  <div>{{ securedata }}</div>
                </span>
              </dv-decoration-9>
            </el-col>
          </el-row>
        </div>
      </el-col> -->
    </el-row>
  </div>
</template>

<script>
// import request from '../../../network/request'
import Global from '@/Global.vue'
import { state } from '@/state'
import { api } from '@/config'
export default {
  name: 'Alarmcontrast',
  data() {
    return {
      launch: Global.launch,
      flowdata: 0,
      delaydata: 0,
      validdata: 0,
      securedata: 0,
      timeer: null,
      oneClassMoM: 0, // 环比
      oneClassYoY: 0, // 同比
      twoClassMoM: 0,
      twoClassYoY: 0
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    var flowdata = [
      1.55421e6, 1.57543e6, 1.72875e6, 1.46646e6, 1.54155e6, 1.44436e6,
      1.43477e6, 1.29624e6, 1.51198e6, 1.50459e6, 1.46338e6, 1.50459e6,
      1.42423e6, 1.43902e6, 1.24976e6, 1.61978e6, 1.45914e6, 1.55106e6,
      1.51835e6, 1.56167e6, 1.61876e6, 1.45168e6, 1.52574e6, 1.49822e6,
      1.5616e6, 1.57112e6, 1.46653e6, 1.65154e6, 1.48029e6, 1.76571e6,
      1.41574e6, 1.58809e6, 1.1768e6, 218892
    ]
    var delaydata = [
      10.2, 22.0, 14.4, 17.5, 14.9, 19.5, 10.2, 23.2, 10.8, 18.5, 9.3, 12.8,
      28.9, 12.3, 8.73, 10.3, 4.46, 6.89, 8.71, 9.77, 8.52, 8.96, 11.0, 11.9,
      9.63, 10.4, 10.3, 7.15, 12.9, 9.2, 6.57, 10.6, 10.4
    ]
    var tx1 = [
      189, 199, 219, 179, 190, 186, 178, 158, 190, 190, 188, 190, 180, 180, 157,
      199, 186, 191, 193, 196, 202, 179, 193, 187, 189, 190, 186, 207, 189, 219,
      176, 198, 147, 30
    ]
    var ty1 = [
      5, 3, 6, 3, 1, 1, 1, 0, 2, 6, 2, 1, 0, 2, 0, 1, 1, 3, 1, 4, 4, 0, 3, 5, 2,
      0, 2, 2, 2, 3, 0, 3, 1, 0
    ]
    var validdata = []
    var i = 0
    var v = 0
    for (i = 0; i < tx1.length; i++) {
      v = (ty1[i] / tx1[i]) * 100
      validdata.push(v.toFixed(6))
    }

    var tx5 = [
      159, 166, 150, 172, 179, 155, 180, 172, 159, 162, 165, 159, 153, 164, 153,
      162, 164, 159, 171, 172, 181, 184, 169, 147, 164, 185, 166, 174, 160, 176,
      180, 155, 144, 53
    ]
    var securedata = []
    for (i = 0; i < tx5.length; i++) {
      v = this.generateRandomInteger(82, 89)
      securedata.push(v)
    }

    if (this.launch === false) {
      validdata = [
        100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
        100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
        100, 100, 100, 100, 100, 100
      ]
      securedata = []
      for (i = 0; i < tx5.length; i++) {
        v = this.generateRandomInteger(13, 18)
        securedata.push(v)
      }
    }

    this.timer = setInterval(async() => {
      this.flowdata = state.flow
      this.delaydata = state.delay
      // const data = await fetch(api + '/read_counter').then(r => r.json())
      // console.log(data)
      var first3 = validdata.shift()
      this.validdata = first3
      validdata.push(first3)

      var first4 = securedata.shift()
      this.securedata = first4
      securedata.push(first4)
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    getData() {
      // request({
      //   method: 'GET',
      //   url: '/dataOp/getCompareAlarmCount'
      // }).then(res => {
      //   // console.log(res.data)// 请求的返回体
      //   this.oneClassMoM = res.data.data.allCount.oneClassMoM.toFixed(2)
      //   this.oneClassYoY = res.data.data.allCount.oneClassYoY.toFixed(2)
      //   this.twoClassMoM = res.data.data.allCount.twoClassMoM.toFixed(2)
      //   this.twoClassYoY = res.data.data.allCount.twoClassYoY.toFixed(2)
      // }).catch((error) => {
      //   console.log(error)// 异常
      // })
    },
    generateRandomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }
  }
}
</script>

<style scoped>
.smallTitle {
  font-size: 20px;
  text-align: center;
}

.digit-blue {
  color: rgba(87, 244, 249, 0.8);
  font-size: 16px;
  text-align: center;
  vertical-align: center;
}

.digit-red {
  color: red;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  vertical-align: center;
}

.digit-blue:hover:after {
  position: absolute;
  left: 15px;
  top: 5px;
  padding: 5px;
  background-color: #0095ff;
  border-radius: 5px;
  color: #fff;
  /*这里显示的内容为title属性对应的值*/
  content: attr(title);
  z-index: 2;
  width: 120px;
}
</style>
