<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="启动防御">
        <el-switch v-model="form.shield" @change="activate" />
      </el-form-item>
      <div v-if="show">
        <el-form-item label="跳变周期(单位:s)">
          <el-input v-model="form.cycle" class="inputBox" />
        </el-form-item>
        <el-form-item label="路由最大跳数">
          <el-input v-model="form.hip" class="inputBox" />
        </el-form-item>
        <el-form-item label="最大-最小跳数差">
          <el-input v-model="form.dis" class="inputBox" />
        </el-form-item>
        <el-form-item label="ARP攻击检测">
          <el-switch v-model="form.arp" />
        </el-form-item>
        <el-form-item label="DDoS攻击检测">
          <el-switch v-model="form.ddos" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="openFullScreen">Launch</el-button>
          <!-- <el-button @click="onCancel">Cancel</el-button> -->
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import Global from '@/Global.vue'

export default {
  data() {
    return {
      form: {
        cycle: 5,
        hip: 3,
        dis: 0
      },
      show: false,
      fullscreenLoading: false
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    activate() {
      this.show = !this.show
    },
    openFullScreen() {
      const loading = this.$loading({
        lock: true,
        text: '正在启动防御，请耐心等待！！！',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loading.close()
        this.$message({
          message: '防御启动成功！！！',
          type: 'success'
        })
      }, 2000)
      Global.launch = true
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
.inputBox {
  width: 30%;
}
</style>
